import { PrivDialogComponent } from './dialogs/priv-dialog.component';
import { PrivilegioComponent } from './privilegio-screen/privilegio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', component: PrivilegioComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivilegioRoutingModule { }
