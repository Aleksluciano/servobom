import { SharedModule } from './../shared/shared.module';
import { CockpitComponent } from './cockpit-screen/cockpit.component';
import { NgModule } from '@angular/core';


import { CockpitRoutingModule } from './cockpit-routing.module';


@NgModule({
  declarations: [CockpitComponent],
  imports: [
    SharedModule,
    CockpitRoutingModule
  ]
})
export class CockpitModule { }
