import { Component } from '@angular/core';
import { IForm } from '../../i-form';
import { Convenio } from '../../model/convenio';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convenios-form',
  templateUrl: './convenios-form.component.html',
  styleUrls: ['./convenios-form.component.css']
})
export class ConveniosFormComponent implements IForm<Convenio>{
  
  registro: Convenio = <Convenio>{};
  
  save(form: NgForm): void{}

}
