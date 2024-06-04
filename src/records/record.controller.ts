import { Controller, Get, Post, Param, HttpCode, HttpStatus, Body, Delete, Patch, Inject } from '@nestjs/common';
import { IRecordService } from './record.service';
import { InsertOneLocation, InsertOneRecord } from './dtos/insert-one.dto';
import { UpdateOneRecord, UpdateOneLocation } from './dtos/update-one.dto';
import { GetOneLocation, GetOneRecord } from './dtos/get-one.dto';

@Controller('records')
export class RecordController {
  constructor(
    @Inject("RecordService")
    private readonly recordService: IRecordService
  ) { }


  //TODO: Insert Many добавить , Добавить конвертер 

  @Get('getOneRecord:id')
  getOneRecord(@Param('id') id: number): GetOneRecord {
    return this.recordService.getOneRecord(id);
  }

  @Get('getOneLocation:id')
  getOneLocation(@Param('id') id: number): GetOneLocation {
    return this.recordService.getOneLocation(id);
  }

  // TODO Возвращаемое значение DTO
  @Get('getAllRecords')
  getAllRecords(): Array<GetOneRecord> {
    return this.recordService.getAllRecords();
  }

  @Get('getAllLocations')
  getAllLocations(): Array<GetOneLocation>{
    return this.recordService.getAllLocations();
  }

  @Post('insertOneRecord')
  @HttpCode(HttpStatus.CREATED)
  insertOneRecord(@Body() insertRecord: InsertOneRecord) {
    return this.recordService.insertOneRecord(insertRecord);
  }

  @Post('insertOneLocation')
  @HttpCode(HttpStatus.CREATED)
  insertOneLocation(@Body() insertLocation: InsertOneLocation) {
    return this.recordService.insertOneLocation(insertLocation);
  }

  @Post('insertManyRecords')
  @HttpCode(HttpStatus.CREATED)
  insertManyRecords(@Body() insertManyRec: Array<InsertOneRecord>){
    return this.recordService.insertManyRecords(insertManyRec);
  }

  @Post('insertManyLocations')
  @HttpCode(HttpStatus.CREATED)
  insertManyLocations(@Body() insertManyLoc: Array<InsertOneLocation>){
    return this.recordService.insertManyLocations(insertManyLoc);
  }

  @Delete('deleteOneRecord:id')
  @HttpCode(204)
  deleteOneRecord(@Param('id') id: number) {
    this.recordService.deleteOneRecord(id);
  }

  @Delete('deleteOneLocation:id')
  @HttpCode(204)
  deleteOneLocation(@Param('id') id: number){
    this.recordService.deleteOneLocation(id);
  }

  @Delete('deleteAllRecords')
  @HttpCode(204)
  deleteAllRecords() {
    this.recordService.deleteAllRecords();
  }

  @Delete('deleteAllLocations')
  @HttpCode(204)
  deleteAllLocations() {
    this.recordService.deleteAllLocations();
  }

  @Patch('updateOneRecord:id')
  @HttpCode(204)
  updateOneRecord(@Param('id') id: number, @Body() updateRec: UpdateOneRecord) {
    this.recordService.updateOneRecord(id, updateRec);
  }

  @Patch('updateOneLocation:id')
  @HttpCode(204)
  UpdateOneLocation(@Param('id') id: number, @Body() updateLoc: UpdateOneLocation){
    this.recordService.updateOneLocation(id, updateLoc);
  }

}
