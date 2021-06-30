import * as mongoose from 'mongoose';

export const PackageSchema = new mongoose.Schema({
    userName: {type: String, required: false},
    personId: {type: String, required: false},
    size: {type: String, required: true},
    packageCode: {type: String, required: true},
    lockerNumber: {type: Number, required: true},
    status: {type: String, default: "inLocker"},
})
  
export interface Package {
    id: string;
    userName: string,
    personId: string,
    size: string,
    packageCode: string,
    lockerNumber: number,
    status: string,
}