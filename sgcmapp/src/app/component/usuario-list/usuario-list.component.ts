import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { PageRequest } from 'src/app/model/page-request';
import { PageResponse } from 'src/app/model/page-response';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styles: [
  ]
})
export class UsuarioListComponent implements OnInit, IList<Usuario> {

  constructor(
    private servico: UsuarioService,
    private servicoAlerta: AlertaService
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Usuario[] = Array<Usuario>();
  paginaRequisicao: PageRequest = new PageRequest();
  paginaResposta: PageResponse<Usuario> = <PageResponse<Usuario>>{};
  buscado: string | undefined = '';

  colunas = [
    { campo: 'id', descricao: 'ID' },
    { campo: 'nomeCompleto', descricao: 'Nome' },
    { campo: 'nomeUsuario', descricao: 'Usuário' },
    { campo: 'ativo', descricao: 'Ativo' },
    { campo: 'papel', descricao: 'Papel' },
    { campo: '', descricao: 'Ações' },
  ]

  ordenar(ordenacao: string[]): void {
    this.paginaRequisicao.sort = ordenacao;
    this.paginaRequisicao.page = 0;
    this.get(this.buscado);
  }

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca, this.paginaRequisicao).subscribe({
      next: (resposta: PageResponse<Usuario>) => {
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
