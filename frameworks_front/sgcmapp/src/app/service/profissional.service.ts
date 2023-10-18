import { Injectable } from '@angular/core';
import { IService } from './i-service';
import { Profissional } from '../component/model/profissional';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfissionalService implements IService<Profissional>{

  constructor(private http: HttpClient) { }
  apiUrl: string = environment.API_URL + "/profissional/";;
  get(termoBusca?: string | undefined): Observable<Profissional[]> {
    let url = this.apiUrl;
    if(termoBusca) {
      url += "busca/" + termoBusca;
    }
    return this.http.get<Profissional[]>(url);
  }

  getById(id: number): Observable<Profissional> {
    let url = this.apiUrl + id;
    return this.http.get<Profissional>(url);
  }
  
  save(objeto: Profissional): Observable<Profissional> {
    let url = this.apiUrl;
    if (objeto.id){
      return this.http.put<Profissional>(url, objeto);
    }
    return this.http.post<Profissional>(url, objeto);
  }
  
  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
