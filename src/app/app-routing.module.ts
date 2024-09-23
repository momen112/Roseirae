import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatenewComponent } from './createnew/createnew.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'dashboard',pathMatch:'full' , title:'Dashboard'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'forgettPassword',canActivate:[authGuard],component:ForgetpassComponent, title:'Forgett Password'},
  {path:'dashboard',canActivate:[authGuard],component:DashboardComponent, title:'Home'},
  {path:'newMerchent',canActivate:[authGuard],component:CreatenewComponent,title:'Create new user'},
  {path:'users',canActivate:[authGuard],component:UsersComponent,title:'All Users'},

  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
