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

//Guardar Respuestas
  buenasRes: number = 0;

  flag_categoria: boolean = false; 


  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['Sports', 'History', 'Books', 'Music', 'Television', 'Video Games'];
  preguntas: Preguntas[] = [];
  selectCategoria = '';
  numberCate: number = 21;
  constructor(private preguntasService: PreguntasService,
              private toastCtrl: ToastController) {}

  ngOnInit(){
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
      this.flag_categoria = true;
      this.preguntas = [];
      this.selectCategoria = event.detail.value;
      this.cargarPreguntas(event.detail.value);
      this.flag_reiniciar = true;
      let msg= 'Tiene 60 minutos, suerte!';
      this.presentToast(msg);
      this.Reloj();
    }else{
      window.location.reload();
      this.flag_reiniciar = false;
    }
  }

  cargarPreguntas(categoria: string, event ?){
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

  //Guardar Datos de tiempo y respuestas buenas
  guardarDatos(){
    //si presiona el boton sin esoger categoria
    if (this.flag_categoria === false) {
      let msg= 'Escoga una categoria!!!';
      this.presentToast(msg);
    }else{
      this.clock.unsubscribe();
      console.log('Tiempo min: ' + this.minutes + ' seg: ' + this.seconds);
      console.log(this.buenasRes)
      this.flag_categoria = false;
    }
  }

  //obtener los valores de los check
  obtenerRes(event){
    //console.log(event)
    let radioSelect = event.detail.value.split('-');
    let valorRadio = 0;
    valorRadio = parseInt(radioSelect[2]);
    if (valorRadio === 2 || valorRadio === 6 || valorRadio === 10 || valorRadio === 14 ) {
      this.buenasRes += 1;
    }else if (valorRadio === 18 || valorRadio === 22 || valorRadio === 26 || valorRadio === 30 ) {
      this.buenasRes += 1;
    }else if (valorRadio === 34 || valorRadio === 38 || valorRadio === 42 || valorRadio === 46 ) {
      this.buenasRes += 1;
    }else if (valorRadio === 50 || valorRadio === 54 || valorRadio === 58 || valorRadio === 62 ) {
      this.buenasRes += 1;
    }else if (valorRadio === 66 || valorRadio === 70 || valorRadio === 74 || valorRadio === 78 ) {
      this.buenasRes += 1;
    }
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
