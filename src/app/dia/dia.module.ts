import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { DiaRoutingModule } from './dia-routing.module';
import { DiaComponent } from './dia-screen/dia.component';



@NgModule({
  declarations: [DiaComponent],
  imports: [
    SharedModule,
    DiaRoutingModule
  ]
})
export class DiaModule { }
