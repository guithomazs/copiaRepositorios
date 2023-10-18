import { Component, OnInit } from '@angular/core';
import { IList } from '../../i-list';
import { Profissional } from '../../model/profissional';
import { ProfissionalService } from 'src/app/service/profissional.service';

@Component({
  selector: 'app-profissionais-list',
  templateUrl: './profissionais-list.component.html',
  styleUrls: ['./profissionais-list.component.css']
})
export class ProfissionaisListComponent implements IList<Profissional>, OnInit{

  constructor (private servico: ProfissionalService) {}
  
  ngOnInit(): void {
    this.get();
  }
  
  registros: Profissional[] = Array<Profissional>();
  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Profissional[]) => {
        this.registros = resposta;
      }
    });
  }
  delete(id: number): void {
    if (confirm("Deseja remover o profissional?")) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
        }
      });
    }
  }

}
