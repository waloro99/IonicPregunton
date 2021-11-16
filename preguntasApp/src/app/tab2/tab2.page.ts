import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { PreguntasService } from '../services/preguntas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  categorias = ['Sports', 'History', 'Animals', 'Vehicles', 'Celebrities', 'Video Games'];
  form = ['1','2','3','4']
  constructor(private preguntasService: PreguntasService) {}

  ngOnInit(){
    this.preguntasService.getFeature()
    .subscribe(console.log);
  }

  cambioCategoria(event){
    console.log('hacer algo');
  }

}
