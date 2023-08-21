import { Inject, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('USER_REPOSITORY')
    private msgRepository: Repository<Message>,

  ) { }

  async addMessage(message: CreateMessageDto) {
    try {
      const result = await this.msgRepository.save(message);
      if (result) {
        return {
          statusCode: 200,
          payload: {
            statusCode: 7001,
            data: result
          }
        }
      }

    } catch (error) {
      console.log(error);
      throw 'Error in "addMessage" service';
    }
  }

  async findPrivateMessages(user: number, friend: number) {
    try {
      const result = await this.msgRepository.find({
        where: [{ sender: user, receiver: friend }, { sender: friend, receiver: user }],
        order: {
          date: 'DESC'
        }
      })

      if (result && result.length !== 0) {
        return {
          statusCode: 200,
          payload: {
            statusCode: 7001,
            data: result
          }
        }
      }
      return {
        statusCode: 204,
        payload: {
          statusCode: 7004,
          data: "no data"
        }
      }
    } catch (error) {
      console.log(error);
      throw 'Error in "getMessages" service';
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
