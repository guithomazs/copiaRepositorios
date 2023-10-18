import { Component } from '@angular/core';
import { Unidade } from '../../model/unidade';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { UnidadeService } from 'src/app/service/unidade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unidades-form',
  templateUrl: './unidades-form.component.html',
  styleUrls: ['./unidades-form.component.css']
})
export class UnidadesFormComponent implements IForm<Unidade>{
  
  constructor(
    private servico: UnidadeService,
    private router: Router
  ) {}

  registro: Unidade = <Unidade>{};
  
  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/config/unidades'])
      }
    })
  }

}
