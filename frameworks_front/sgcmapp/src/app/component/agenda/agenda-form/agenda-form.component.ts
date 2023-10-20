import { Component, OnInit } from '@angular/core';
import { IForm } from '../../i-form';
import { Profissional } from '../../model/profissional';
import { Atendimento } from '../../model/atendimento';
import { Convenio } from '../../model/convenio';
import { Paciente } from '../../model/paciente';
import { NgForm } from '@angular/forms';
import { ConvenioService } from 'src/app/service/convenio.service';
import { AtendimentoService } from 'src/app/service/atendimento.service';
import { PacienteService } from 'src/app/service/paciente.service';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/utils/utils';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from '../../model/e-tipo-alerta';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.css']
})
export class AgendaFormComponent implements IForm<Atendimento>, OnInit{
  constructor( 
    private servico: AtendimentoService,
    private servicoConvenio: ConvenioService,
    private servicoPaciente: PacienteService,
    private servicoProfissional: ProfissionalService,
    private servicoALerta: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    
    this.servicoConvenio.get().subscribe({
      next: (resposta: Convenio[]) => {
        this.convenios = resposta.sort(
          (a, b) => a.nome.localeCompare(b.nome)
        );
      }
    });
    
    this.servicoPaciente.get().subscribe({
      next: (resposta: Paciente[]) => {
        this.pacientes = resposta.sort(
          (a, b) => a.nome.localeCompare(b.nome)
        );
      }
    });
    
    this.servicoProfissional.get().subscribe({
      next: (resposta: Profissional[]) => {
        this.profissionais = resposta.sort(
          (a, b) => a.nome.localeCompare(b.nome)
        );
      }
    });


    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Atendimento) => {
          this.registro = resposta;
        }
      })
    }
  }

  opcoes = [
    "14:00:00", "14:30:00", "15:00:00", 
    "15:30:00", "16:00:00", "16:30:00", 
    "17:00:00", "17:30:00", "18:00:00", 
    "18:30:00", "19:00:00", "19:30:00", "20:00:00"
  ]
  ocupados: string[] = Array<string>();

  getHorarios(valor: string | number): void {
    if (typeof valor === "number"){
      this.selectedId = valor;
    } else {
      this.selectedDate = valor;
    }
    
    if(this.selectedId && this.selectedDate){
      this.servico.getHorarios(this.selectedId, this.selectedDate).subscribe({
        next: (resposta: string[]) => {
          console.log('ID SELECIONADO -> ' + this.selectedId)
          console.log('DATA SELECIONADA -> ' + this.selectedDate)
          console.log(this.ocupados);
          this.ocupados = resposta;
        }
      })
    }
  }
  
  selectedId: number | null = null;
  selectedDate: string | null = null;
  registro: Atendimento = <Atendimento>{};
  profissionais: Profissional[] = Array<Profissional>();
  convenios: Convenio[] = Array<Convenio>();
  pacientes: Paciente[] = Array<Paciente>();
  compareById = Utils.compareById;

  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/agenda']);
        this.servicoALerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Operação realizada com sucesso."
        })
      }
    })
  } 

}

