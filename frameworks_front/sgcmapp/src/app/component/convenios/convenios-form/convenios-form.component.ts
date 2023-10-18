import { Component } from '@angular/core';
import { IForm } from '../../i-form';
import { Convenio } from '../../model/convenio';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConvenioService } from 'src/app/service/convenio.service';

@Component({
  selector: 'app-convenios-form',
  templateUrl: './convenios-form.component.html',
  styleUrls: ['./convenios-form.component.css']
})
export class ConveniosFormComponent implements IForm<Convenio>{

  constructor(
    private servico: ConvenioService,
    private router: Router
    ) {}
  
  registro: Convenio = <Convenio>{};
  
  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/convenios'])
      }
    })
  }

}
