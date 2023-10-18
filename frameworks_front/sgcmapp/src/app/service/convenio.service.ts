import { Injectable } from '@angular/core';
import { IService } from './i-service';
import { Convenio } from '../component/model/convenio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ConvenioService implements IService<Convenio>{

  constructor(private http: HttpClient) {};

  apiUrl: string = environment.API_URL + "/convenio/";

  get(termoBusca?: string | undefined): Observable<Convenio[]> {
    let url = this.apiUrl;
    if(termoBusca){
      url += "busca/" + termoBusca;
    }
    return this.http.get<Convenio[]>(url);
  }

  getById(id: number): Observable<Convenio> {
    let url = this.apiUrl + id;
    return this.http.get<Convenio>(url);
  }
  
  save(objeto: Convenio): Observable<Convenio> {
    let url = this.apiUrl;
    if(objeto.id){
      return this.http.put<Convenio>(url, objeto);
    }
    return this.http.post<Convenio>(url, objeto);
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
