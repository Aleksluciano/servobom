import { NgModule } from '@angular/core';
import { PrivilegioRoutingModule } from './privilegio-routing.module';
import { PrivilegioComponent } from './privilegio-screen/privilegio.component';
import { SharedModule } from '../shared/shared.module';
import { PrivDialogComponent } from './dialogs/priv-dialog.component';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material';



@NgModule({
  declarations: [PrivilegioComponent, PrivDialogComponent],
  imports: [
    MatButtonToggleModule,
    FormsModule,
    SharedModule,
    PrivilegioRoutingModule
  ],
  entryComponents: [PrivDialogComponent]
})
export class PrivilegioModule { }
