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
  
  total: number = -1;
  registros: Especialidade[] = Array<Especialidade>();
  showing:number[] = Array<number>();

  get(termoBusca?: string | undefined): void {
    this.servico.getProfessionals(termoBusca).subscribe({
      next: (resposta: Especialidade[]) => {
        this.registros = resposta;
        if(this.total < 0){
          this.total = resposta.length;
        }
      }
    });
  }

  delete(id: number): void {
    if (confirm("Deseja excluir a especialidade?")) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
        }
      });
    }
  }

  showSubTable(id: number): void {
    if (this.showing.indexOf(id) === -1) {
      this.showing.push(id);
    } else {
      this.showing.splice(this.showing.indexOf(id), 1);
    }
  }

  isShowing(id: number): boolean {
    return this.showing.indexOf(id)!== -1;
  }

}
