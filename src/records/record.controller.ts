import { Controller, Get, Post, Param, HttpCode, HttpStatus, Body, Delete, Patch } from '@nestjs/common';
import { RecordService } from './record.service';
import { InsertOneRecord } from './dtos/insert-one-record.dto';
import { UpdateOneRecord } from './dtos/update-one-record.dto';


//TODO: Тебе нужно почитать, как выдавать статус при отсутствии данных

@Controller('records')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('getOneRecord:id')
  getOneRecord(@Param('id') id: number): string {
    return this.recordService.getOneRecord(id);
  }

  @Get('getAllRecords')
  getAllRecords(): string {
    return "";
  }

  @Post('insertOneRecord')
  @HttpCode(HttpStatus.CREATED)
  insertOneRecord(@Body() insert: InsertOneRecord){

  }

  @Delete('deleteOneRecord:id')
  @HttpCode(204)
  deleteOneRecord(@Param('id') id: number) {
    this.recordService.deleteOneRecord(id);
  }

  @Delete('deleteAllRecords')
  @HttpCode(204)
  deleteAllRecords(){
    this.recordService.deleteAllRecords()
  }

  @Patch(":id")
  @HttpCode(204)
  updateOneRecord(@Param('id') id: number, @Body() update: UpdateOneRecord){
    
  }

}
