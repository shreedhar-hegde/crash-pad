import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FurnitureComponent } from './furniture/furniture/furniture.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'furniture', canActivate: [AuthGuard], component: FurnitureComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
