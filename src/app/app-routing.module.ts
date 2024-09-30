import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatenewComponent } from './createnew/createnew.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth.guard';
import { preventURLBackGuard } from './prevent-urlback.guard';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard',pathMatch:'full' , title:'Dashboard'},
  {path:'login',canActivate:[preventURLBackGuard],component:LoginComponent,title:'Login'},
  {path:'dashboard',canActivate:[authGuard],component:DashboardComponent, title:'Home'},
  {path:'newMerchent',canActivate:[authGuard],component:CreatenewComponent,title:'Create new user'},
  {path:'users',canActivate:[authGuard],component:UsersComponent,title:'All Users'},
  {path:'edit',canActivate:[authGuard],component:EditUserComponent,title:'All Users'},
  {path:'editUser/:id',canActivate:[authGuard],component:EditUserComponent,title:'All Users'},


  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
