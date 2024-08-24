import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { TodolistModule } from '../todolist/todolist.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    UsersModule,
    TodolistModule,
    TaskModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env' : '.env.test',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
