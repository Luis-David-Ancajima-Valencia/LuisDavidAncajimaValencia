import { Component, inject, model } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PersonalService } from '../../Services/personal.service';
import { Personal } from '../../Models/Personal';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { PersonalComponent } from '../personal/personal.component';
import { PersonalDialogComponent } from '../personal-dialog/personal-dialog.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private personalService= inject(PersonalService);
  public listaPersonal:Personal[] = [];
  public displayedColumns:string[] = ['Nro','Nombres','Apellidos','TipoDoc' ,'NumeroDoc','FechaNac','FechaIngreso','Acciones','VerHijos'];
  readonly dialog = inject(MatDialog);

  obtenerPersonal(){
    this.personalService.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaPersonal = data;
          console.log(data);
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    this.obtenerPersonal();
  }

  nuevo(){
    //this.router.navigate(['/personal',0]);
    this.openDialog(0);
  }

  editar(objeto:Personal){
    console.log(objeto.idPersonal);
    //this.router.navigate(['/personal',objeto.idPersonal]);
    this.openDialog(objeto.idPersonal);

  }

  eliminar(objeto:Personal){
    if(confirm("Desea eliminar el personal: " + objeto.nombre1 +" "+objeto.nombre2+" "+objeto.apPaterno+" "+objeto.apMaterno)){
      this.personalService.eliminar(objeto.idPersonal).subscribe({
        next:(data)=>{
         if(data.isSuccess){
          this.obtenerPersonal();
         }else{
          alert("No se pudo eliminar");
         }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

  verHijos(objeto:Personal){
    console.log("id",objeto.idPersonal);
    this.router.navigate(['/listaHijo',objeto.idPersonal]);
  }

  openDialog(id?:number): void {
    //animal: this.animal()},
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
      data: {idPersonal: id},
      height: '90%',
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.obtenerPersonal();
      if (result !== undefined) {
        console.log(result);
        this.obtenerPersonal();
        if(result == "Editar" )
        alert("Se pudo editar correctamente");
        else{
          alert("Se registro correctamente");
        }
      }
    });
  }
}
