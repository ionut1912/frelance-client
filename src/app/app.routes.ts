import { Routes } from '@angular/router';
import {JoinComponent} from '../components/join/join.component';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';

export const routes: Routes = [
  {path: '', component: JoinComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];
