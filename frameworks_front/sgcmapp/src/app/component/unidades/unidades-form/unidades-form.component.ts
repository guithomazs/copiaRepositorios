import { Component } from '@angular/core';
import { Unidade } from '../../model/unidade';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-unidades-form',
  templateUrl: './unidades-form.component.html',
  styleUrls: ['./unidades-form.component.css']
})
export class UnidadesFormComponent implements IForm<Unidade>{
  
  registro: Unidade = <Unidade>{};
  
  save(form: NgForm): void{}

}
