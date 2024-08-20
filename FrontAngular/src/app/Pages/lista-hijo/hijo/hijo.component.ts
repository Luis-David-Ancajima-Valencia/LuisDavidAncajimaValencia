import { Component, inject, Input, OnInit } from '@angular/core';
import { HijoService } from '../../../Services/hijo.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Hijo } from '../../../Models/Hijo';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-hijo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent {

   
  readonly dialogRef = inject(MatDialogRef<HijoComponent>);
  readonly data = inject<Hijo>(MAT_DIALOG_DATA);
  //idPersonal! : number;
  
  nombreDialog :string = "Registrar";
  private hijoServicio = inject(HijoService);
  public formBuild = inject(FormBuilder);

  public formHijo:FormGroup = this.formBuild.group({
    tipoDoc: [''],
    numeroDoc:[''],
    apPaterno:[''],
    apMaterno:[''],
    nombre1:[''],
    nombre2:[''],
    fechaNac:[''],
    idPersonal:['']
  });

  constructor(private router:Router){
      console.log(MAT_DIALOG_DATA);
    }
  
  ngOnInit(): void {
    if(this.data.idHijo != 0){
      this.nombreDialog = "Editar";
      this.hijoServicio.obtener(this.data.idHijo).subscribe({
        next:(data) =>{
          this.formHijo.patchValue({
            tipoDoc: data.tipoDoc,
            numeroDoc:data.numeroDoc,
            apPaterno:data.apPaterno,
            apMaterno:data.apMaterno,
            nombre1:data.nombre1,
            nombre2:data.nombre2,
            fechaNac:data.fechaNac,
            idPersonal:data.idPersonal
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
    else{
      this.nombreDialog = "Registrar";
    }
  }

  guardar(){
    const objeto : Hijo = {
      idHijo : this.data.idHijo,
      tipoDoc: this.formHijo.value.tipoDoc,
      numeroDoc: this.formHijo.value.numeroDoc,
      apPaterno: this.formHijo.value.apPaterno,
      apMaterno:this.formHijo.value.apMaterno,
      nombre1:this.formHijo.value.nombre1,
      nombre2:this.formHijo.value.nombre2,
      fechaNac:this.formHijo.value.fechaNac,
      idPersonal:this.data.idPersonal
    }
  
    if(this.data.idHijo == 0){
      this.hijoServicio.crear(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.dialogRef.close("Registar");
          }else{
            alert("Error al crear")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }else{
      this.hijoServicio.editar(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.dialogRef.close("Editar");
          }else{
            alert("Error al editar")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  
  
  }

  volver(){
    this.dialogRef.close();
  }
  
}
