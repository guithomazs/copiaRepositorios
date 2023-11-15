import { Component, OnInit, Renderer2 } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from 'src/app/model/atendimento';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styles: [
  ]
})
export class AgendaListComponent implements IList<Atendimento>, OnInit {

  constructor(
    private servico: AtendimentoService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.get();
  }

  // teste para construção futura de um componente para tabela 
  columns = [
    {label: "Data", type: "d", field: "data"},
    {label: "Hora", type: "t", field: "hora"},
    {label: "Paciente", type: "s", field: "paciente", render: (item:any) => item.paciente?.nome},
    {label: "Profissional", type: "s", field: "profissional", render: (item:any) => item.profissional?.nome},
    {label: "Unidade", type: "s", field: "unidade", render: (item:any) => item.profissional.unidade?.nome},
    {label: "Convênio", type: "s", field: "convenio", render: (item:any) => item.convenio?.nome},
  ];
  getFieldValue = (item: any, column: any) => !!column.render ? column.render(item) : item[column.field];
  ////////////////////////////////

  registros: Atendimento[] = Array<Atendimento>();
  status: string[] = ['AGENDADO', 'CONFIRMADO'];

  get(termoBusca?: string | undefined): void {
    this.servico.getAgenda(this.curr_page, this.page_size, termoBusca).subscribe({
      next: (resposta: any) => {
        this.registros = resposta['content']
        this.last_page = resposta['totalPages'] - 1;
        this.totalRegistros = resposta['totalElements']
      }, complete: () => {
        !termoBusca ? this.changeImageAndTableHeadDisplay() : this.changeImageAndTableHeadDisplay(true);
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja cancelar o agendamento?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
        }
      });
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
  
  curr_page: number = 0;
  page_size: number = 5;
  last_page: number = 0;
  totalPages: number = 0;
  totalRegistros: number = 0;

  setPageSize(pageSize: number): void {
    this.page_size = pageSize;
    this.curr_page = 0;
    this.get();
  }

  goFirstPage(): void {
    this.curr_page = 0
    this.get();
  }

  goLastPage(): void {
    this.curr_page = this.last_page;
    this.get();
  }

  goPreviousPage(): void {
    this.curr_page = this.curr_page > 0 ? this.curr_page - 1 : 0;
    this.get();
  }

  goNextPage(): void {
    this.curr_page = this.curr_page < this.last_page ? this.curr_page + 1 : this.last_page;
    this.get();
  }
  
}
