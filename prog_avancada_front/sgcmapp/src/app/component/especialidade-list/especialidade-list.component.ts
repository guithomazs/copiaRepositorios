import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ETipoAlerta } from 'src/app/model/e-tipo-alerta';
import { Especialidade } from 'src/app/model/especialidade';
import { AlertaService } from 'src/app/service/alerta.service';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { IList } from '../i-list';

@Component({
  selector: 'app-especialidade-list',
  templateUrl: './especialidade-list.component.html',
  styleUrls: ['./especialidade-list.component.scss']
})
export class EspecialidadeListComponent implements OnInit, IList<Especialidade>, AfterViewChecked {

  constructor(
    private servico: EspecialidadeService,
    private servicoAlerta: AlertaService,
  ) { }
  ngAfterViewChecked(): void {
    this.datachanged();
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

  datachanged( ): void {
    this.table = document.querySelector('table');
    const MyHeaders = document.querySelectorAll('table th');
    const firstRow = document.querySelectorAll('table tbody tr:nth-child(1)');  
    console.log(this.table);
    console.log(MyHeaders);
    console.log(firstRow);
  }

}

// https://stackoverflow.com/questions/49036289/how-to-detect-when-a-view-element-is-rendered-in-angular
// https://blog.angular-university.io/how-does-angular-2-change-detection-really-work/
// https://angular.io/guide/zone
// https://stackoverflow.com/questions/44917977/detect-change-in-each-object-of-an-array-typescript-angular-2
// https://angular.io/api/core/OnChanges
// https://stackoverflow.com/questions/44840735/change-vs-ngmodelchange-in-angular
// https://stackoverflow.com/questions/15458609/how-to-execute-angularjs-controller-function-on-page-load
