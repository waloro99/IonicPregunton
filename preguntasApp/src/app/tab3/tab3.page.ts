import { Component} from '@angular/core';
import { DataLocalService } from '../services/data-local.service';
import { Usuarios } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  personas: Usuarios[] = [];

  constructor(private psCtrl: DataLocalService) {
    
  }

  //ordena por respuesta, tiempo min y tiempo seg
  async ionViewWillEnter(){
    this.personas = await this.psCtrl.obtenerUsuarios();
    this.personas.sort(((a,b) => b.respuestas - a.respuestas || a.tiempoM - b.tiempoM || a.tiempoS - b.tiempoS));
  }

}
