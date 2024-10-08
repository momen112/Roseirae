import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen = true; // Sidebar is open by default

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


  isLogin : boolean = false;
 constructor(private  _AuthService :AuthService){

  _AuthService.userProfile.subscribe({
    next:()=>{
      if(_AuthService.userProfile.getValue() !== null){
        this.isLogin = true;
      }
      else{
        this.isLogin =false;
      }
    }
  });
 }
 logout(){
  this._AuthService.logout();
  this.isSidebarOpen = false; // Sidebar is open by default
  this.isLogin =false; //


 }
}
