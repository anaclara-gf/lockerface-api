import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  role: {type: String, required: true},
  personId: {type: String, required: true}
})

export interface User {
    id: string;
    name: string;
    role: string;
    personId: string;
}