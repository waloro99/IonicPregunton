import { Component, OnInit } from '@angular/core';
import { PreguntasService } from '../services/preguntas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private preguntasService: PreguntasService) {}

  ngOnInit(){
    this.preguntasService.getFeature()
    .subscribe(console.log);
  }

}
