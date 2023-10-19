import { Component } from '@angular/core';
import { Paciente } from '../../model/paciente';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { PacienteService } from 'src/app/service/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.component.html',
  styleUrls: ['./pacientes-form.component.css']
})
export class PacientesFormComponent implements IForm<Paciente>{
  constructor(
    private servico: PacienteService,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Paciente) => {
          this.registro = resposta;
        }
      })
    }
  }
  
  registro: Paciente = <Paciente>{};

  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/pacientes/'])
      }
    })

  }
}
