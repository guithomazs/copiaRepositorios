import { Component } from '@angular/core';
import { Especialidade } from '../../model/especialidade';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-especialidade-form',
  templateUrl: './especialidade-form.component.html',
  styleUrls: ['./especialidade-form.component.css']
})
export class EspecialidadeFormComponent implements IForm<Especialidade>{
  
  registro: Especialidade = <Especialidade>{};
  
  save(form: NgForm): void{}

}
