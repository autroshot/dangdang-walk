import { IsNumber, IsString } from 'class-validator';

export class DogStatisticDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    photoUrl: string;

    @IsNumber()
    recommendedDailyWalkAmount: number;

    @IsNumber()
    dailyWalkAmount: number;

    @IsNumber({}, { each: true })
    weeklyWalks: number[];
}