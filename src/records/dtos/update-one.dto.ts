import {IsNotEmpty} from 'class-validator';

export class UpdateOneRecord{
    @IsNotEmpty()
    readonly location: number;

    @IsNotEmpty()
    readonly latitude: number;

    @IsNotEmpty()
    readonly longitude: number;

    @IsNotEmpty()
    readonly date_start: string;

    @IsNotEmpty()
    readonly date_end: string;
}

export class UpdateOneLocation{
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly latitude: number;

    @IsNotEmpty()
    readonly longitude: number;
}