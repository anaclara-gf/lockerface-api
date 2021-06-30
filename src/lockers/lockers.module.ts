import { LockersService } from 'src/lockers/lockers.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockerSchema } from './locker.model';

import { LockersController } from './lockers.controller';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Locker', schema: LockerSchema}])],
    controllers: [LockersController],
    providers: [LockersService],
    exports: [LockersService],
})
export class LockersModule {}