import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Post('/signin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() body: SignInDto, @Res() response: Response) {
    try {
      console.log(body.user)
      // const { user, password } = body;
      const result = await this.userService.signIn(body.user, body.password)
      return response.status(result.statusCode).send(result.payload);
    } catch (error) {
      console.error(error)
      return response.status(400).send('An error has occured');
    }
  }
  
  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signUp(@Body() body: CreateUserDto, @Res() response: Response) {
    try {
      const result = await this.userService.signUp(body)
      return response.status(result.statusCode).send(result.payload);
    } catch (error) {
      console.error(error)
      return response.status(400).send('An error has occured');
    }
  }

  @Get('')
  async findAll(@Res() response: Response): Promise<any> {
    try {
      const result = await this.userService.findAll();
      return response.status(result.statusCode).send(result.payload)
    } catch (error) {
      return response.status(400).send('An error has occured');
      return "An Error Has occured"
    }
  }

  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.userService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
