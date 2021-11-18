import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment, ToastController } from '@ionic/angular';
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
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  source = timer(1000, 1000);
  clock: any;
  flag_time: boolean = false;
  flag_reiniciar: boolean = false; 
//FIN CONTADOR


  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['Sports', 'History', 'Books', 'Music', 'Television', 'Video Games'];
  preguntas: Preguntas[] = [];
  selectCategoria = '';
  numberCate: number = 21;
  constructor(private preguntasService: PreguntasService,
              private toastCtrl: ToastController) {}

  ngOnInit(){
   // this.preguntasService.getFeature()
   // .subscribe(console.log);
   
  }

  //tiempo
  Reloj(){
    this.clock = this.source.subscribe((t: number) => {
      if (this.flag_time === false) {
        this.seconds = t;
        if (this.seconds === 59) {
          if (this.minutes === 59) {
            this.flag_time = true;
            return;
          }
          this.clock.unsubscribe();
          this.seconds = 0;
          this.minutes += 1;
          this.Reloj();
        }
      }
    });
  }

  //categoria
  cambioCategoria(event){
    if (this.flag_reiniciar === false) {
      this.preguntas = [];
      this.selectCategoria = event.detail.value;
      this.cargarNoticias(event.detail.value);
      this.flag_reiniciar = true;
      let msg= 'Tiene 60 minutos, suerte!';
      this.presentToast(msg);
      this.Reloj();
    }else{
      window.location.reload();
      this.flag_reiniciar = false;
    }
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

  //envia mensaje
  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}
