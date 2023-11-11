import { AfterViewChecked, Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { Especialidade } from 'src/app/model/especialidade';
import { AlertaService } from 'src/app/service/alerta.service';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { IList } from '../i-list';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styleUrls: [
    // './especialidade-list.component.scss'
  ]
})
export class EspecialidadeListComponent implements OnInit, IList<Especialidade>, AfterViewChecked {
  @ViewChild('theHeaderRow', {read: ElementRef })el: ElementRef = {} as ElementRef;

  resizeObservable$: Observable<Event> = fromEvent(window, 'resize');
  resizeSubscription$: Subscription = this.resizeObservable$.subscribe();  
  
  constructor(
    private servico: EspecialidadeService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.get();
  }

  registros: Especialidade[] = Array<Especialidade>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Especialidade[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir a especialidade?')) {
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

    console.log('entrei')
    let tableHeight = +getComputedStyle(document.querySelector('table') as HTMLElement).height.replace('px', '');
    // console.log("table height", +tableHeight)

    let firstRow = document.querySelector('table tbody tr');  
    
    var elements = firstRow? Array.from(firstRow?.children) : null;

    if (elements){

      // currElement = each column of the first row
      elements.forEach((currElement, index) => {

        let tableHeaderColumns = this.el.nativeElement.children;

        let currElementWidth = getComputedStyle(currElement).width;
        // console.log('coluna -> ' + currElement.innerHTML + " <- ", currElementWidth);

        // the last col is been treated in another way so it can include the scrollbar inside it
        if (index == elements!.length - 1 && tableHeight <= 450){
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
