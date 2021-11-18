import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { PreguntasService } from '../services/preguntas.service';
import { ContenidoPreguntas, Preguntas } from '../interfaces/interfaces';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

//CONTADOR
_second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  end: any;
  now: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
//FIN CONTADOR


  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['Sports', 'History', 'Books', 'Music', 'Television', 'Video Games'];
  preguntas: Preguntas[] = [];
  selectCategoria = '';
  numberCate: number = 21;
  constructor(private preguntasService: PreguntasService) {}

  ngOnInit(){
   // this.preguntasService.getFeature()
   // .subscribe(console.log);
   this.clock = this.source.subscribe(t => {
    this.now = new Date();
    this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
    this.showDate();
  });
  }

  //tiempo
  showDate(){
    let distance = this.end - this.now;
    this.hours = Math.floor((distance % this._hour) / this._hour);
    this.minutes = Math.floor((distance % this._hour) / this._minute);
    this.seconds = Math.floor((distance % this._minute) / this._second);
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
