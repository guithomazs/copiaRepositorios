import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from 'src/app/model/atendimento';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { Observable, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements IList<Atendimento>, OnInit {

  constructor(
    private servico: AtendimentoService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.get();
  }

  registros: Atendimento[] = Array<Atendimento>();
  status: string[] = ['CHEGADA', 'ATENDIMENTO'];

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta.filter(item => {
          return this.status.includes(item.status);
        });
      }
    });
  }

  updateStatus(id: number): void {
    if (confirm('Confirma alteração no status do agendamento?')) {
      this.servico.updateStatus(id).subscribe({
        complete: () => {
          this.get();
        }
      });
    }
  }

  delete(id: number): void {
    throw new Error('Method not implemented.');
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
