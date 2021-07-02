import { LockersService } from './lockers.service';
import { Body, Controller, Get, Param, Post, HttpException, HttpStatus } from "@nestjs/common";

@Controller('lockers')
export class LockersController {
    constructor(private readonly lockersService: LockersService) {}

    @Post()
    async addLocker(
        @Body('lockerNumber') lockerNumber: number,
        @Body('size') lockerSize: string,
    ) {
        const generatedId = await this.lockersService.insertLocker(
            lockerNumber,
            lockerSize
        );
        return { id: generatedId }
    }

    @Get()
    async findLockers() {
        const lockers = await this.lockersService.getLockers();
        return lockers;
    }

    @Get(':size')
    async findLockersAvailableBySize(@Param('size') size: string) {
        const lockers = await this.lockersService.getLockersAvailableBySize(size);

        if(lockers.length > 0){
            return lockers;
        }

        throw new HttpException({
            status: HttpStatus.NOT_FOUND,
            error: 'There is no lockers available in this size',
        }, HttpStatus.NOT_FOUND);
    }
}