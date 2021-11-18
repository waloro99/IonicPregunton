import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  flag_creada = false;
  personas: Usuarios[] = [];

  constructor(private storage: Storage) { 
    this.cargarUsuarios();
  }


  guardarUsuario( usuario: Usuarios){

    let existe = false;
    let mensaje = '';

    for (const user of this.personas) {
      if (user.usuario === usuario.usuario) {
        existe = true;
        break;
      }
    }

    if(existe){
      mensaje = 'Removido de favoritos';
    }else{
      this.personas.push(usuario);
      mensaje = 'Agregada a favoritos';
    }
    this.storage.create();
    this.storage.set('usuarios', this.personas);
    return !existe;
  }

  async cargarUsuarios(){
    this.storage.create();
    const personas = await this.storage.get('usuarios');
    this.personas = personas || [];
    console.log(this.personas)
    return this.personas;
  }

  async existeUsuario(user){
    await this.cargarUsuarios();
    const existe = this.personas.find(person => 
      person.usuario === user);
    return (existe) ? true:false;
  }
}
