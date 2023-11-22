import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent {

  @Input() totalItens: number = 0;
  @Input() totalPaginas: number = 0;
  @Input() paginaAtual: number = 0;
  @Input() tamanhoPagina: number = 0;
  @Output() paginaSelecionada = new EventEmitter<number>();
  @Output() tamanhoPaginaSelecionada = new EventEmitter<number>();

  listarPaginas(): number[] {
    if(this.paginaAtual != undefined && this.totalPaginas != undefined){ 
      
      let inicio = 
        (this.totalPaginas - this.paginaAtual <= 2)
          ?
          Math.max(0, this.totalPaginas - 5)
          :
          Math.max(0, this.paginaAtual - 2)

      let fim = 
        this.paginaAtual < 2 
          ?
          Math.min(this.totalPaginas, inicio + 5)
          :
          Math.min(this.totalPaginas, this.paginaAtual + 3)

      return Array.from(Array(fim - inicio).keys()).map(i => inicio + i);
    }
    return [];
  }

  mudarPagina(pagina: number){
    this.paginaSelecionada.emit(pagina);
  }

  mudarTamanhoPagina(tamanhoPagina: number){ 
    this.tamanhoPaginaSelecionada.emit(tamanhoPagina);
  }

}
