import { GetOneRecord } from './get-one-record.dto';
import { InsertOneRecord } from './insert-one-record.dto';
import { UpdateOneRecord } from './update-one-record.dto';
export class Mapper{
    
    static toMapInsert(record:InsertOneRecord):Object{
        return {
            "cust_name": record.cust_name,
            "cust_address": record.cust_address
        }
    }

    static toMapUpdate(record:UpdateOneRecord){
        return {
            "cust_name": record.cust_name,
            "cust_address": record.cust_address
        }
    }

    static toGet(map:Object){
        return new GetOneRecord(map['id'], map['cust_name'], map['cust_address'])
    }
}