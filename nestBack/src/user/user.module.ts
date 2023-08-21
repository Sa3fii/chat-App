import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule.register({ global: true, secret: 'barabaw', signOptions: { expiresIn: '2h' } })],
  controllers: [UserController],
  providers: [...userProviders, UserService],
})
export class UserModule { }
