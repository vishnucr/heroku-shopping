import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'auth', loadChildren: () => import('./modules/auth-module/auth.module').then(m => m.AuthModule) },
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./modules/home-module/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
