import { Component, OnInit } from '@angular/core';
import { IList } from '../../i-list';
import { ConvenioService } from 'src/app/service/convenio.service';
import { Convenio } from '../../model/convenio';

@Component({
  selector: 'app-convenios-list',
  templateUrl: './convenios-list.component.html',
  styleUrls: ['./convenios-list.component.css']
})
export class ConveniosListComponent implements IList<Convenio>, OnInit{
  
  constructor (private servico: ConvenioService) {}
  
  ngOnInit(): void {
    this.get();
  }
  registros: Convenio[] = Array<Convenio>();
  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Convenio[]) => {
        // caso queira alterar na lista de convênios para que ela exiba
        // somente os ativos, basta inverter essas linhas, no caso comentar a de baixo
        // e descomentar as outras.
        this.registros = resposta;
        // this.registros = resposta.filter(item => {
        //   return item.ativo;
      }
    });
  }
  delete(id: number): void {
    if (confirm("Deseja excluir o convênio?")) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
        }
      });
    }
  }

}
