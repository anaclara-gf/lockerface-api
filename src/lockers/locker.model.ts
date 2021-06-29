import * as mongoose from 'mongoose';

export const LockerSchema = new mongoose.Schema({
  lockerNumber: {type: Number, required: true},
  size: {type: String, required: true},
  isAvailable: {type: Boolean, default: true}
})

export interface Locker {
    id: string;
    lockerNumber: number;
    size: string;
    isAvailable: boolean;
  }