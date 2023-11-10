import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'SGCM';
  currentUrl: string = '';

  constructor(router: Router) {

    router.events.subscribe(evento => {
      if (evento instanceof NavigationEnd) {
        if (evento.url != '') {
          this.currentUrl = evento.url;
        } else {
          this.currentUrl = '';
        }
      }
    })

  }

}
