import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unidade } from '../model/unidade';
import { IService } from './i-service';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService implements IService<Unidade> {

  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_URL + '/config/unidade/';

  get(termoBusca?: string | undefined): Observable<Unidade[]> {
    let url = this.apiUrl;
    if (termoBusca) {
      url += "busca/" + termoBusca;
    }
    return this.http.get<Unidade[]>(url);
  }

  getByPage(page: number, size: number, termoBusca?:string): Observable<any[]> {
    termoBusca = termoBusca ? termoBusca : ""
    let url = this.apiUrl + '?page=' + page + '&size=' + size + "&termoBusca=" + termoBusca;
    return this.http.get<any>(url);
  }

  getById(id: number): Observable<Unidade> {
    let url = this.apiUrl + id;
    return this.http.get<Unidade>(url);
  }

  save(objeto: Unidade): Observable<Unidade> {
    let url = this.apiUrl;
    if (objeto.id) {
      return this.http.put<Unidade>(url, objeto);
    } else {
      return this.http.post<Unidade>(url, objeto);
    }
  }

  delete(id: number): Observable<void> {
    let url = this.apiUrl + id;
    return this.http.delete<void>(url);
  }

  getUnidadeFantasma(): Unidade {
    let unidadeFantasma: Unidade = {
      id: 0,
      nome: '',
      endereco: ''
    }
    return unidadeFantasma;
  }

}
