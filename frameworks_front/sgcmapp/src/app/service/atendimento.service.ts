import { Injectable } from '@angular/core';
import { Atendimento } from '../component/model/atendimento';
import { IService } from './i-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService implements IService<Atendimento>{

  constructor(private http: HttpClient) {};
  
  apiUrl: string = environment.API_URL + "/atendimento/";
  get(termoBusca?: string | undefined): Observable<Atendimento[]> {
    let url = this.apiUrl;
    if(termoBusca) {
      url += "busca/" + termoBusca;
    }
    return this.http.get<Atendimento[]>(url);
  }
  getById(id: number): Observable<Atendimento> {
    let url = this.apiUrl;
    url += id;
    return this.http.get<Atendimento>(url);
  }
  save(objeto: Atendimento): Observable<Atendimento> {
    throw new Error('Method not implemented.');
  }
  delete(id: number): Observable<void> {
    console.log("no servico " + id);
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
