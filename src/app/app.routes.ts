import { Routes } from '@angular/router';
import { JoinComponent } from '../components/join/join.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { FrelancerPageComponent } from '../components/frelancer-page/frelancer-page.component';
import { ClientPageComponent } from '../components/client-page/client-page.component';

export const routes: Routes = [
  { path: '', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'freelancer', component: FrelancerPageComponent },
  { path: 'client', component: ClientPageComponent },
];
