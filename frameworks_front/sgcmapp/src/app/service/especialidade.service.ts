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
    throw new Error('Method not implemented.');
  }
  save(objeto: Especialidade): Observable<Especialidade> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    console.log("no servico " + id);
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
