import { Component } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from '@capacitor-community/sqlite';

import { menuPrincipal } from './app-menu';
import { SQLiteService } from './services/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  opcionesMenu = menuPrincipal;
  isWeb = false;

  constructor(private database: SQLiteService) {
    database.dbName = 'silmob.';
    this.initApp();
  }

  async initApp() {
    if (!Capacitor.isNativePlatform()) {
      this.isWeb = true;
      const res = await customElements.whenDefined('jeep-sqlite');
    }
    try {
      await this.database.initializePlugin();
      console.log('SQLite Initialize Plugin');
      const v = await this.database.getVersion();
      console.log(`SQLite ${v} plugin ok`);
    } catch (error : any) {
      console.error('ERROR: ',error.message);
    }


    SplashScreen.hide();
  }  

}
