import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecordController } from './records/record.controller';
import { RecordService } from './records/record.service';

@Module({
  imports: [],
  controllers: [AppController, RecordController],
  providers: [AppService, RecordService],
})

export class AppModule {}
