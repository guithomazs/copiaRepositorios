import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'SGCM';
  currentUrl: string = '';
  usuario: Usuario = <Usuario>{};
  tema: string = '';

  ngOnInit(): void {
    let tema = localStorage.getItem("tema");
    if (tema) {
        this.mudarTema(tema);
    }
  }

  constructor(
    router: Router,
    private servicoLogin: LoginService
    ) {

    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        if (evento.url != '') {
          this.currentUrl = evento.url;
        } else {
          this.currentUrl = '';
        }
      }
    });

    this.servicoLogin.usuarioAutenticado.subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      }
    });

  }

  isLogin(): boolean {
    return this.currentUrl == '/login';
  }

  isAdmin(): boolean {
    return this.usuario.papel == 'ROLE_ADMIN';
  }

  logout(): void {
    this.servicoLogin.logout();
  }

  mudarTema(temaSelecionado: string): void {
    if(temaSelecionado){
      let url = "/assets/css/estilo-tema-" + temaSelecionado + ".css";
      let link_tema = document.querySelector('#link-tema') as HTMLLinkElement;
      link_tema.href = url;
      localStorage.setItem("tema", temaSelecionado);
    }
    
  }

}
