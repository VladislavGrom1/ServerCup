import { Injectable } from '@nestjs/common';
import { DatabaseOperator } from '../api/database.operator';
import { Statement } from 'better-sqlite3';
import { InsertOneRecord } from './dtos/insert-one-record.dto';
import { Mapper } from './dtos/mapper';
import { UpdateOneRecord } from './dtos/update-one-record.dto';
import { GetOneRecord } from './dtos/get-one-record.dto';

@Injectable()
export class RecordService {
  dbo: DatabaseOperator;
  constructor() {
    this.dbo = new DatabaseOperator('db.db');
  }

  getOneRecord(id:number): GetOneRecord {
    return Mapper.toGet(this.dbo.getOneRecord(id));
  }

  getAllRecords(): Array<GetOneRecord>{
    return this.dbo.getAllRecords().map(Mapper.toGet);
  }

  deleteOneRecord(id:number) {
     this.dbo.deleteOneRecord(id);
  }

  deleteAllRecords() {
     this.dbo.deleteAllRecords();
  }

  insertOneRecord(record:InsertOneRecord)
  {
    this.dbo.insertOneRecord(Mapper.toMapInsert(record));
  }

  updateOneRecord(id:number, record:UpdateOneRecord)
  {
    this.dbo.updateOneRecord(id, Mapper.toMapUpdate(record));
  }
}
