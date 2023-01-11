import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';

if (environment.production) {
  enableProdMode();
}

// SQLite para web browser
jeepSqlite(window);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

defineCustomElements(window);  