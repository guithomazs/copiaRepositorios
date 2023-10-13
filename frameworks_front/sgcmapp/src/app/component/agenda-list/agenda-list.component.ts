import { Component } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from '../model/atendimento';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styles: [
  ]
})

export class AgendaListComponent implements IList<Atendimento>{

  registros: Atendimento[] = Array<Atendimento>();

  get(termoBusca?: string | undefined): void{
    throw new Error("Method not implemented.");
  }
  
  delete(id: number): void{
    console.log("teste 1");
  }

}
