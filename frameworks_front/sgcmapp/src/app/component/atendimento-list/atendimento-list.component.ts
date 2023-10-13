import { Component } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from '../model/atendimento';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements IList<Atendimento>{
  
  registros: Atendimento[]  = Array<Atendimento>();;
  get(termoBusca?: string | undefined): void {
    throw new Error('Method not implemented.');
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }

}
