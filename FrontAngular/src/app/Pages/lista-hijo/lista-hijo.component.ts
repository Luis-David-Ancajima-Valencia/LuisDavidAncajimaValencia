import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HijoService } from '../../Services/hijo.service';
import { Hijo } from '../../Models/Hijo';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HijoComponent } from './hijo/hijo.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-lista-hijo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './lista-hijo.component.html',
  styleUrl: './lista-hijo.component.css'
})
export class ListaHijoComponent implements OnInit{

  @Input('id') idPersonal! : number;
  private hijoService= inject(HijoService);
  public listaHijo:Hijo[] = [];
  public displayedColumns:string[] = ['Nro','Nombres','Apellidos','FechaNac','Acciones'];
  readonly dialog = inject(MatDialog);


  obtenerHijo(){
    console.log(this.idPersonal);
    this.hijoService.listarPorPersonal(this.idPersonal).subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaHijo = data;
          console.log(data);
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  

  constructor(private router:Router){ }

  ngOnInit(): void {
    this.obtenerHijo();
  }

  nuevo(){
  
    this.openDialog(0);
  }

  editar(objeto:Hijo){
   this.openDialog(objeto.idHijo);
  }

  eliminar(objeto:Hijo){
    if(confirm("Desea eliminar el Hijo: " + objeto.nombre1 +" "+objeto.nombre2+" "+objeto.apPaterno+" "+objeto.apMaterno)){
      this.hijoService.eliminar(objeto.idHijo).subscribe({
        next:(data)=>{
         if(data.isSuccess)
          this.obtenerHijo();
         else
          alert("No se pudo eliminar");
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

  volver(){
    this.router.navigate(["/"]);
  }

  openDialog(id?:number): void {
    const dialogRef = this.dialog.open(HijoComponent, {
      data: {
        idHijo: id,
        idPersonal:this.idPersonal
      },
      height: '90%',
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.obtenerHijo();
        if(result == "Editar")
        alert("Se pudo editar correctamente");
        else
        alert("Se registro correctamente");
        
      }
    });
  }
}
