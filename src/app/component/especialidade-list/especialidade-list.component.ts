import { AfterViewChecked, Component, OnInit, Renderer2 } from '@angular/core';
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
export class EspecialidadeListComponent implements OnInit, IList<Especialidade>, AfterViewChecked {

  constructor(
    private servico: EspecialidadeService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) { }

  ngAfterViewChecked(): void {
    this.changeTableHeadDisplay();
  }

  ngOnInit(): void {
    this.get();
  }
  
  table = document.querySelector('table');
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
  
  ja_entrado: boolean = false;
  changeTableHeadDisplay() {
    console.log('entrei')
    let tableHead = document.querySelector('table thead');
    let imageRow = document.querySelector('tr#imageRow');
    if (this.registros.length == 0){
      this.renderer.setStyle(tableHead, 'display', 'table');
      this.renderer.setStyle(imageRow, 'display', '');
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
      this.renderer.setStyle(imageRow, 'display', 'none');
      this.servicoAlerta.fecharAlerta();
    }
  }
  
}