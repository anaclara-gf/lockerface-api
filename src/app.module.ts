import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LockersModule } from './lockers/lockers.module'
import { UsersModule } from './users/users.module';

require('dotenv').config()

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), LockersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
