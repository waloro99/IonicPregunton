import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor( private http: HttpClient) { }

  getFeature(){
    return this.http.get(`https://opentdb.com/api.php?amount=30&difficulty=easy&type=multiple`);
  }

}
