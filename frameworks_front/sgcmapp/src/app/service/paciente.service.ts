import { Injectable, OnInit } from '@angular/core';
import { IList } from '../component/i-list';
import { Paciente } from '../component/model/paciente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService implements IList<Paciente>{
  
  constructor(private http: HttpClient) { }
  registros: Paciente[] = Array<Paciente>();

  apiUrl: string = environment.API_URL + "/paciente/";

  get(termoBusca?: string | undefined): Observable<Paciente[]> {
    let url = this.apiUrl;
    if(termoBusca){
      url += "busca/" + termoBusca;
    }
    return this.http.get<Paciente[]>(url);
  }

  getById(id: number): Observable<Paciente> {
    throw new Error('Method not implemented.');
  }
  
  save(objeto: Paciente): Observable<Paciente> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
  
}
