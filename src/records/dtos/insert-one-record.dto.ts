import {IsNotEmpty} from 'class-validator';


export class InsertOneRecord{
    @IsNotEmpty()
    readonly cust_name: string;

    @IsNotEmpty()
    readonly cust_address: string;

}

