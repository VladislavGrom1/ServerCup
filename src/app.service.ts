import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  messageMain(): string {
    return 'Hello World!';
  }
}
