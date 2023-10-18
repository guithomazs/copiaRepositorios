import { Component } from '@angular/core';
import { Paciente } from '../../model/paciente';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { PacienteService } from 'src/app/service/paciente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.css']
})
export class PacientesFormComponent implements IForm<Paciente>{
  constructor(
    private servico: PacienteService,
    private router: Router
  ){}
  
  registro: Paciente = <Paciente>{};

  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/pacientes/'])
      }
    })

  }
}
