import {IsNotEmpty} from 'class-validator';

export class GetOneRecord{
    constructor(id: number, location: number, latitude: number, longitude: number, date_start: string, date_end: string){
        this.id = id;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.date_start = date_start;
        this.date_end = date_end;
    }
    @IsNotEmpty()
    readonly id: number;

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

export class GetOneLocation{
    constructor(id: number, name: string, latitude: number, longitude: number){
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly latitude: number;

    @IsNotEmpty()
    readonly longitude: number;
}