import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContenidoPreguntas } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  categoriaActual = 0;

  constructor( private http: HttpClient) { }

  getFeature(){
    return this.http.get<ContenidoPreguntas>(`https://opentdb.com/api.php?amount=30&difficulty=easy&type=multiple`);
  }

  getPreguntasCategoria(categoria: number){
    if (this.categoriaActual !== categoria) {
      this.categoriaActual = categoria;
    }
    return this.http.get<ContenidoPreguntas>(`https://opentdb.com/api.php?amount=20&category=${categoria}&difficulty=easy&type=multiple`);
  }

}
