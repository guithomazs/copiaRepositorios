import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { IList } from '../../i-list';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements IList<Usuario>, OnInit{
  
  constructor (private servico: UsuarioService) {}
  
  ngOnInit(): void {
    this.get();
  }

  registros: Usuario[] = Array<Usuario>();
  
  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Usuario[]) => {
        this.registros = resposta;
      }
    });
  }

  delete(id: number): void {
    if (confirm("Deseja excluir o usuário?")) {
      this.servico.delete(id).subscribe({
        complete: () => {
          this.get();
        }
      });
    }
  }

}
