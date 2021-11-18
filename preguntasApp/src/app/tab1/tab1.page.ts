import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Usuarios } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  personas: Array<Usuarios>[] = [];
  persona: Usuarios[] = [];
  nombre: string = null;
  usuario: string = null;

  constructor(private toastCtrl: ToastController) {}

  guardarDatos(){
    if (this.nombre === null || this.usuario === null) {
      let msg= 'Ingrese su  nombre y su usuario...';
      this.presentToast(msg);
      return;
    }
    
    //envia mensaje de que se ingreso
    let msg= 'Se agrego el usuario ' + this.usuario + ' exitosamente!';
    this.presentToast(msg);
  }

  borrarDatos(){
    this.nombre = null;
    this.usuario = null;
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 1500
    });
    toast.present();
  }
}
