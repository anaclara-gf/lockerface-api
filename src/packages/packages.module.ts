import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PackageSchema } from './package.model';

import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { LockersModule } from 'src/lockers/lockers.module';
import { UsersModule } from './../users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{name: 'Package', schema: PackageSchema}]), LockersModule, UsersModule],
    controllers: [PackagesController],
    providers: [PackagesService],
})
export class PackagesModule {}