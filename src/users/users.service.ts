import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UsersService {
    constructor (@InjectModel('User') private readonly userModule: Model<User>) {}

    async insertUser(name: string, role: string, personId: string) {
        const newUser = new this.userModule({
            name,
            role,
            personId
        });
        const result = await newUser.save();
        return result.id as string;
    }

}