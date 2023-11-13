import { Component, OnInit, Renderer2 } from '@angular/core';
import { Atendimento } from 'src/app/model/atendimento';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { AlertaService } from 'src/app/service/alerta.service';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { IList } from '../i-list';

@Component({
  selector: 'app-atendimentos-cancelados-list',
  templateUrl: './atendimentos-cancelados-list.component.html',
  styleUrls: ['./atendimentos-cancelados-list.component.scss']
})
export class AtendimentosCanceladosListComponent implements IList<Atendimento>, OnInit {

  constructor(
    private servico: AtendimentoService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,  
  ) {}

  ngOnInit(): void{
    this.get();
  }

  registros: Atendimento[] = Array<Atendimento>();
  status: string[] = ['CANCELADO'];

  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Atendimento[]) => {
        this.registros = resposta.filter(item => {
          return this.status.includes(item.status);
        });
      }, complete: () => {
        !termoBusca ? this.changeImageAndTableHeadDisplay() : this.changeImageAndTableHeadDisplay(true);
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
  changeImageAndTableHeadDisplay(porBusca?: boolean) {
    
    let tableHead = document.querySelector('table thead');
    let imageRow = document.querySelector('img#pepeImage');
    let textoDeSemResultados = document.querySelector('div.textoNormal');
    
    if (this.registros.length == 0){
      this.renderer.setStyle(tableHead, 'display', 'table');
      
      !porBusca ? this.renderer.setStyle(imageRow, 'display', '') : this.renderer.setStyle(textoDeSemResultados, 'display', '');

      if(!this.ja_entrado && !porBusca){
        this.servicoAlerta.enviarAlerta({
          tipo: ETipoAlerta.SEM_REGISTROS,
          mensagem: "Não há registros para essa tabela."
        });
      }
      this.ja_entrado = !this.ja_entrado
    }
    else {
      this.renderer.setStyle(tableHead, 'display', 'contents');
      this.renderer.setStyle(imageRow, 'display', 'none');
      this.renderer.setStyle(textoDeSemResultados, 'display', 'none');
      // this.servicoAlerta.fecharAlerta();
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
