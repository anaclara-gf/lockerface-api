import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockerSchema } from './locker.model';

import { LockersController } from './lockers.controller';
import { LockersService } from './lockers.service';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Locker', schema: LockerSchema}])],
    controllers: [LockersController],
    providers: [LockersService],
})
export class LockersModule {}