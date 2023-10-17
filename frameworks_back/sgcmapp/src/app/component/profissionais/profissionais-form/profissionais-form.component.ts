import { Component } from '@angular/core';
import { IForm } from '../../i-form';
import { Profissional } from '../../model/profissional';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profissionais-form',
  templateUrl: './profissionais-form.component.html',
  styleUrls: ['./profissionais-form.component.css']
})
export class ProfissionaisFormComponent implements IForm<Profissional>{
  constructor( private router: Router ) {};
  registros: Profissional = <Profissional>{};
  save(form: NgForm): void {};

  Cancelar(): void {this.router.navigate([ '/profissionais' ])};


}
