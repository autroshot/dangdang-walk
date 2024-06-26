import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Excrements } from 'src/excrements/excrements.entity';

export class PhotoUrlDto {
    @IsNotEmpty()
    @IsString()
    photoUrl: string;

    static getKey() {
        return 'photoUrl';
    }
}

export class DogInfoForDetail {
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    profilePhotoUrl: string | null;

    // TODO: reflect-metadata 사용하도록 변경
    static getKeysForDogTable() {
        return ['id', 'name', 'profilePhotoUrl'];
    }
}

export class ExcrementsInfoForDetail {
    @IsNotEmpty()
    dogId: number;

    @IsOptional()
    @IsNumber()
    fecesCnt: number;

    @IsOptional()
    @IsNumber()
    urineCnt: number;
}

export class JournalInfoForDetail {
    @IsNotEmpty()
    @IsString()
    routes: Location[];

    @IsNotEmpty()
    memo: string;

    @IsNotEmpty()
    @IsString({ each: true })
    photoUrls: string[];

    static getKeysForJournalTable() {
        return ['routes', 'memo'];
    }
    static getKeysForJournalPhotoTable() {
        return ['photoUrls'];
    }
}

export class JournalDetailDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => JournalInfoForDetail)
    journalInfo: JournalInfoForDetail;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => DogInfoForDetail)
    dogs: DogInfoForDetail[];

    @IsOptional()
    @ValidateNested()
    @Type(() => Excrements)
    excrements: ExcrementsInfoForDetail[];

    constructor(journalInfo: JournalInfoForDetail, dogInfo: DogInfoForDetail[], excrements: ExcrementsInfoForDetail[]) {
        this.journalInfo = journalInfo;
        this.dogs = dogInfo;
        excrements.length ? (this.excrements = excrements) : excrements;
    }
}
