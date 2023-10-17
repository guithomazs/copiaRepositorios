import { Component, OnInit } from '@angular/core';
import { IList } from '../../i-list';
import { Paciente } from '../../model/paciente';
import { PacienteService } from 'src/app/service/paciente.service';

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.component.html',
  styleUrls: ['./pacientes-list.component.css']
})
export class PacientesListComponent implements IList<Paciente>, OnInit{
  constructor(private servico: PacienteService){}

  ngOnInit(): void {
    this.get();
  }

  registros: Paciente[] = Array<Paciente>();
  
  get(termoBusca?: string | undefined): void {
    this.servico.get(termoBusca).subscribe({
      next: (resposta: Paciente[]) => {
        this.registros = resposta;
      }
    });
  }
  delete(id: number): void {
    this.servico.delete(id).subscribe({});
  }

}
