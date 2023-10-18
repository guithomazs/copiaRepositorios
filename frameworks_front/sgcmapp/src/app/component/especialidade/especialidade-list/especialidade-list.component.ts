import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../../model/especialidade';
import { IList } from '../../i-list';
import { EspecialidadeService } from 'src/app/service/especialidade.service';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styleUrls: ['./especialidade-list.component.css']
})
export class EspecialidadeListComponent implements IList<Especialidade>, OnInit{
  
  constructor (private servico: EspecialidadeService) {}
  
  ngOnInit(): void {
    this.get();
  }
  
  registros: Especialidade[] = Array<Especialidade>();

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Especialidade[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    this.servico.delete(id).subscribe({});
  }

}
