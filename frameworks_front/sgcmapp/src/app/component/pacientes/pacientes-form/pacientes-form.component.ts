import { Component } from '@angular/core';
import { Paciente } from '../../model/paciente';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.css']
})
export class PacientesFormComponent implements IForm<Paciente>{
  
  registro: Paciente = <Paciente>{};

  save(form: NgForm): void{}

}
