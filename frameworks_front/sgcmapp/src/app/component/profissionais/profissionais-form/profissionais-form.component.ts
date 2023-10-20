import { Component, OnInit } from '@angular/core';
import { IForm } from '../../i-form';
import { Profissional } from '../../model/profissional';
import { NgForm } from '@angular/forms';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { UnidadeService } from 'src/app/service/unidade.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from '../../model/especialidade';
import { Unidade } from '../../model/unidade';
import { Utils } from 'src/app/utils/utils';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from '../../model/e-tipo-alerta';


@Component({
  selector: 'app-profissionais-form',
  templateUrl: './profissionais-form.component.html',
  styleUrls: ['./profissionais-form.component.css']
})
export class ProfissionaisFormComponent implements IForm<Profissional>, OnInit{
  constructor( 
    private servico: ProfissionalService,
    private servicoEspecialidade: EspecialidadeService,
    private servicoUnidade: UnidadeService,
    private servicoALerta: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.servicoEspecialidade.get().subscribe({
      next: (resposta: Especialidade[]) => {
        this.especialidades = resposta.sort(
          (a, b) => a.nome.localeCompare(b.nome)
        );
      }
    });
    
    this.servicoUnidade.get().subscribe({
      next: (resposta: Unidade[]) => {
        this.unidades = resposta.sort(
          (a, b) => a.nome.localeCompare(b.nome)
        );
      }
    });
    
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Profissional) => {
          this.registro = resposta;
        }
      })
    }
  }
  
  registro: Profissional = <Profissional>{};
  especialidades: Especialidade[] = Array<Especialidade>();
  unidades: Unidade[] = Array<Unidade>();
  compareById = Utils.compareById;
  
  save(form: NgForm): void {
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/profissionais']);
        this.servicoALerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Operação realizada com sucesso."
        });
      }
    })
  };

}
