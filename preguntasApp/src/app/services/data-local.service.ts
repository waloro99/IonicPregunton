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

  async obtenerUsuarios(){
    await this.cargarUsuarios();
    return this.personas;
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

  async modificarUsuario(categoria: string, min: number, seg: number, res: number){
    await this.cargarUsuarios();
    this.personas[this.personas.length -1].categoria = categoria;
    this.personas[this.personas.length -1].tiempoM = min;
    this.personas[this.personas.length -1].tiempoS = seg;
    this.personas[this.personas.length -1].respuestas = res;
    this.storage.set('usuarios', this.personas);
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
    console.log(user);
    const existe = this.personas.find(person => 
      person.usuario === user);
    return (existe) ? true:false;
  }
}
