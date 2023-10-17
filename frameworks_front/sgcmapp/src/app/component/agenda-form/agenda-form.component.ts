import { Component } from '@angular/core';
import { IForm } from '../i-form';
import { Profissional } from '../model/profissional';
import { Atendimento } from '../model/atendimento';
import { Convenio } from '../model/convenio';
import { Paciente } from '../model/paciente';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styles: [
  ]
})
export class AgendaFormComponent implements IForm<Atendimento>{
  constructor( private router: Router ) {};
  registros: Atendimento = <Atendimento>{};
  profissionais: Profissional[] = Array<Profissional>();
  convenios: Convenio[] = Array<Convenio>();
  pacientes: Paciente[] = Array<Paciente>();

  save(form: NgForm): void{}

  Cancelar(): void {this.router.navigate([ '/agenda' ])}  

}

