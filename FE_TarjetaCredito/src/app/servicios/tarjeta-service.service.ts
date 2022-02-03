import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaServiceService {
  readonly baseUrl = 'https://localhost:7238/api/Tarjeta';

  constructor(private http: HttpClient) { }

  getListTarjetas(): Observable<any>{
    return this.http.get(this.baseUrl);
  }

  deleteTarjeta(id: number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  guardarTarjeta(tarjeta:any): Observable<any>{
    return this.http.post(this.baseUrl, tarjeta);
  }

  updateTarjeta(id:number|undefined, tarjeta:any): Observable<any>{
    return this.http.put(`${this.baseUrl}/${id}`,tarjeta);
  }
}
