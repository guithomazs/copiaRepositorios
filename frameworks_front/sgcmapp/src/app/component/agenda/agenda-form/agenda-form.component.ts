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
import { DatePipe } from '@angular/common';

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
    private route: ActivatedRoute,
    private datePipe: DatePipe
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

    let myDate = new Date()
    this.diaAtual = <string>this.datePipe.transform(myDate, 'yyyy-MM-dd');
  }
  
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
  
  diaAtual: String = String();
  horarios: string[] = Array<string>();
  selectedId: number | undefined;
  selectedDate: string | undefined;
  ocupados: string[] = Array<string>();
  
  getHorarios(data?: string): void {

    this.registro.hora = "";
    this.horarios = Array<string>();

    if(data){
      this.selectedDate = data;
    } else {
      this.selectedId = this.registro.profissional.id;
    }
    
    if(this.verifyDate() && this.selectedId){
      this.horarios = [
        "14:00", "14:30", "15:00", 
        "15:30", "16:00", "16:30", 
        "17:00", "17:30", "18:00", 
        "18:30", "19:00", "19:30", "20:00"
      ]    
    
      this.servico.getHorarios(this.selectedId, <string>this.selectedDate).subscribe({
        next: (resposta: string[]) => {
          this.ocupados = resposta;
        }
      })
    }
  }

  verifyDate(): boolean {
    if(this.selectedDate){
      if(this.selectedDate <= this.diaAtual){
        this.selectedDate = "";
        this.registro.data = "";
        this.servicoALerta.enviarAlerta({
          tipo: ETipoAlerta.ERRO,
          mensagem: "O dia marcado não pode ser menor que o dia atual."
        })
        return false
      }
      return true
    }
    return false
  }

}
