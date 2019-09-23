import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './user/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'cockpit',
    loadChildren: () =>
      import('./cockpit/cockpit.module').then(m => m.CockpitModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dia',
    loadChildren: () => import('./dia/dia.module').then(m => m.DiaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'privilegio',
    loadChildren: () => import('./privilegio/privilegio.module').then(m => m.PrivilegioModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
