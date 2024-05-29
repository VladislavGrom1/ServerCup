import  {Database as DatabaseType, Statement } from "better-sqlite3";
const Database = require('better-sqlite3');

//TODO: Реализовать selectAll, insert, update и добавить ковертер из dto в object

export class DatabaseOperator{
    private db:DatabaseType
    private select:Statement<number, string>
    private selectAll:Statement<number, string>
    private insert:Statement<object>
    private update:Statement
    private delete:Statement<number>
    private deleteAll:Statement
    private table_name:string = 'customers' 
    //insert:
    constructor(db_file_path) {
        this.db = new Database(db_file_path, { verbose: console.log });
        this.createTable();
        this.select = this.db.prepare(`SELECT cust_name FROM ${this.table_name} WHERE cust_Id = ?`);
        this.selectAll = this.db.prepare(`SELECT * FROM ${this.table_name}`);
        this.insert = this.db.prepare(`INSERT INTO ${this.table_name} (cust_name, cust_address) VALUES (@cust_name, @cust_address)`);

        this.delete = this.db.prepare(`DELETE FROM ${this.table_name} WHERE cust_Id = ?`);
        this.deleteAll = this.db.prepare(`DELETE FROM ${this.table_name}`);
        //this.insert.run({"cust_name":"Vasya", "cust_address":"Volgograd"});
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

    deleteOneRecord(id: number){
        this.delete.run(id);
    }

    deleteAllRecords(){
        this.deleteAll.run();
    }
}