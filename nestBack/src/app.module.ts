import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { userProviders } from './user/user.providers';
import { MessageModule } from './message/message.module';
import { ChatGateway } from './chat/chat.gateway';
// import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, DatabaseModule, MessageModule],
  controllers: [AppController, UserController],
  providers: [AppService, ...userProviders, UserService, ChatGateway],
})
export class AppModule {}
