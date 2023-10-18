import { Component, OnInit } from '@angular/core';
import { Unidade } from '../../model/unidade';
import { IList } from '../../i-list';
import { UnidadeService } from 'src/app/service/unidade.service';

@Component({
  selector: 'app-unidades-list',
  templateUrl: './unidades-list.component.html',
  styleUrls: ['./unidades-list.component.css']
})
export class UnidadesListComponent implements IList<Unidade>, OnInit{
  
  constructor (private servico: UnidadeService) {}
  
  ngOnInit(): void {
    this.get();
  }

  registros: Unidade[] = Array<Unidade>();
  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Unidade[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    this.servico.delete(id).subscribe({});
  }

}
