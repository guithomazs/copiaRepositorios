import { Component, OnInit } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from 'src/app/model/atendimento';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { PageResponse } from 'src/app/model/page-response';
import { PageRequest } from 'src/app/model/page-request';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.component.html',
  styles: [
  ]
})
export class AgendaListComponent implements IList<Atendimento>, OnInit {

  constructor(private servico: AtendimentoService) {}

  ngOnInit(): void {
    // this.paginaRequisicao.size = 5;
    // this.paginaRequisicao.page = 4;
    this.get();
  }

  registros: Atendimento[] = Array<Atendimento>();
  status: string[] = ['AGENDADO', 'CONFIRMADO'];
  paginaRequisicao: PageRequest = new PageRequest();
  paginaResposta: PageResponse<Atendimento> = <PageResponse<Atendimento>>{};

  colunas = [
    { campo: 'data', descricao: 'Data' },
    { campo: 'hora', descricao: 'Hora' },
    { campo: 'paciente.nome', descricao: 'Paciente' },
    { campo: 'profissional.nome', descricao: 'Profissional' },
    { campo: 'profissional.unidade.nome', descricao: 'Unidade' },
    { campo: 'convenio.nome', descricao: 'Convênio' },
    { campo: '', descricao: 'Ações' },
  ]

  ordenar(ordenacao: string[]): void {
    this.paginaRequisicao.sort = ordenacao;
    this.paginaRequisicao.page = 0;
    this.get()
  }

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca, this.paginaRequisicao).subscribe({
      next: (resposta: PageResponse<Atendimento>) => {
        this.registros = resposta.content.filter(item => {
          return this.status.includes(item.status);
        });
        this.paginaResposta = resposta;
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

  mudarPagina(paginaSelecionada: number): void { 
    this.paginaRequisicao.page = paginaSelecionada
    this.get();
  }

  mudarTamanhoPagina(tamanhoPagina: number): void {
    this.paginaRequisicao.size = tamanhoPagina;
    this.paginaRequisicao.page = 0;
    this.get();
  }

}
