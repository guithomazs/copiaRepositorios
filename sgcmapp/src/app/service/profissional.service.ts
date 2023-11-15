import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profissional } from '../model/profissional';
import { IService } from './i-service';
import { PacienteService } from './paciente.service';
import { UnidadeService } from './unidade.service';
import { EspecialidadeService } from './especialidade.service';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService implements IService<Profissional> {

  constructor(
    private http: HttpClient,
    private servicoEspecialidade: EspecialidadeService,
    private servicoUnidade: UnidadeService,
  ) { }

  apiUrl: string = environment.API_URL + '/profissional/';

  get(termoBusca?: string | undefined): Observable<Profissional[]> {
    let url = this.apiUrl;
    if (termoBusca) {
      url += "busca/" + termoBusca;
    }
    return this.http.get<Profissional[]>(url);
  }

  getByPage(page: number, size: number, termoBusca?:string): Observable<any[]> {
    let url = this.apiUrl + '?page=' + page + '&size=' + size;
    return this.http.get<any>(url);
  }

  getById(id: number): Observable<Profissional> {
    let url = this.apiUrl + id;
    return this.http.get<Profissional>(url);
  }

  save(objeto: Profissional): Observable<Profissional> {
    let url = this.apiUrl;
    if (objeto.id) {
      return this.http.put<Profissional>(url, objeto);
    } else {
      return this.http.post<Profissional>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

  getProfissionalFantasma(texto?: string): Profissional {
    let profissionalFantasma: Profissional = {
      id: 0,
      nome: texto ? texto : 'Não há registros de Profissional',
      registroConselho:'',
      telefone:'',
      email:'',
      especialidade: this.servicoEspecialidade.getEspecialidadeFantasma(),
      unidade: this.servicoUnidade.getUnidadeFantasma(),
    }
    return profissionalFantasma;
  }

}
