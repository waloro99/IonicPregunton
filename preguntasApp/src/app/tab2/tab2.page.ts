import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { PreguntasService } from '../services/preguntas.service';
import { ContenidoPreguntas, Preguntas } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['Sports', 'History', 'Books', 'Music', 'Television', 'Video Games'];
  preguntas: Preguntas[] = [];
  selectCategoria = '';
  numberCate: number = 21;
  constructor(private preguntasService: PreguntasService) {}

  ngOnInit(){
   // this.preguntasService.getFeature()
   // .subscribe(console.log);
  }

  cambioCategoria(event){
    this.preguntas = [];
    this.selectCategoria = event.detail.value;
    this.cargarNoticias(event.detail.value);
    //console.log(event.detail.value);
  }

  cargarNoticias(categoria: string, event ?){
    if(categoria === 'History'){
      this.numberCate = 23;
    }else if (categoria === 'Books') {
      this.numberCate = 10;
    }else if (categoria === 'Music') {
      this.numberCate = 12;
    }else if (categoria === 'Television') {
      this.numberCate = 14;
    }else if (categoria === 'Video Games') {
      this.numberCate = 15;
    }else{
      this.numberCate = 21;
    }
    this.preguntasService.getPreguntasCategoria(this.numberCate)
    .subscribe(resp => {
      //console.log(resp.results);
      this.preguntas.push(...resp.results);
    });
  }

}
