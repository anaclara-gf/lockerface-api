import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Post, HttpException, HttpStatus } from "@nestjs/common";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async addUser(
        @Body('name') userName: string,
        @Body('role') userRole: string,
        @Body('personId') personId: string
    ) {
        const nameWithNoSpaces = userName.trim();
        const roleWithNoSpaces = userRole.trim();
        const result = await this.usersService.insertUser(
            nameWithNoSpaces, 
            roleWithNoSpaces,
            personId
        );
        return result;
    }

    @Get(':name')
    async getUserByName(@Param('name') name: string) {
        const decodedName = decodeURIComponent(name);
        
        const user = await this.usersService.findUserByName(decodedName);
        if(user){
            return user;
        }

        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'There is no user with this name',
        }, HttpStatus.NOT_FOUND);
    }

    @Get('id/:personId')
    async getUserByPersonId(@Param('personId') personId: string) {
        const userByPersonId = await this.usersService.findUserByPersonId(personId);
        if(userByPersonId) {
            return userByPersonId;
        }
        
        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'There is no user with this personId',
        }, HttpStatus.NOT_FOUND);
    }
}