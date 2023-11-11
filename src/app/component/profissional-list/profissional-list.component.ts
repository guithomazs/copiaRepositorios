import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Profissional } from 'src/app/model/profissional';
import { AlertaService } from 'src/app/service/alerta.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { Observable, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-profissional-list',
  templateUrl: './profissional-list.component.html',
  styleUrls: [
    './profissional-list.component.scss'
  ]
})
export class ProfissionalListComponent implements OnInit, IList<Profissional>, AfterViewChecked {
  @ViewChild('theHeaderRow', {read: ElementRef })el: ElementRef = {} as ElementRef;

  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  resizeSubscription$: Subscription = this.resizeObservable$.subscribe();

  constructor(
    private servico: ProfissionalService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Profissional[] = Array<Profissional>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Profissional[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o profissional?')) {
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
  
  ngAfterViewChecked(): void {
    this.datachanged();
  }

  datachanged( ): void {

    let tableHeight = +getComputedStyle(document.querySelector('table') as HTMLElement).height.replace('px', '');

    let firstRow = document.querySelector('table tbody tr');  
    
    var elements = firstRow? Array.from(firstRow?.children) : null;

    if (elements){

      // currElement = each column of the first row
        elements.forEach((currElement, index) => {

          let tableHeaderColumns = this.el.nativeElement.children;

          let currElementWidth = getComputedStyle(currElement).width;

          // the last col is been treated in another way so it can include the scrollbar inside it
          if (index == elements!.length - 1 && tableHeight >= 450){
            console.log(currElement.innerHTML)
            let lastColWidth =  +currElementWidth.replace('px', '') + 17;
            this.renderer.setStyle(tableHeaderColumns[index], 'width', lastColWidth + 'px');
          }
          else {
            this.renderer.setStyle(tableHeaderColumns[index], 'width', currElementWidth);
          }

          
        })
    }
  }

}
