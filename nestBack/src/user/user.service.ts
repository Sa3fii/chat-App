import { Inject, Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,

  ) { }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async signIn(user: string, password: string) {
    try {
      console.log(user)
      const result = await this.userRepository.findOneBy({
        user: user
      })
      console.log('result : ', result)

      if (result) {
        //  ADD HASH PASS HERE  < ----
        if (result.password === password) {
          const accessToken = await this.jwtService.signAsync({ user, name: result.name, id: result.id });
          return {
            statusCode: 200,
            payload: {
              statusCode: 7000,
              data: accessToken
            }
          };
        }

        return {
          statusCode: 203,
          payload: {
            statusCode: 7003,
            data: "Invalid password"
          }
        };
      }

      return {
        statusCode: 203,
        payload: {
          statusCode: 7001,
          data: 'User Not found'
        }
      };

    } catch (error) {
      console.error(error);
      throw 'Error in "signIn" service';
    }
  }

  async signUp(user: CreateUserDto) {
    try {

      const existingUser = await this.userRepository.findOneBy({ user: user.user });

      if (existingUser) {
        return {
          statusCode: 203,
          payload: {
            statusCode: 7001,
            data: 'User Already Exists'
          }
        }
      }

      const result = await this.userRepository.save(user)
      console.log('result : ', result)

      if (result) {
        //  ADD HASH PASS HERE  < ----
        return {
          statusCode: 201,
          payload: {
            statusCode: 7000,
            data: result
          }
        };

      }
    } catch (error) {
      console.error(error);
      throw 'Error in "signUp" service';
    }
  }

  async findAll() {
    try {
      const user = await this.userRepository.find();
      if (user) {
        return {
          statusCode: 200,
          payload: {
            statusCode: 7000,
            data: user
          }
        }
      }
      return {
        statusCode: 204,
        payload: {
          statusCode: 7001,
          data: 'No Data Found'
        }
      }
    } catch (error) {
      console.log(error)
      throw "An Error has occured"
    }

  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
