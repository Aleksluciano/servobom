import { IrmaoDialogComponent } from './irmao-dialog/irmao-dialog.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { IrmaoRoutingModule } from './irmao-routing.module';
import { IrmaoComponent } from './irmao-screen/irmao.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [IrmaoComponent, IrmaoDialogComponent],
  imports: [
    SharedModule,
    IrmaoRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [IrmaoDialogComponent]
})
export class IrmaoModule { }
