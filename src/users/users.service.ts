import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.model";

@Injectable()
export class UsersService {
    constructor (@InjectModel('User') private readonly userModel: Model<User>) {}

    async insertUser(name: string, role: string, personId: string) {
        const newUser = new this.userModel({
            name,
            role,
            personId
        });
        const result = await newUser.save();
        return {"name": result.name, "id": result.id} as object;
    }

    async findUserByName(userName: string) {
        const user = await this.userModel.findOne({ name: userName }).exec();
        return user;
    }

    async findUserByPersonId(personId: string) {
        const userByPersonId = await this.userModel.findOne({ personId: personId }).exec();
        return userByPersonId;
    }

}