import { Component } from '@angular/core';
import { IForm } from '../../i-form';
import { Profissional } from '../../model/profissional';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profissionais-form',
  templateUrl: './profissionais-form.component.html',
  styleUrls: ['./profissionais-form.component.css']
})
export class ProfissionaisFormComponent implements IForm<Profissional>{
  
  registro: Profissional = <Profissional>{};
  
  save(form: NgForm): void {};

}
