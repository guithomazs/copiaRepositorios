import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../../model/especialidade';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from '../../model/e-tipo-alerta';

@Component({
  selector: 'app-especialidade-form',
  templateUrl: './especialidade-form.component.html',
  styleUrls: ['./especialidade-form.component.css']
})
export class EspecialidadeFormComponent implements IForm<Especialidade>{
  constructor(
    private servico: EspecialidadeService,
    private servicoALerta: AlertaService,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Especialidade) => {
          this.registro = resposta;
        }
      })
    }
  }
  
  registro: Especialidade = <Especialidade>{};
  
  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/config/especialidades/']);
        this.servicoALerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Operação realizada com sucesso."
        });
      }
    })
  } 

}
