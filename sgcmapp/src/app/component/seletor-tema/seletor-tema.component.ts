import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-seletor-tema',
  templateUrl: './seletor-tema.component.html',
  styleUrls: ['./seletor-tema.component.scss']
})
export class SeletorTemaComponent {

  @Output() mudancaDeTema = new EventEmitter();

  temas = [
    { valor: '', descricao: 'Selecione um tema'},
    { valor: 'azul', descricao: 'Azul'},
    { valor: 'vermelho', descricao: 'Vermelho'},
    { valor: 'amarelo', descricao: 'Amarelo'},
  ]

  mudarTema(event: string) {
    this.mudancaDeTema.emit(event);
  }

}
