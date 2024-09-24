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

  // users = [
  //   { id: 1, name: 'John Doe', email: 'john@example.com', role :'Admin' ,phone :'01152550399' },
  //   { id: 2, name: 'Jane Smith', email: 'jane@example.com' , role :'Admin' ,phone :'01152550399'  },
  //   { id: 3, name: 'Sam Williams', email: 'sam@example.com' , role :'Admin' ,phone :'01152550399' }
  // ];

  editUser(user: any) {
    console.log('Edit user:', user);}
  //   // Implement edit functionality
  // }

  deleteUser(user: any) {
    console.log('Delete user:', user);}
  //   // Implement delete functionality
  // }
  // selectedUser: any;
  // isModalOpen = false;

  // openEditModal(user: any) {
  //   this.selectedUser = { ...user }; // Clone user data
  //   this.isModalOpen = true; // Open the modal
  // }

  // closeEditModal() {
  //   this.isModalOpen = false; // Close the modal
  // }

  // saveUser() {
  //   // Implement your save logic here
  //   console.log('User updated:', this.selectedUser);
  //   this.closeEditModal(); // Close the modal
  // }





}
    function deleteUser(user: any, any: any) {
      throw new Error('Function not implemented.');
    }

