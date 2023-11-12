import { AfterViewChecked, Component, OnInit, Renderer2 } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IList } from '../i-list';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styles: [
  ]
})
export class UsuarioListComponent implements OnInit, IList<Usuario>, AfterViewChecked {

  constructor(
    private servico: UsuarioService,
    private servicoAlerta: AlertaService,
    private renderer: Renderer2,
  ) { }

  ngAfterViewChecked(): void {
    this.changeTableHeadDisplay();
  }

  ngOnInit(): void {
    this.get();
  }

  registros: Usuario[] = Array<Usuario>();

  get(termoBusca?: string): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Usuario[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm('Deseja realmente excluir o usuário?')) {
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