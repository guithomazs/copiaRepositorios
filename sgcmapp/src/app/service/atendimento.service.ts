import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atendimento } from '../model/atendimento';
import { IService } from './i-service';
import { ProfissionalService } from './profissional.service';
import { PacienteService } from './paciente.service';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService implements IService<Atendimento> {

  constructor(
    private http: HttpClient,
    private servicoProfissional: ProfissionalService,
    private servicoPaciente: PacienteService
  ) { }

  apiUrl: string = environment.API_URL + "/atendimento/";

  get(termoBusca?: string | undefined, page?: number): Observable<Atendimento[]> {
    let url = this.apiUrl;
    if (termoBusca) {
      url += "busca/" + termoBusca;
    }
    if(page) {
      url += `?page=${page}`;
    }
    return this.http.get<Atendimento[]>(url);
  }

  getById(id: number): Observable<Atendimento> {
    let url = this.apiUrl + id;
    return this.http.get<Atendimento>(url);
  }

  save(objeto: Atendimento): Observable<Atendimento> {
    let url = this.apiUrl;
    if (objeto.id) {
      return this.http.put<Atendimento>(url, objeto);
    } else {
      return this.http.post<Atendimento>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

  updateStatus(id: number): Observable<Atendimento> {
    let url = this.apiUrl + "status/" + id;
    return this.http.put<Atendimento>(url, null);
  }

  getHorariosOcupados(profissional_id: number, data: string): Observable<string[]> {
    let url = this.apiUrl + 'horarios/' + profissional_id + '/' + data;
    return this.http.get<string[]>(url);
  }

  getAtendimentoFantasma(): Atendimento {
    let atendimentoFantasma: Atendimento = {
      id: 0,
      convenio: null,
      data: '',
      hora: '',
      status: '',
      paciente: this.servicoPaciente.getPacienteFantasma("Não há atendimentos registrados"),
      profissional: this.servicoProfissional.getProfissionalFantasma(" ")
    };
    return atendimentoFantasma;
  }

}
