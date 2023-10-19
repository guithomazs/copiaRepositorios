import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/service/alerta.service';
import { Alerta } from '../model/alerta';
import { ETipoAlerta } from '../model/e-tipo-alerta';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.css']
})
export class AlertaComponent implements OnInit {

  constructor(
    private servico: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.servico.receberAlerta().subscribe({
      next: (alerta: Alerta) => {
        this.exibirAlerta(alerta);
      }
    })

    this.router.events.subscribe({
      next: (evento) => {
        if(evento instanceof NavigationStart) {
          this.fecharAlerta();
        }
      }
    })
  }

  exibirAlerta(alerta: Alerta): void{
    const elementoAlerta = document.querySelector<HTMLElement>('div.alerta');
    const elementoMensagem = document.querySelector<HTMLElement>('div.alerta span#mensagem');
    if (elementoAlerta && elementoMensagem){
      elementoMensagem.innerText = alerta.mensagem;
      elementoAlerta.classList.add(alerta.tipo);
      elementoAlerta.classList.remove('inativo');
    }
  }

  fecharAlerta(){
    const elementoAlerta = document.querySelector<HTMLElement>('div.alerta')
    if(elementoAlerta) {
      elementoAlerta.classList.add('inativo');
      // elementoAlerta.classList.remove(
      //   ETipoAlerta.SUCESSO,
      //   ETipoAlerta.ERRO
      // );

      Object.values(ETipoAlerta).forEach((value) => {
        elementoAlerta.classList.remove(value)
      })
      
    }
  }
}
