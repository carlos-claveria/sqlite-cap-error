import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  // {
  //   path: 'lectura/:id',
  //   loadChildren: () => import('./pages/lectura/lectura.module').then( m => m.LecturaPageModule)
  // },
  // {
  //   path: 'bloqueo',
  //   loadChildren: () => import('./pages/bloqueo/bloqueo.module').then( m => m.BloqueoPageModule)
  // },
  // {
  //   path: 'contratos',
  //   loadChildren: () => import('./pages/contratos/contratos.module').then( m => m.ContratosPageModule)
  // },
  // {
  //   path: 'camconta',
  //   loadChildren: () => import('./pages/camconta/camconta.module').then( m => m.CamcontaPageModule)
  // },
  // {
  //   path: 'historico',
  //   loadChildren: () => import('./pages/historico/historico.module').then( m => m.HistoricoPageModule)
  // },
  // {
  //   path: 'incidencias',
  //   loadChildren: () => import('./pages/incidencias/incidencias.module').then( m => m.IncidenciasPageModule)
  // },
  // {
  //   path: 'geo',
  //   loadChildren: () => import('./pages/geo/geo.module').then( m => m.GeoPageModule)
  // },
  // {
  //   path: 'notas',
  //   loadChildren: () => import('./pages/notas/notas.module').then( m => m.NotasPageModule)
  // },
  // {
  //   path: 'lecconfig',
  //   loadChildren: () => import('./pages/lecconfig/lecconfig.module').then( m => m.LecconfigPageModule)
  // },
  // {
  //   path: 'barcode',
  //   loadChildren: () => import('./pages/barcode/barcode.module').then( m => m.BarcodePageModule)
  // },
  // {
  //   path: 'info',
  //   loadChildren: () => import('./pages/info/info.module').then( m => m.InfoPageModule)
  // },
  // {
  //   path: 'acceso',
  //   loadChildren: () => import('./pages/config/acceso/acceso.module').then( m => m.AccesoPageModule)
  // },

  // {
  //   path: 'fotos/:id',
  //   loadChildren: () => import('./pages/fotos/fotos.module').then( m => m.FotosPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
