import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IrmaoComponent } from './irmao-screen/irmao.component';


const routes: Routes = [
  { path: '', component: IrmaoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IrmaoRoutingModule { }
