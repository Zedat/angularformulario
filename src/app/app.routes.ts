import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//containers
import { FormComponent } from './containers/form/form.component';
import { LoginComponent } from './containers/login/login.component';
import { AdminComponent } from './containers/admin/admin.component';

//login test
import { dashboardComponent } from './containers/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ProfileComponent } from './components/profile/profile.component';
//guards
import {SecureInnerPagesGuard} from './shared/guard/secure-inner-pages.guard';
import {AuthGuard} from './shared/guard/auth.guard';

const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  // { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'sign-in', component: SignInComponent},
  { path: 'add-user', component: AddUserComponent},
  { path: 'profile', component: ProfileComponent},
  // { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  // { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  // { path: 'dashboard', component: dashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: dashboardComponent },
  { path: 'admin', component: AdminComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  // { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }