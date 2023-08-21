import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { DatabaseModule } from 'src/database/database.module';
import { messageProviders } from './message.providers';

@Module({
  imports:[DatabaseModule],
  controllers: [MessageController],
  providers: [...messageProviders,MessageService],
})
export class MessageModule {}
