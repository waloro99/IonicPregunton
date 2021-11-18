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

  async ionViewWillEnter(){
    this.personas = await this.psCtrl.obtenerUsuarios();
  }

}
