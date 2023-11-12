import { AfterViewChecked, Component, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { IList } from '../i-list';
import { Atendimento } from 'src/app/model/atendimento';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';

@Component({
  selector: 'app-atendimento-list',
  templateUrl: './atendimento-list.component.html',
  styles: [
  ]
})
export class AtendimentoListComponent implements IList<Atendimento>, OnInit, AfterViewChecked{

  constructor(
    private servico: AtendimentoService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,  
  ) {}

  ngAfterViewChecked(): void {
    this.changeTableHeadDisplay();
  }

  ngOnInit(): void{
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

  putAtendimentoFantasma(): void {
    // primeiro modelo de resolução, muito ruim
    // resolução bem ruim, pois ela altera o texto de número de registros pra 1 além de ficar feião
    if( this.registros.length == 0) {
      this.registros.push(this.servico.getAtendimentoFantasma());
    }
  }

  ja_entrado: boolean = false;
  changeTableHeadDisplay() {
    console.log('entrei')
    let tableHead = document.querySelector('table thead');
    let image = document.querySelector('tr#imageRow');
    if (this.registros.length == 0){
      this.renderer.setStyle(tableHead, 'display', 'table');
      this.renderer.setStyle(image, 'display', '');
      if(!this.ja_entrado){
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SEM_REGISTROS,
          mensagem: "Não há registros para essa tabela."
        });
      }
      this.ja_entrado = !this.ja_entrado
    }
    else {
      this.renderer.setStyle(tableHead, 'display', 'contents');
      this.renderer.setStyle(image, 'display', 'none');
      this.servicoAlerta.fecharAlerta();
    }
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

}
