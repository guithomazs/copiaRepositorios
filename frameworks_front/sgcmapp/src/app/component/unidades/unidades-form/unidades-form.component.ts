import { Component } from '@angular/core';
import { Unidade } from '../../model/unidade';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { UnidadeService } from 'src/app/service/unidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from '../../model/e-tipo-alerta';

@Component({
  selector: 'app-unidades-form',
  templateUrl: './unidades-form.component.html',
  styleUrls: ['./unidades-form.component.css']
})
export class UnidadesFormComponent implements IForm<Unidade>{
  
  constructor(
    private servico: UnidadeService,
    private servicoALerta: AlertaService,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Unidade) => {
          this.registro = resposta;
        }
      })
    }
  }

  registro: Unidade = <Unidade>{};
  
  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/config/unidades']);
        this.servicoALerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Operação realizada com sucesso."
        });
      }
    })
  }

}
