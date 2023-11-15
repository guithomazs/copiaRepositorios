import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-barra-comandos',
  templateUrl: './barra-comandos.component.html',
  styles: [
  ]
})
export class BarraComandosComponent {
 
  @Input() addButton: boolean = true;
  @Input() searchInput: boolean = true;
  @Input() selectAtendimento: boolean = false;
  
  @Output() eventoBusca = new EventEmitter();

  busca(termoBusca: string) {
    if (termoBusca.length >= 3 || termoBusca.length == 0) {
      this.eventoBusca.emit(termoBusca);
    }
  }

}
