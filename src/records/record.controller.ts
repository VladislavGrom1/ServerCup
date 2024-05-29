import { Controller, Get, Post } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('get')
  get(): string {
    return "";
  }

  @Post('set')
  set(): string {
    return "";
  }
}
