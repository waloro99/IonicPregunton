import { Component, Output, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Usuarios } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';

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

  persona: Usuarios = {
    nombre: '',
    usuario: '',
    respuestas: 0,
    tiempoM: 0,
    tiempoS: 0,
    categoria: ''
  };
  nombre: string = null;
  usuario: string = null;

  constructor(private toastCtrl: ToastController,
              private psCtrl: DataLocalService ) {}

  guardarDatos(){
    if (this.nombre === null || this.usuario === null) {
      let msg= 'Ingrese su  nombre y su usuario...';
      this.presentToast(msg);
      return;
    }
    
    this.persona.nombre = this.nombre;
    this.persona.usuario = this.usuario;
    this.persona.categoria = 'NA';
    this.persona.tiempoM = 0;
    this.persona.tiempoS = 0;
    this.persona.respuestas = 0;
    this.psCtrl.guardarUsuario(this.persona);
    console.log('xd');
    //envia mensaje de que se ingreso
    let msg= 'Se agrego el usuario ' + this.usuario + ' exitosamente!';
    this.presentToast(msg);
    return;
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
