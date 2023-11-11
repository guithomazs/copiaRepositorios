import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Convenio } from 'src/app/model/convenio';
import { AlertaService } from 'src/app/service/alerta.service';
import { ConvenioService } from 'src/app/service/convenio.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { Observable, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-convenio-list',
  templateUrl: './convenio-list.component.html',
  styles: [
  ]
})
export class ConvenioListComponent implements OnInit, IList<Convenio> {

  constructor(
    private servico: ConvenioService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Convenio[] = Array<Convenio>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Convenio[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o convênio?')) {
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

  @ViewChild('theHeaderRow', {read: ElementRef })el: ElementRef = {} as ElementRef;

  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  resizeSubscription$: Subscription = this.resizeObservable$.subscribe();
  
  ngAfterViewChecked(): void {
    this.datachanged();
  }

  datachanged( ): void {

    let tableHeight = +getComputedStyle(document.querySelector('table') as HTMLElement).height.replace('px', '');
    console.log("table height", +tableHeight)

    let firstRow = document.querySelector('table tbody tr');  
    
    var elements = firstRow? Array.from(firstRow?.children) : null;

    if (elements){

      // currElement = each column of the first row
        elements.forEach((currElement, index) => {

          let tableHeaderColumns = this.el.nativeElement.children;

          let currElementWidth = getComputedStyle(currElement).width;
          console.log('coluna -> ' + currElement.innerHTML + " <- ", currElementWidth);

          // the last col is been treated in another way so it can include the scrollbar inside it
          if (index == elements!.length - 1 && tableHeight >= 450){
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
