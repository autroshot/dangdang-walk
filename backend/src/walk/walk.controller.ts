import { Body, Controller, ParseArrayPipe, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Serialize } from 'src/common/interceptor/serialize.interceptor';
import { WalkCommandDto } from './dtos/walk-command.dto';
import { DogsService } from 'src/dogs/dogs.service';

@Controller('/walk')
@UsePipes(new ValidationPipe())
export class WalkController {
    constructor(private readonly dogService: DogsService) {}

    @Serialize(WalkCommandDto)
    @Post('/start')
    startWalk(@Body() body: WalkCommandDto): Promise<number[]> {
        const dogIds = [];
        for (const curId of body.dogId) {
            dogIds.push(parseInt(curId));
        }
        return this.dogService.updateIsWalking(dogIds, true);
    }

    @Serialize(WalkCommandDto)
    @Post('/stop')
    stopWalk(@Body() body: WalkCommandDto): Promise<number[]> {
        const dogIds = [];
        for (const curId of body.dogId) {
            dogIds.push(parseInt(curId));
        }
        return this.dogService.updateIsWalking(dogIds, false);
    }
}