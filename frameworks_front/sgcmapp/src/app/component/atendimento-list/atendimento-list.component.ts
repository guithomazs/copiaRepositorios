import { Component, OnInit } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from '../model/atendimento';
import { environment } from 'src/environments/environment.development';
import { AtendimentoService } from 'src/app/service/atendimento.service';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements IList<Atendimento>, OnInit{

  constructor(private servico: AtendimentoService) {};

  ngOnInit(): void {
      this.get();
  }

  apiUrl: string = environment.API_URL + "/config/especialidade/";
  
  registros: Atendimento[]  = Array<Atendimento>();;
  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta;
      }
    });
  }
  delete(id: number): void {
    this.servico.delete(id).subscribe({});
  }

}
