import { Injectable } from '@nestjs/common';
import { DatabaseOperator } from '../api/database.operator';

@Injectable()
export class RecordService {
  dbo: DatabaseOperator;
  constructor() {
    this.dbo = new DatabaseOperator('db.db');
  }

  getOneRecord(id:number): string {
    return this.dbo.getOneRecord(id);
  }

  deleteOneRecord(id:number) {
     this.dbo.deleteOneRecord(id);
  }

  deleteAllRecords() {
     this.dbo.deleteAllRecords();
  }
}
