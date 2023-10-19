import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements IForm<Usuario>{

  constructor(
    private servico: UsuarioService,
    private router: Router,
    private route: ActivatedRoute
    ) {}
  
  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.servico.getById(+id).subscribe({
        next: (resposta: Usuario) => {
          this.registro = resposta;
        }
      })
    }
  }
  
  registro: Usuario = <Usuario>{};
  
  save(form: NgForm): void{
    this.servico.save(this.registro).subscribe({
      complete: () => {
        this.router.navigate(['/config/usuarios'])
      }
    })
  }

}
