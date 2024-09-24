import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  constructor(private _UserService: UsersService) { }

  users: User[] = [];

  ngOnInit(): void {
    this._UserService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        // Handle error here, maybe show a message to the user
      }
    });
  }
  deleteUser(userId: string): void {
    console.log(userId);
    if (confirm('Are you sure you want to delete this user?')) {
      this._UserService.deleteUser(userId).subscribe({
        next: (response) => {
          alert('User deleted successfully');
          this.removeUserFromList(userId);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user.');
        }
      });
    }
  }
  removeUserFromList(userId: string): void {
    this.users = this.users.filter(user => user.userId !== userId);
  }

 

  editUser(user: any) {
    console.log('Edit user:', user);}



}
  

