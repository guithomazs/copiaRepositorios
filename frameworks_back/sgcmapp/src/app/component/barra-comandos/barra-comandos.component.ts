import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-barra-comandos',
  templateUrl: './barra-comandos.component.html',
  styleUrls: ['./barra-comandos.component.css']
})
export class BarraComandosComponent {

  @Output() eventoBusca = new EventEmitter();
  @Input() teste: string = "";

  busca(termoBusca: string){
    if (termoBusca.length >= 3 || termoBusca.length == 0){
      this.eventoBusca.emit(termoBusca);
    }
  }
}
