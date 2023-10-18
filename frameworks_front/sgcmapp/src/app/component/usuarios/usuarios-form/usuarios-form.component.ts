import { Component } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { IForm } from '../../i-form';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements IForm<Usuario>{
  
  registro: Usuario = <Usuario>{};
  
  save(form: NgForm): void{}

}
