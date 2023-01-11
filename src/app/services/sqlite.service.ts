import { Injectable } from '@angular/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';
import { silMobStruc } from '../../assets/data/silmob-struc';

const DB_HABITS = '';

@Injectable({
  providedIn: 'root',
})
export class SQLiteService {
  public  dbName  = '';
  private sqlite  : SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!     : SQLiteDBConnection;

  constructor() {}

  async getVersion() {
    const result = await this.query('SELECT sqlite_version() as v');
    return 'SQLite ' + (result[0]['v'] || '(inactivo)');
  }

  saveToStore() {
    if (!Capacitor.isNativePlatform()) this.sqlite.saveToStore(this.dbName);
  }

  async initializePlugin() {
      if (!Capacitor.isNativePlatform()) {
        await this.sqlite.initWebStore();
      }
  

      this.db = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        1,
        false
      );
  
      await this.db.open();
  }

  async createDbStructure() {

    const result = await this.db.execute(silMobStruc,false);
    this.saveToStore();

    return result;

  }

  async closeConnection(): Promise<void> {
    if(this.sqlite != null) {
        try {
            await this.sqlite.closeConnection(this.dbName,false);
            return Promise.resolve();
        } catch (err : any) {
            return Promise.reject(new Error(err));
        }
    } else {
        return Promise.reject(new Error(`${this.dbName} no está conectada.`));
    }
}

  async beginTransaction() {
    await this.db.query('BEGIN TRANSACTION;');
  }

  async commit() {
    await this.db.query('COMMIT;');
  }

  async rollback() {
    await this.db.query('ROLLBACK;');
  }

  async query(query : string) {
    
    const result = await this.db.query(query);

    if (result.values && result.values.length > 0) {
      return result.values;
    } else {
      return [];
    }

  }

  async exec(exec : string, transactional : boolean = false) {
      const result = await this.db.execute(exec,transactional);
      this.saveToStore();
      return result;
  }

  async execBatch(exec : string, transactional : boolean = false) {
    const result = await this.db.execute(exec,transactional);
    return result;
}



  async getNumRows(table : string, where : string = '') : Promise<number|undefined> {
    const _sql = `SELECT count(*) AS nr FROM ${table} ${where ?'WHERE '+where:''};`;
    const nr = await this.db.query(_sql);
    return nr.values?+nr.values[0].nr:-1;
  }

}
