import { UsersService } from './users.service';
import { Body, Controller, Get, Post } from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async addLocker(
        @Body('name') userName: string,
        @Body('role') userRole: string,
        @Body('personId') personId: string
    ) {
        const generatedId = await this.usersService.insertUser(
            userName, 
            userRole,
            personId
        );
        return { id: generatedId }
    }

}