import { Component, OnInit } from '@angular/core';
import { IForm } from '../../i-form';
import { Convenio } from '../../model/convenio';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvenioService } from 'src/app/service/convenio.service';
import { AlertaService } from 'src/app/service/alerta.service';
import { ETipoAlerta } from '../../model/e-tipo-alerta';

@Component({
  selector: 'app-convenios-form',
  templateUrl: './convenios-form.component.html',
  styleUrls: ['./convenios-form.component.css']
})
export class ConveniosFormComponent implements IForm<Convenio>, OnInit{

  constructor(
    private servico: ConvenioService,
    private servicoALerta: AlertaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Convenio) => {
          this.registro = resposta;
        }
      })
    }
  }
  
  registro: Convenio = <Convenio>{};
  
  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/convenios'])
        this.servicoALerta.enviarAlerta({
          tipo: ETipoAlerta.SUCESSO,
          mensagem: "Operação realizada com sucesso."
        });
      }
    })
  }

}
