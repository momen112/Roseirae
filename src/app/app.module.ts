import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';

import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreatenewComponent } from './createnew/createnew.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    SidebarComponent,
    AppComponent,
    LoginComponent,

    ForgetpassComponent,
    NotfoundComponent,
    DashboardComponent,
    CreatenewComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // Not auto Imported
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
