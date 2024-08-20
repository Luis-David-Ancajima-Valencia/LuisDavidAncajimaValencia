import { inject, Injectable } from '@angular/core';
import { Hijo } from '../Models/Hijo';
import { HttpClient } from '@angular/common/http';
import { appsettings } from '../Settings/appsetting';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class HijoService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.appiUrl + "Hijo"

  constructor() { }

  lista(){
    return this.http.get<Hijo[]>(this.apiUrl);
  }

  listarPorPersonal(idPersonal: number){
    console.log("idPer",idPersonal);
    return this.http.get<Hijo[]>(`${this.apiUrl}/${idPersonal}`);
    //return this.http.post<Hijo[]>(this.apiUrl,idPersonal);
  }

  obtener(id:number){
    return this.http.get<Hijo>(`${this.apiUrl}/${id}`);
  }

  crear(objt:Hijo){
    return this.http.post<ResponseAPI>(this.apiUrl,objt);
  }

  editar(objt:Hijo){
    return this.http.put<ResponseAPI>(this.apiUrl,objt);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
