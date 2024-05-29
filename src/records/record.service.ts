import { Injectable } from '@nestjs/common';

@Injectable()
export class RecordService {
  messageMain(): string {
    return 'Hello World!';
  }
}
