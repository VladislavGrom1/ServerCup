import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { SQLiteRecordService } from './record.service';

@Module({
  controllers: [RecordController],
  providers: [{
    useClass:SQLiteRecordService,
    provide:"RecordService",
  }],
})

export class RecordModule {}
