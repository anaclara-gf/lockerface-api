import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, HttpException, HttpStatus } from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async addLocker(
        @Body('name') userName: string,
        @Body('role') userRole: string,
        @Body('personId') personId: string
    ) {
        const result = await this.usersService.insertUser(
            userName, 
            userRole,
            personId
        );
        return result;
    }

    @Get(':name')
    async getUserByName(@Param('name') name: string) {
        const decodedName = decodeURIComponent(name);
        
        const user = await this.usersService.getUserByName(decodedName);
        if(user){
            return user;
        }

        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'There is no user with this name',
            }, HttpStatus.NOT_FOUND);
        
    }
}