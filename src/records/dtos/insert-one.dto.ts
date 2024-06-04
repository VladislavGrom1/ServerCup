import {IsNotEmpty} from 'class-validator';


export class InsertOneLocation{

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly latitude: number;

    @IsNotEmpty()
    readonly longitude: number;

}

export class InsertOneRecord{
    
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



