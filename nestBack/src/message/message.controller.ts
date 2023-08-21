import { Controller, Get, Post, Body,
  //  Patch, Param, Delete,
    ValidationPipe, UsePipes,  Res, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';
import { Response } from 'express';
import { getMessagesDto } from './dto/get-messages.dto';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addMessage(@Body() body: CreateMessageDto, @Res() response : Response) {
    try {
      const message = body;
      const result = await this.messageService.addMessage(message);
      return response.status(result.statusCode).send(result.payload);
  } catch (error) {
      console.error('⚠️ ', error);
      return response.status(400).send('An error has occured');
  }
  }

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async findPrivateMessages(@Query() query : getMessagesDto ,@Res() response : Response) {
    try {
      const { user, friend } = query;
      const result = await this.messageService.findPrivateMessages(user, friend);
      return response.status(result.statusCode).send(result.payload);
  } catch (error) {
      console.error('⚠️ ', error);
      return response.status(400).send('An error has occured');
  }
}

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.messageService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
