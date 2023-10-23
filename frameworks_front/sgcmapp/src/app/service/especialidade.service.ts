import { Injectable } from '@angular/core';
import { IService } from './i-service';
import { Especialidade } from '../component/model/especialidade';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService implements IService<Especialidade>{

  constructor(private http: HttpClient) {};

  apiUrl: string = environment.API_URL + "/config/especialidade/";

  get(termoBusca?: string | undefined): Observable<Especialidade[]> {
    let url = this.apiUrl;
    if(termoBusca){
      url += "busca/" + termoBusca;
    }
    return this.http.get<Especialidade[]>(url);
  }

  getById(id: number): Observable<Especialidade> {
    let url = this.apiUrl + id;
    return this.http.get<Especialidade>(url);
  }

  getProfessionals(termoBusca?: string | undefined): Observable<Especialidade[]> {
    let url = this.apiUrl + "profissionais" + (termoBusca ? "/" + termoBusca : "");
    return this.http.get<Especialidade[]>(url);
  }

  save(objeto: Especialidade): Observable<Especialidade> {
    let url = this.apiUrl;
    if(objeto.id){
      return this.http.put<Especialidade>(url, objeto);
    }
    return this.http.post<Especialidade>(url, objeto);
  }
  
  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
