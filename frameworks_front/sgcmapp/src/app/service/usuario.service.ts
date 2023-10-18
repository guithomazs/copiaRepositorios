import { Injectable } from '@angular/core';
import { IService } from './i-service';
import { Usuario } from '../component/model/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService implements IService<Usuario>{

  constructor(private http: HttpClient) {};

  apiUrl: string = environment.API_URL + "/config/usuario/";

  get(termoBusca?: string | undefined): Observable<Usuario[]> {
    let url = this.apiUrl;
    if(termoBusca){
      url += "busca/" + termoBusca;
    }
    return this.http.get<Usuario[]>(url);
  }

  getById(id: number): Observable<Usuario> {
    let url = this.apiUrl + id;
    return this.http.get<Usuario>(url);
  }

  save(objeto: Usuario): Observable<Usuario> {
    let url = this.apiUrl;
    if(objeto.id){
      return this.http.put<Usuario>(url, objeto);
    }
    return this.http.post<Usuario>(url, objeto);
  }
  
  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }
}
