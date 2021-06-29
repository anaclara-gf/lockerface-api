import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Locker } from "./locker.model";

@Injectable()
export class LockersService {
    constructor (@InjectModel('Locker') private readonly lockerModule: Model<Locker>) {}

    async insertLocker(lockerNumber: number, size: string) {
        const newLocker = new this.lockerModule({
            lockerNumber,
            size
        });
        const result = await newLocker.save();
        return result.id as string;
    }

    async getLockers() {
        const lockers = await this.lockerModule.find().exec();
        return lockers.map((locker) => ({
            id: locker.id, 
            lockerNumber: locker.lockerNumber,
            lockerSize: locker.size,
            lockerIsAvailable: locker.isAvailable
        }));
    }
}