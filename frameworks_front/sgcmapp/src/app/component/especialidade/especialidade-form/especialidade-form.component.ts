import { Component, OnInit } from '@angular/core';
import { Especialidade } from '../../model/especialidade';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { EspecialidadeService } from 'src/app/service/especialidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidade-form',
  templateUrl: './especialidade-form.component.html',
  styleUrls: ['./especialidade-form.component.css']
})
export class EspecialidadeFormComponent implements IForm<Especialidade>{
  constructor(
    private servico: EspecialidadeService,
    private router: Router
  ) {}
  registro: Especialidade = <Especialidade>{};
  
  save(form: NgForm): void{
    console.log((this.registro));
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/config/especialidades/'])
      }
    })
  } 

}
