import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiaComponent } from './dia-screen/dia.component';


const routes: Routes = [
  { path: '', component: DiaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiaRoutingModule { }
