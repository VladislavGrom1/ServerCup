import { Injectable } from '@nestjs/common';
import { DatabaseOperator } from '../api/database.operator';
import { InsertOneLocation, InsertOneRecord } from './dtos/insert-one.dto';
import { Mapper } from './dtos/mapper';
import { UpdateOneLocation, UpdateOneRecord } from './dtos/update-one.dto';
import { GetOneRecord, GetOneLocation } from './dtos/get-one.dto';


export interface IRecordService {
  getOneRecord(id:number): GetOneRecord;
  getOneLocation(id:number): GetOneLocation;
  getAllRecords(): Array<GetOneRecord>;
  getAllLocations(): Array<GetOneLocation>;
  deleteOneRecord(id:number);
  deleteOneLocation(id:number);
  deleteAllRecords();
  deleteAllLocations();
  insertOneRecord(record:InsertOneRecord);
  insertOneLocation(location:InsertOneLocation);
  insertManyRecords(records:Array<InsertOneRecord>);
  insertManyLocations(records:Array<InsertOneLocation>);
  updateOneRecord(id:number, record:UpdateOneRecord);
  updateOneLocation(id:number, location:UpdateOneLocation);
  
}

@Injectable()
export class SQLiteRecordService implements IRecordService {
  dbo: DatabaseOperator;
  constructor() {
    this.dbo = new DatabaseOperator('db.db');
  }

  getOneRecord(id:number): GetOneRecord {
    return Mapper.toGetRecord(this.dbo.getOneRecord(id));
  }

  getOneLocation(id: number): GetOneLocation {
    return Mapper.toGetLocation(this.dbo.getOneLocation(id));
  }

  getAllRecords(): Array<GetOneRecord>{
    return this.dbo.getAllRecords().map(Mapper.toGetRecord);
  }

  getAllLocations(): Array<GetOneLocation>{
    return this.dbo.getAllLocations().map(Mapper.toGetLocation);
  }

  deleteOneRecord(id:number) {
     this.dbo.deleteOneRecord(id);
  }

  deleteOneLocation(id:number){
    this.dbo.deleteOneLocation(id);
  }

  deleteAllRecords() {
     this.dbo.deleteAllRecords();
  }

  deleteAllLocations(){
    this.dbo.deleteAllLocations();
  }

  insertOneRecord(record:InsertOneRecord)
  {
    this.dbo.insertOneRecord(Mapper.toMapInsertRecord(record));
  }

  insertOneLocation(location:InsertOneLocation)
  {
    this.dbo.insertOneLocation(Mapper.toMapInsertLocation(location))
  }

  insertManyRecords(records:Array<InsertOneRecord>)
  {
    this.dbo.insertManyRecords(Mapper.toMapInsertManyRecords(records));
  }

  insertManyLocations(locations:Array<InsertOneLocation>)
  {
    this.dbo.insertManyLocations(Mapper.toMapInsertManyLocations(locations));
  }

  updateOneRecord(id:number, record:UpdateOneRecord)
  {
    this.dbo.updateOneRecord(id, Mapper.toMapUpdateRecord(record));
  }

  updateOneLocation(id:number, location:UpdateOneLocation)
  {
    this.dbo.updateOneLocation(id, Mapper.toMapUpdateLocation(location));
  }
}