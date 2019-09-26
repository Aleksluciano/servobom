import { NgModule } from '@angular/core';
import { PrivilegioRoutingModule } from './privilegio-routing.module';
import { PrivilegioComponent } from './privilegio-screen/privilegio.component';
import { SharedModule } from '../shared/shared.module';
import { PrivDialogComponent } from './dialogs/priv-dialog.component';
import { MatButtonToggleModule } from '@angular/material';



@NgModule({
  declarations: [PrivilegioComponent, PrivDialogComponent],
  imports: [
    MatButtonToggleModule,
    SharedModule,
    PrivilegioRoutingModule
  ],
  entryComponents: [PrivDialogComponent]
})
export class PrivilegioModule { }
