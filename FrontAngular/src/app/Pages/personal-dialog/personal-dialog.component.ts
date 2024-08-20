import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Personal } from '../../Models/Personal';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PersonalService } from '../../Services/personal.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-personal-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './personal-dialog.component.html',
  styleUrl: './personal-dialog.component.css'
})
export class PersonalDialogComponent {

  readonly dialogRef = inject(MatDialogRef<PersonalDialogComponent>);
  readonly data = inject<Personal>(MAT_DIALOG_DATA);

  nombreDialog :string = "Registrar";
  private personalServicio = inject(PersonalService);
  public formBuild = inject(FormBuilder);

  public formPersonal:FormGroup = this.formBuild.group({
    tipoDoc: [''],
    numeroDoc:[''],
    apPaterno:[''],
    apMaterno:[''],
    nombre1:[''],
    nombre2:[''],
    fechaNac:[''],
    fechaIngreso:['']
  });

  constructor(private router:Router){
      console.log(MAT_DIALOG_DATA);
    }
  
  ngOnInit(): void {
    if(this.data.idPersonal != 0){
      this.nombreDialog = "Editar";
      this.personalServicio.obtener(this.data.idPersonal).subscribe({
        next:(data) =>{
          this.formPersonal.patchValue({
            tipoDoc: data.tipoDoc,
            numeroDoc:data.numeroDoc,
            apPaterno:data.apPaterno,
            apMaterno:data.apMaterno,
            nombre1:data.nombre1,
            nombre2:data.nombre2,
            fechaNac:data.fechaNac,
            fechaIngreso:data.fechaIngreso
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
    const objeto : Personal = {
      idPersonal : this.data.idPersonal,
      tipoDoc: this.formPersonal.value.tipoDoc,
      numeroDoc: this.formPersonal.value.numeroDoc,
      apPaterno: this.formPersonal.value.apPaterno,
      apMaterno:this.formPersonal.value.apMaterno,
      nombre1:this.formPersonal.value.nombre1,
      nombre2:this.formPersonal.value.nombre2,
      fechaNac:this.formPersonal.value.fechaNac,
      fechaIngreso:this.formPersonal.value.fechaIngreso
    }
  
    if(this.data.idPersonal == 0){
      this.personalServicio.crear(objeto).subscribe({
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
      this.personalServicio.editar(objeto).subscribe({
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
