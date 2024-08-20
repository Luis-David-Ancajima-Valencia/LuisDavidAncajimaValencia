import { Component, inject, Input, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule,FormBuilder,FormGroup, } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PersonalService } from '../../Services/personal.service';
import { Router } from '@angular/router';
import { Personal } from '../../Models/Personal';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit {
  
  @Input('id') idPersonal! : number;
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

  constructor(private router:Router){}
  
  ngOnInit(): void {
    if(this.idPersonal != 0){
      this.personalServicio.obtener(this.idPersonal).subscribe({
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
  }

  guardar(){
    const objeto : Personal = {
      idPersonal : this.idPersonal,
      tipoDoc: this.formPersonal.value.tipoDoc,
      numeroDoc: this.formPersonal.value.numeroDoc,
      apPaterno: this.formPersonal.value.apPaterno,
      apMaterno:this.formPersonal.value.apMaterno,
      nombre1:this.formPersonal.value.nombre1,
      nombre2:this.formPersonal.value.nombre2,
      fechaNac:this.formPersonal.value.fechaNac,
      fechaIngreso:this.formPersonal.value.fechaIngreso
    }
  
    if(this.idPersonal == 0){
      this.personalServicio.crear(objeto).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
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
            this.router.navigate(["/"]);
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
    this.router.navigate(["/"]);
  }

}
