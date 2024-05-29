import { Controller, Get, Post, Param, HttpCode, HttpStatus, Body, Delete, Patch, Inject } from '@nestjs/common';
import { IRecordService } from './record.service';
import { InsertOneRecord } from './dtos/insert-one-record.dto';
import { UpdateOneRecord } from './dtos/update-one-record.dto';
import { GetOneRecord } from './dtos/get-one-record.dto';


//TODO: Тебе нужно почитать, как выдавать статус при отсутствии данных

@Controller('records')
export class RecordController {
  constructor(
    @Inject("RecordService")
    private readonly recordService: IRecordService
  ) { }


  @Get('getOneRecord:id')
  getOneRecord(@Param('id') id: number): GetOneRecord {
    return this.recordService.getOneRecord(id);
  }


  // TODO Возвращаемое значение DTO
  @Get('getAllRecords')
  getAllRecords(): Array<GetOneRecord> {
    return this.recordService.getAllRecords();
  }

  @Post('insertOneRecord')
  @HttpCode(HttpStatus.CREATED)
  insertOneRecord(@Body() insert: InsertOneRecord) {
    return this.recordService.insertOneRecord(insert);
  }

  @Delete('deleteOneRecord:id')
  @HttpCode(204)
  deleteOneRecord(@Param('id') id: number) {
    this.recordService.deleteOneRecord(id);
  }

  @Delete('deleteAllRecords')
  @HttpCode(204)
  deleteAllRecords() {
    this.recordService.deleteAllRecords();
  }

  @Patch('updateOneRecord:id')
  @HttpCode(204)
  updateOneRecord(@Param('id') id: number, @Body() update: UpdateOneRecord) {
    this.recordService.updateOneRecord(id, update)

  }

}
