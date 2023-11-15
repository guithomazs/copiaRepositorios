import { Component, OnInit, Renderer2 } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from 'src/app/model/atendimento';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements IList<Atendimento>, OnInit {

  constructor(
    private servico: AtendimentoService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,  
  ) {}

  ngOnInit(): void{
    this.get();
  }

  registros: Atendimento[] = Array<Atendimento>();
  status: string[] = ['CHEGADA', 'ATENDIMENTO'];

  get(termoBusca?: string | undefined): void {
    this.servico.getEmAndamento(this.curr_page, this.page_size, termoBusca).subscribe({
      next: (resposta: any) => {
        this.registros = resposta['content']
        this.last_page = resposta['totalPages'] - 1;
        this.totalRegistros = resposta['totalElements']
      }, complete: () => {
        !termoBusca ? this.changeImageAndTableHeadDisplay() : this.changeImageAndTableHeadDisplay(true);
      }
    });
  }

  ja_entrado: boolean = false;
  changeImageAndTableHeadDisplay(porBusca?: boolean) {
    
    let tableHead = document.querySelector('table thead');
    let imageRow = document.querySelector('img#pepeImage');
    let textoDeSemResultados = document.querySelector('div.textoNormal');
    
    if (this.registros.length == 0){
      this.renderer.setStyle(tableHead, 'display', 'table');
      
      !porBusca ? this.renderer.setStyle(imageRow, 'display', '') : this.renderer.setStyle(textoDeSemResultados, 'display', '');

      if(!this.ja_entrado && !porBusca){
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SEM_REGISTROS,
          mensagem: "Não há registros para essa tabela."
        });
      }
      this.ja_entrado = !this.ja_entrado
    }
    else {
      this.renderer.setStyle(tableHead, 'display', '');
      this.renderer.setStyle(imageRow, 'display', 'none');
      this.renderer.setStyle(textoDeSemResultados, 'display', 'none');
      // this.servicoAlerta.fecharAlerta();
    }
  }

  updateStatus(id: number): void {
    if (confirm('Confirma alteração no status do agendamento?')) {
      this.servico.updateStatus(id).subscribe({
        complete: () => {
          this.get();
        }
      });
    }
  }

  delete(id: number): void {
    throw new Error('Method not implemented.');
  }

  curr_page: number = 0;
  page_size: number = 5;
  last_page: number = 0;
  totalPages: number = 0;
  totalRegistros: number = 0;
  page_sizes = [5, 10, 15, 20, 50, 100]

  setPageSize(pageSize: number): void {
    this.page_size = pageSize;
    this.curr_page = 0;
    this.get();
  }


}
