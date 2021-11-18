import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContenidoPreguntas } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor( private http: HttpClient) { }

  getFeature(){
    return this.http.get<ContenidoPreguntas>(`https://opentdb.com/api.php?amount=30&difficulty=easy&type=multiple`);
  }

}
