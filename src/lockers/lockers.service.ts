import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Locker } from "./locker.model";

@Injectable()
export class LockersService {
    constructor (@InjectModel('Locker') private readonly lockerModel: Model<Locker>) {}

    async insertLocker(lockerNumber: number, size: string) {
        const newLocker = new this.lockerModel({
            lockerNumber,
            size
        });
        const result = await newLocker.save();
        return result.id as string;
    }

    async getLockers() {
        const lockers = await this.lockerModel.find().exec();
        return lockers.map((locker) => ({
            id: locker.id, 
            lockerNumber: locker.lockerNumber,
            lockerSize: locker.size,
            lockerIsAvailable: locker.isAvailable
        }));
    }

    async getLockersAvailableBySize(lockerSize: string) {
        const lockers = await this.lockerModel.find({ size: lockerSize, isAvailable: true }).exec();
        return lockers.map((locker) => ({
            id: locker.id, 
            lockerNumber: locker.lockerNumber,
            lockerSize: locker.size,
            lockerIsAvailable: locker.isAvailable
        }));
    }

    async updateLockerAvailability(isAvailable: boolean, lockerNumber: number) {
        const locker = await this.lockerModel.find({ lockerNumber: lockerNumber }).exec();
        locker[0].isAvailable = isAvailable;
        locker[0].save();
    }

    async findLockerById(id: string) {
        try {
            const locker = await this.lockerModel.findById(id).exec();
            return locker;
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
    }
}