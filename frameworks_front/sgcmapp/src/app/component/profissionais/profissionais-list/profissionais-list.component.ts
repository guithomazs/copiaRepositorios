import { Component } from '@angular/core';
import { IList } from '../../i-list';
import { Profissional } from '../../model/profissional';

@Component({
  selector: 'app-profissionais-list',
  templateUrl: './profissionais-list.component.html',
  styleUrls: ['./profissionais-list.component.css']
})
export class ProfissionaisListComponent implements IList<Profissional>{
  
  registros: Profissional[] = Array<Profissional>();
  get(termoBusca?: string | undefined): void {
    throw new Error('Method not implemented.');
  }
  delete(id: number): void {
    throw new Error('Method not implemented.');
  }

}
