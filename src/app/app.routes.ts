
import { Routes } from '@angular/router';
import { JoinComponent } from '../components/join/join.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ClientPageComponent } from '../components/client-page/client-page.component';
import { FreelancerPageComponent } from '../components/freelancer-page/freelancer-page.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { UnauthorizedComponent } from '../components/unauthorized/unauthorized.component';

export const routes: Routes = [
  { path: '', component: JoinComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'freelancer', component: FreelancerPageComponent,canActivate:[AuthGuard] },
  { path: 'client', component: ClientPageComponent,canActivate:[AuthGuard] },
  {path:'unauthorized', component: UnauthorizedComponent},
  { path: '**', component: NotFoundComponent }
];
