import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Especialidade } from '../model/especialidade';
import { IService } from './i-service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService implements IService<Especialidade> {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_URL + '/config/especialidade/';

  get(termoBusca?: string | undefined): Observable<Especialidade[]> {
    let url = this.apiUrl + '/';
    if (termoBusca) {
      url += '/busca/' + termoBusca;
    }
    return this.http.get<Especialidade[]>(url);
  }

  getByPage(page: number, size: number, termoBusca?:string): Observable<any[]> {
    termoBusca = termoBusca ? termoBusca : ""
    let url = this.apiUrl + 'page?page=' + page + '&size=' + size  + '&termoBusca=' + termoBusca;
    return this.http.get<any>(url);
  }
  
  getById(id: number): Observable<Especialidade> {
    let url = this.apiUrl + id;
    return this.http.get<Especialidade>(url);
  }

  save(objeto: Especialidade): Observable<Especialidade> {
    let url = this.apiUrl;
    if (objeto.id) {
      return this.http.put<Especialidade>(url, objeto);
    } else {
      return this.http.post<Especialidade>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

  getEspecialidadeFantasma(): Especialidade {
    let especialidadeFantasma: Especialidade = {
      id: 0,
      nome: ''
    }
    return especialidadeFantasma;
  }

}
