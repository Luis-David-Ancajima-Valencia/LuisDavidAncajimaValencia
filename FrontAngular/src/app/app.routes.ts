import { Routes } from '@angular/router';
import { InicioComponent } from './Pages/inicio/inicio.component';
import { HijoComponent } from './Pages/lista-hijo/hijo/hijo.component';
import { ListaHijoComponent } from './Pages/lista-hijo/lista-hijo.component';
import { PersonalDialogComponent } from './Pages/personal-dialog/personal-dialog.component';

export const routes: Routes = [
    {path:'',component:InicioComponent},
    {path:'inicio',component:InicioComponent},
    {path:'personal/:id',component:PersonalDialogComponent},
    {path:'listaHijo/:id',component:ListaHijoComponent},
    {path:'hijo/:id',component:HijoComponent},
];
