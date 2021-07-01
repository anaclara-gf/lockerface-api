import { Body, Controller, Get, Post, Param } from "@nestjs/common";
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
        const user = await this.usersService.findUserByName(userName);
        const lockersAvailable = await this.lockersService.getLockersAvailableBySize(size);
        await this.lockersService.updateLockerAvailability(false, lockersAvailable[0].lockerNumber);
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

    @Get(':personId')
    async getPackagesByPersonId(@Param('personId') personId: string) {
        const packages = await this.packagesService.searchPackageInLockerByPersonId(personId);
        let lockerNumbers = [];
        packages.forEach(async eachPackage => {
            await this.lockersService.updateLockerAvailability(true, eachPackage.lockerNumber);
            await this.packagesService.updatePackageStatus(eachPackage.id);
        });
        packages.map(eachPackage => {
            lockerNumbers.push(eachPackage.lockerNumber);
        });
        return lockerNumbers;
    }

    @Get('code/:codeNumber')
    async getPackagesByCodeNumber(@Param('codeNumber') codeNumber: string) {
        const packageToBeDelivered = await this.packagesService.searchPackageInLockerByCode(codeNumber);

        await this.lockersService.updateLockerAvailability(true, packageToBeDelivered.lockerNumber);
        await this.packagesService.updatePackageStatus(packageToBeDelivered.id);

        return packageToBeDelivered;
    }
}