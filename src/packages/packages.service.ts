import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Package } from './package.model';

@Injectable()
export class PackagesService {
    constructor (@InjectModel('Package') private readonly packageModel: Model<Package>) {}

    async insertPackage(userName: string, size: string, packageCode: string, lockerNumber: number, personId?: string) {
        if(personId) {
            const newPackage = new this.packageModel({
                userName,
                personId,
                size,
                packageCode,
                lockerNumber,
            });
            const result = await newPackage.save();
            return result;
        } else {
            const newPackage = new this.packageModel({
                userName,
                size,
                packageCode,
                lockerNumber,
            });
            const result = await newPackage.save();
            return result;
        }
    }

    async searchPackageInLockerByPersonId(personId: string) {
        const packages = await this.packageModel.find({ personId: personId, status: "inLocker" }).exec();
        return packages;
    }

    async searchPackageInLockerByCode(codeNumber: string) {
        const packages = await this.packageModel.findOne({ packageCode: codeNumber, status: "inLocker" }).exec();
        return packages;
    }

    async updatePackageStatus(id: string) {
        const packageToBeUpdated = await this.packageModel.findById(id).exec();
        packageToBeUpdated.status = 'delivered';
        packageToBeUpdated.save();
    }
}