import { Component, OnInit } from '@angular/core';
import { Profissional } from 'src/app/model/profissional';
import { AlertaService } from 'src/app/service/alerta.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { PageRequest } from 'src/app/model/page-request';
import { PageResponse } from 'src/app/model/page-response';

@Component({
  selector: 'app-profissional-list',
  templateUrl: './profissional-list.component.html',
  styles: [
  ]
})
export class ProfissionalListComponent implements OnInit, IList<Profissional> {

  constructor(
    private servico: ProfissionalService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Profissional[] = Array<Profissional>();
  paginaRequisicao: PageRequest = new PageRequest();
  paginaResposta: PageResponse<Profissional> = <PageResponse<Profissional>>{};
  buscado: string | undefined = '';

  colunas = [
    { campo: 'id', descricao: 'ID'},
    { campo: 'nome', descricao: 'Nome'},
    { campo: 'registroConselho', descricao: 'Registro'},
    { campo: 'especialidade.nome', descricao: 'Especialidade'},
    { campo: 'unidade.nome', descricao: 'Unidade'},
    { campo: 'telefone', descricao: 'Telefone'},
    { campo: 'email', descricao: 'E-mail'},
    { campo: '', descricao: 'Ações'},
  ]

  ordenar(ordenacao: string[]): void {
    this.paginaRequisicao.sort = ordenacao;
    this.paginaRequisicao.page = 0;
    this.get(this.buscado);
  }

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca, this.paginaRequisicao).subscribe({
      next: (resposta: PageResponse<Profissional>) => {
        this.registros = resposta.content;
        this.paginaResposta = resposta;
        this.buscado = termoBusca;
      }
    });
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

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o convênio?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get(this.buscado);
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Operação realizada com sucesso."
          });
        }
      });
    }
  }

}
