import { Body, Controller, Post } from "@nestjs/common";
import { PackagesService } from './packages.service';
import { LockersService } from 'src/lockers/lockers.service';
import { UsersService } from 'src/users/users.service';

@Controller('packages')
export class PackagesController {
    constructor(
        private readonly packagesService: PackagesService,
        private readonly lockersService: LockersService,
        private readonly usersService: UsersService,
    ) {}

    @Post()
    async addPackage(
        @Body('size') size: string,
        @Body('packageCode') packageCode: string,
        @Body('name') userName: string,
    ) {
        const user = await this.usersService.getUserByName(userName);
        const lockersAvailable = await this.lockersService.getLockersAvailableBySize(size);
        await this.lockersService.updateLockerAvailability(lockersAvailable[0].id, false);
        if(user) {
            const packageIncluded = await this.packagesService.insertPackage(
                userName, 
                size, 
                packageCode, 
                lockersAvailable[0].lockerNumber, 
                user.personId,
            );
            return packageIncluded;
        } else {
            const packageIncluded = await this.packagesService.insertPackage(
                userName,
                size, 
                packageCode, 
                lockersAvailable[0].lockerNumber,
            );
            return packageIncluded;
        }
    }
}