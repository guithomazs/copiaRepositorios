import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/model/atendimento';
import { PageRequest } from 'src/app/model/page-request';
import { PageResponse } from 'src/app/model/page-response';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { IList } from '../i-list';
import { EStatus } from 'src/app/model/EStatus';

@Component({
  selector: 'app-atendimentos-finalizados',
  templateUrl: './atendimentos-finalizados.component.html',
  styleUrls: ['./atendimentos-finalizados.component.scss']
})
export class AtendimentosFinalizadosComponent implements IList<Atendimento>, OnInit {

  constructor(private servico: AtendimentoService) {}

  ngOnInit(): void {
    this.get();
  }

  registros: Atendimento[] = Array<Atendimento>();
  paginaRequisicao: PageRequest = new PageRequest();
  paginaResposta: PageResponse<Atendimento> = <PageResponse<Atendimento>>{};
  statusBuscados: EStatus[] = [EStatus.ENCERRADO]
  buscado: string | undefined = '';

  colunas = [
    { campo: 'data', descricao: 'Data' },
    { campo: 'hora', descricao: 'Hora' },
    { campo: 'paciente.nome', descricao: 'Paciente' },
    { campo: 'profissional.nome', descricao: 'Profissional' },
    { campo: 'profissional.unidade.nome', descricao: 'Unidade' },
    { campo: 'convenio.nome', descricao: 'Convênio' },
    { campo: '', descricao: 'Status' },
  ]

  ordenar(ordenacao: string[]): void {
    this.paginaRequisicao.sort = ordenacao;
    this.paginaRequisicao.page = 0;
    this.get(this.buscado);
  }

  get(termoBusca?: string | undefined): void {
    this.servico.getWithListOfStatus(this.statusBuscados, termoBusca, this.paginaRequisicao).subscribe({
      next: (resposta: PageResponse<Atendimento>) => {
        this.registros = resposta.content;
        this.paginaResposta = resposta;
        this.buscado = termoBusca;
      }
    });
  }

  updateStatus(id: number): void {
    if (confirm('Confirma alteração no status do agendamento?')) {
      this.servico.updateStatus(id).subscribe({
        complete: () => {
          this.get(this.buscado);
        }
      });
    }
  }

  delete(id: number): void {
    throw new Error('Method not implemented.');
  }

  mudarPagina(paginaSelecionada: number): void { 
    this.paginaRequisicao.page = paginaSelecionada
    this.get(this.buscado);
  }

  mudarTamanhoPagina(tamanhoPagina: number): void {
    this.paginaRequisicao.size = tamanhoPagina;
    this.paginaRequisicao.page = 0;
    this.get(this.buscado);
  }

}
