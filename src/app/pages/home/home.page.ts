import { Component, OnInit, Optional } from '@angular/core';
import { LoadingController, IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  loading!: HTMLIonLoadingElement;
  ano = new Date().getFullYear();

  titulo = 'silMob v.5.0.15';

  constructor(
    private platform: Platform,
    private loadingCtrl: LoadingController,
    private route: Router,
    @Optional() private routerOutlet?: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.routerOutlet && !this.routerOutlet.canGoBack()) {
        this.salir();
      }
    });
  }

  salir() {
  //   msg('¿Salir de la aplicación?', ['Si', 'No']).then((resp) => {
  //     resp && App.exitApp();
  //   });
  App.exitApp();
  }

  async evLeer() {

    // try {
    //     if (this.dataService.isEmptyDB()) {
    //       await this.dataService.loadLecturas();
    //       await this.dataService.loadIncidencias();

    //       if (this.dataService.isEmptyDB()) throw new Error('La base de datos está vacía. Realice una carga para continuar.');
    //     }

    //     this.route.navigateByUrl('/contratos');

    //   } catch (error: any) {

    //     if (<string>error.message.includes('no such table')) {
    //       msg({
    //         head: 'No se encuentra la BD.',
    //         subh: 'Debe crearla desde el menú: Configuración',
    //       });
    //       return
    //     } 
       
    //     msg({ head: 'Se produjo una incidencia:', subh: error['message'] });

    //   }

  }

  evPartes() {
    // msg('Partes de trabajo');
  }

  async showLoading(message: string) {
    // this.loading = await this.loadingCtrl.create({ message });
    // this.loading.present();
  }

  ngOnInit(): void {}
}
