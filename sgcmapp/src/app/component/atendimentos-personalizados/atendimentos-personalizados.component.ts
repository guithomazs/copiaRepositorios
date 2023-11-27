import { Component, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/model/atendimento';
import { PageRequest } from 'src/app/model/page-request';
import { PageResponse } from 'src/app/model/page-response';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { IList } from '../i-list';
import { EStatus } from 'src/app/model/EStatus';

@Component({
  selector: 'app-atendimentos-personalizados',
  templateUrl: './atendimentos-personalizados.component.html',
  styleUrls: ['./atendimentos-personalizados.component.scss']
})
export class AtendimentosPersonalizadosComponent  implements IList<Atendimento>, OnInit {

  constructor(private servico: AtendimentoService) {}

  ngOnInit(): void {
    this.getWithListOfStatus(this.selectedStatus, this.buscado);
  }

  registros: Atendimento[] = Array<Atendimento>();
  paginaRequisicao: PageRequest = new PageRequest();
  paginaResposta: PageResponse<Atendimento> = <PageResponse<Atendimento>>{};
  buscado: string | undefined = '';
  statusNaoSelecionados = Object.values(EStatus)
  selectedStatus: EStatus[] = [];
  opcaoDoSelect: string | undefined = '';

  colunas = [
    { campo: 'data', descricao: 'Data' },
    { campo: 'hora', descricao: 'Hora' },
    { campo: 'paciente.nome', descricao: 'Paciente' },
    { campo: 'profissional.nome', descricao: 'Profissional' },
    { campo: 'profissional.unidade.nome', descricao: 'Unidade' },
    { campo: 'convenio.nome', descricao: 'Convênio' },
    { campo: 'status', descricao: 'Status' },
  ]

  ordenar(ordenacao: string[]): void {
    this.paginaRequisicao.sort = ordenacao;
    this.paginaRequisicao.page = 0;
    this.getWithListOfStatus(this.selectedStatus, this.buscado);
  }

  get(termoBusca?: string | undefined): void {
    this.buscado = termoBusca
    this.getWithListOfStatus(this.selectedStatus, this.buscado);
  }

  getWithListOfStatus(listOFStatus: EStatus[], termoBusca?: string | undefined): void {
    this.servico.getWithListOfStatus(listOFStatus, termoBusca, this.paginaRequisicao).subscribe({
      next: (resposta: PageResponse<Atendimento>) => {
        this.registros = resposta.content;
        this.paginaResposta = resposta;
        this.buscado = termoBusca;
      }
    })
  }

  updateStatus(id: number): void {}

  delete(id: number): void {}

  mudarPagina(paginaSelecionada: number): void { 
    this.paginaRequisicao.page = paginaSelecionada
    this.getWithListOfStatus(this.selectedStatus, this.buscado);
  }

  mudarTamanhoPagina(tamanhoPagina: number): void {
    this.paginaRequisicao.size = tamanhoPagina;
    this.paginaRequisicao.page = 0;
    this.getWithListOfStatus(this.selectedStatus, this.buscado);
  }

  getStatusToBeSelected() {
    this.statusNaoSelecionados = Object.values(EStatus)
    for(let selecionado of this.selectedStatus){
      this.statusNaoSelecionados = this.statusNaoSelecionados.filter(item => item != selecionado)
    }
    this.opcaoDoSelect = "";
    this.getWithListOfStatus(this.selectedStatus, this.buscado);
  }

  selectStatus(status: EStatus): void {
    this.selectedStatus.push(status);
    this.getStatusToBeSelected();
  }

  removeStatus(statusARemover: EStatus): void {
    this.selectedStatus = this.selectedStatus.filter(status => status != statusARemover);
    this.getStatusToBeSelected();
  }

}
