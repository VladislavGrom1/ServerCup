import { loadavg } from 'os';
import { GetOneRecord, GetOneLocation } from './get-one.dto';
import { InsertOneLocation, InsertOneRecord } from './insert-one.dto';
import { UpdateOneRecord, UpdateOneLocation } from './update-one.dto';

export class Mapper{
    
    static toMapInsertLocation(location:InsertOneLocation):Object{
        return {
            "name": location.name,
            "latitude": location.latitude,
            "longitude": location.longitude,
        }
    }

    static toMapInsertRecord(record:InsertOneRecord):Object{
        return {
            "location": record.location,
            "latitude": record.latitude,
            "longitude": record.longitude,
            "date_start": record.date_start,
            "date_end": record.date_end
        }
    }

    static toMapInsertManyRecords(records:Array<InsertOneRecord>):Array<Object>{
        let recordsMap: Array<Object> = [];
        for (const record of records)
            recordsMap.push({"location": record.location,"latitude": record.latitude,"longitude": record.longitude,"date_start": record.date_start,"date_end": record.date_end});
        return recordsMap;
    }

    static toMapInsertManyLocations(locations:Array<InsertOneLocation>):Array<Object>{
        let locationsMap: Array<Object> = []
        for (const location of locations)
            locationsMap.push({"name": location.name,"latitude": location.latitude,"longitude": location.longitude});
        return locationsMap;
    }

    static toMapUpdateLocation(location:UpdateOneLocation){
        return {
            "name": location.name,
            "latitude": location.latitude,
            "longitude": location.longitude
        }
    }

    static toMapUpdateRecord(record:UpdateOneRecord){
        return {
            "location": record.location,
            "latitude": record.latitude,
            "longitude": record.longitude,
            "date_start": record.date_start,
            "date_end": record.date_end
        }
    }

    static toGetRecord(map:Object){
        return new GetOneRecord(map['id'], map['location'], map['latitude'], map['longitude'], map['date_start'], map['date_end'])
    }

    static toGetLocation(map:Object){
        return new GetOneLocation(map['id'], map['name'], map['latitude'], map['longitude'])
    }
}