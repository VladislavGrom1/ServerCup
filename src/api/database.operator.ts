import  {Database as DatabaseType, Statement } from "better-sqlite3";
const Database = require('better-sqlite3');

//TODO: Реализовать selectAll, insert, update и добавить ковертер из dto в object

export class DatabaseOperator{
    private db:DatabaseType
    private select:Statement<number, string>
    private selectAll:Statement
    private insert:Statement
    private update:Statement
    private delete:Statement<number>
    private deleteAll:Statement
    private table_name:string = 'customers' 
    private updateAutoInc:Statement;
    
    constructor(db_file_path) {
        this.db = new Database(db_file_path, { verbose: console.log });
        this.createTable();
        this.select = this.db.prepare(`SELECT cust_name FROM ${this.table_name} WHERE cust_Id = ?`);
        this.selectAll = this.db.prepare(`SELECT * FROM ${this.table_name}`);
        this.insert = this.db.prepare(`INSERT INTO ${this.table_name} (cust_name, cust_address) VALUES (@cust_name, @cust_address)`);
        this.update = this.db.prepare(`UPDATE ${this.table_name} SET cust_name = @cust_name, cust_address = @cust_address WHERE cust_Id = ?`);
        this.delete = this.db.prepare(`DELETE FROM ${this.table_name} WHERE cust_Id = ?`);
        this.deleteAll = this.db.prepare(`DELETE FROM ${this.table_name}`);
        // Сброс автоинкремента при удалении всех записей в БД
        this.updateAutoInc = this.db.prepare(`UPDATE sqlite_sequence SET SEQ=0 WHERE NAME='customers'`);
    }

    private createTable(){
        this.db.exec(`CREATE TABLE IF NOT EXISTS ${this.table_name} (
            cust_Id    INTEGER, 
            cust_name    TEXT,
            cust_address    TEXT,
            PRIMARY KEY(cust_Id AUTOINCREMENT)
        );`)
    }

    getOneRecord(id: number):string{
        return this.select.get(id);
    }

    getAllRecords(): Array<Object>{
        return this.selectAll.all()
    }

    insertOneRecord(record:Object){
        this.insert.run(record);
    }

    updateOneRecord(id:number, record:Object){
        this.update.run(id, record)
    }

    deleteOneRecord(id: number){
        this.delete.run(id);
    }

    deleteAllRecords(){
        // Сброс автоинкремента при удалении всех строк в БД
        this.updateAutoInc.run();
        this.deleteAll.run();
    }




}