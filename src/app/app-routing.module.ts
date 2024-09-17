import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatenewComponent } from './createnew/createnew.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard',pathMatch:'full' , title:'Home'},
  {path:'login',component:LoginComponent,title:'Login'},
  {path:'forgettPassword',component:ForgetpassComponent, title:'Forgett Password'},
  {path:'dashboard',component:DashboardComponent, title:'Home'},
  {path:'newMerchent',component:CreatenewComponent,title:'Create new user'},
  {path:'**',component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
