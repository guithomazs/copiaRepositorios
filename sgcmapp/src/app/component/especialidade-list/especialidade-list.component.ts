import { Component, OnInit, Renderer2 } from '@angular/core';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { Especialidade } from 'src/app/model/especialidade';
import { AlertaService } from 'src/app/service/alerta.service';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { IList } from '../i-list';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styleUrls: [
  ]
})
export class EspecialidadeListComponent implements OnInit, IList<Especialidade> {

  constructor(
    private servico: EspecialidadeService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    this.get();
  }
  
  table = document.querySelector('table');
  registros: Especialidade[] = Array<Especialidade>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Especialidade[]) => {
        this.registros = resposta;
      }, complete: () => {
        !termoBusca ? this.changeImageAndTableHeadDisplay() : this.changeImageAndTableHeadDisplay(true);
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
  
}