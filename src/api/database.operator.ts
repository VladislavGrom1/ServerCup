import  {Database as DatabaseType, Statement } from "better-sqlite3";
import { cursorTo } from "readline";
import { InsertOneLocation, InsertOneRecord } from "src/records/dtos/insert-one.dto";
import { GetOneLocation } from '../records/dtos/get-one.dto';
const Database = require('better-sqlite3');

//TODO: Реализовать selectAll, insert, update и добавить ковертер из dto в object

export class DatabaseOperator{
    private db:DatabaseType
    private selectRec:Statement
    private selectLoc:Statement
    private selectAllLoc:Statement
    private selectAllRec:Statement
    private insertLoc:Statement
    private insertRec:Statement
    private updateLoc:Statement
    private updateRec:Statement
    private deleteRec:Statement<number>
    private deleteLoc:Statement<number>
    private deleteAllLoc:Statement
    private deleteAllRec:Statement
    private table_records:string = 'records' 
    private table_location:string = 'location'
    private updateAutoIncRec:Statement;
    private updateAutoIncLoc:Statement;
    
    constructor(db_file_path) {
        this.db = new Database(db_file_path, { verbose: console.log });
        this.createTableLocation();
        this.createTableRecords();
        // Запросы на получение данных
        this.selectLoc = this.db.prepare(`SELECT * FROM ${this.table_location} WHERE id = ?;`)
        this.selectRec = this.db.prepare(`SELECT * FROM ${this.table_records} WHERE id = ?;`)
        this.selectAllLoc = this.db.prepare(`SELECT * FROM ${this.table_location}`);
        this.selectAllRec = this.db.prepare(`SELECT * FROM ${this.table_records}`);
        // Запросы на вставку данных
        this.insertLoc = this.db.prepare(`INSERT INTO ${this.table_location} (name, latitude, longitude) VALUES (@name, @latitude, @longitude);`);
        this.insertRec = this.db.prepare(`INSERT INTO ${this.table_records} (location, latitude, longitude, date_start, date_end) VALUES (@location, @latitude, @longitude, @date_start, @date_end)`);
        // Запросы на обновление данных
        this.updateLoc = this.db.prepare(`UPDATE ${this.table_location} SET name = @name, latitude = @latitude, longitude = @longitude WHERE id = ?`)
        this.updateRec = this.db.prepare(`UPDATE ${this.table_records} SET location = @location, latitude = @latitude, longitude = @longitude, date_start = @date_start, date_end = @date_end WHERE id = ?`);
        // Сброс автоинкремента при удалении всех записей в БД
        this.updateAutoIncRec = this.db.prepare(`UPDATE sqlite_sequence SET SEQ=0 WHERE NAME='records'`);
        this.updateAutoIncLoc = this.db.prepare(`UPDATE sqlite_sequence SET SEQ=0 WHERE NAME='location'`);
        // Запросы на удаление данных
        this.deleteRec = this.db.prepare(`DELETE FROM ${this.table_records} WHERE id = ?`);
        this.deleteLoc = this.db.prepare(`DELETE FROM ${this.table_location} WHERE id = ?`);
        this.deleteAllRec = this.db.prepare(`DELETE FROM ${this.table_records}`);
        this.deleteAllLoc = this.db.prepare(`DELETE FROM ${this.table_location}`);
        
    }

    private createTableLocation(){
        this.db.exec(`CREATE TABLE IF NOT EXISTS ${this.table_location}(
            id INTEGER, 
            name STRING, 
            latitude DOUBLE, 
            longitude DOUBLE, 
            PRIMARY KEY (id AUTOINCREMENT)
        );`)
    }

    private createTableRecords(){
        this.db.exec(`CREATE TABLE IF NOT EXISTS ${this.table_records}(
            id  INTEGER, 
            location  INTEGER,
            latitude DOUBLE,
            longitude DOUBLE,
            date_start STRING,
            date_end STRING,
            PRIMARY KEY (id AUTOINCREMENT),
            FOREIGN KEY (location) REFERENCES ${this.table_location} (id)
        );`)
    }

    

    getOneRecord(id: number):Object{
        return this.selectRec.get(id);
    }

    getOneLocation(id: number):Object{
        return this.selectLoc.get(id);
    }

    getAllRecords(): Array<Object>{
        return this.selectAllRec.all();
    }

    getAllLocations(): Array<Object>{
        return this.selectAllLoc.all();
    }

    insertOneRecord(record:Object){
        this.insertRec.run(record);
    }

    insertOneLocation(location:Object){
        this.insertLoc.run(location);
    }

    insertManyRecords(records:Array<Object>){
        for (const record of records){
            this.insertRec.run(record);
        }   
    }

    insertManyLocations(locations:Array<Object>){
        for (const location of locations){
            this.insertLoc.run(location);
        }
    }

    updateOneRecord(id:number, record:Object){
        this.updateRec.run(id, record);
    }

    updateOneLocation(id:number, location:Object){
        this.updateLoc.run(id, location);
    }

    deleteOneRecord(id: number){
        this.deleteRec.run(id);
    }

    deleteOneLocation(id: number){
        this.deleteLoc.run(id);
    }

    deleteAllLocations(){
        // Сброс автоинкремента при удалении всех строк в БД
        this.updateAutoIncLoc.run();
        this.deleteAllLoc.run();
    }

    deleteAllRecords(){
        // Сброс автоинкремента при удалении всех строк в БД
        this.updateAutoIncRec.run();
        this.deleteAllRec.run();
    }




}