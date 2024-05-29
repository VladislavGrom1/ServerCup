import {IsNotEmpty} from 'class-validator';

export class GetOneRecord{
    constructor(id: number, cust_name: string, cust_address: string){
        this.id = id;
        this.cust_name = cust_name;
        this.cust_address = cust_address;
    }
    @IsNotEmpty()
    readonly id: number;

    @IsNotEmpty()
    readonly cust_name: string;

    @IsNotEmpty()
    readonly cust_address: string;
}