import { Component, OnInit, Renderer2 } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styles: [
  ]
})
export class UsuarioListComponent implements OnInit, IList<Usuario> {

  constructor(
    private servico: UsuarioService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Usuario[] = Array<Usuario>();

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o usuário?')) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
          this.servicoAlerta.enviarAlerta({
            tipo: ETipoAlerta.SUCESSO,
            mensagem: "Operação realizada com sucesso."
          });
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
  page_sizes = [5, 10, 15, 20, 50, 100]

  get(termoBusca?: string | undefined): void {
    this.servico.getByPage(this.curr_page, this.page_size, termoBusca).subscribe({
      next: (resposta: any) => {
        this.registros = resposta['content']
        this.last_page = resposta['totalPages'] - 1;
        this.totalRegistros = resposta['totalElements']
      }, complete: () => {
        !termoBusca ? this.changeImageAndTableHeadDisplay() : this.changeImageAndTableHeadDisplay(true);
      }
    });
  }

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
