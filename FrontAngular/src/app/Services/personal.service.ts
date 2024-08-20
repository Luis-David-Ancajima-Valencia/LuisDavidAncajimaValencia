import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsetting';
import { Personal } from '../Models/Personal';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.appiUrl + "Personal"

  constructor() { }

  lista(){
    return this.http.get<Personal[]>(this.apiUrl);
  }

  obtener(id:number){
    return this.http.get<Personal>(`${this.apiUrl}/${id}`);
  }

  crear(objt:Personal){
    return this.http.post<ResponseAPI>(this.apiUrl,objt);
  }

  editar(objt:Personal){
    console.log(this.apiUrl,objt)
    return this.http.put<ResponseAPI>(this.apiUrl,objt);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
