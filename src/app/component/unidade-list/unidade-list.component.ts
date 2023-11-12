import { AfterViewChecked, Component, OnInit, Renderer2 } from '@angular/core';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { Unidade } from 'src/app/model/unidade';
import { AlertaService } from 'src/app/service/alerta.service';
import { UnidadeService } from 'src/app/service/unidade.service';
import { IList } from '../i-list';

@Component({
  selector: 'app-unidade-list',
  templateUrl: './unidade-list.component.html',
  styles: [
  ]
})
export class UnidadeListComponent implements OnInit, IList<Unidade>, AfterViewChecked {

  constructor(
    private servico: UnidadeService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) { }

  ngAfterViewChecked(): void {
    this.changeTableHeadDisplay();
  }

  ngOnInit(): void {
    this.get();
  }

  registros: Unidade[] = Array<Unidade>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Unidade[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir a unidade?')) {
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
