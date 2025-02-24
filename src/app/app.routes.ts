import { Routes } from '@angular/router';
import { JoinComponent } from '../components/join/join.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ClientPageComponent } from '../components/client-page/client-page.component';
import { FreelancerPageComponent } from '../components/freelancer-page/frelancer-page.component';

export const routes: Routes = [
  { path: '', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'freelancer', component: FreelancerPageComponent },
  { path: 'client', component: ClientPageComponent },
];
