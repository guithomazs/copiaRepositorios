import { Component, OnInit } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from '../model/atendimento';
import { AtendimentoService } from 'src/app/service/atendimento.service';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styles: [
  ]
})

export class AgendaListComponent implements IList<Atendimento>, OnInit{

  constructor (private servico: AtendimentoService) {}
  
  ngOnInit(): void {
    this.get();
  }


  registros: Atendimento[] = Array<Atendimento>();

  get(termoBusca?: string | undefined): void{
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta;
      }
    });
  }
  
  delete(id: number): void{
    this.servico.delete(id).subscribe({});
  }

}
