import { User } from './../user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = { userId: '', userName: '', email: '', phoneNumber: '',password:'', role: '' };  // Empty user data
  modalVisible: boolean = false;
    // Track modal visibility
  isLoading: boolean = false;  // Track loading state for user actions (optional)

  // Form initialization with validation
  editUserForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('',[Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/)]),
    role: new FormControl('', [Validators.required, Validators.pattern(/(Admin|User)/)])
  });

  selectedUserName:string='';
  constructor(private _UserService: UsersService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  // Fetch all users
  fetchUsers(): void {
    this.isLoading = true;
    this._UserService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users.');
      },
      complete: () => this.isLoading = false
    });
  }

  // Delete user by ID
  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this._UserService.deleteUser(userId).subscribe({
        next: () => {
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

  suspendUser(userId: string){
    
  }

  // Remove the user from the UI after deletion
  removeUserFromList(userId: string): void {
    this.users = this.users.filter(user => user.userId !== userId);
  }

  // Open modal and populate form with user data
  openModal(userId: string): void {
    this.isLoading = true;
    this._UserService.getUserById(userId).subscribe({
      next: (data: User) => {
        this.selectedUser = data;
        this.editUserForm.patchValue(data);  // Populate form with user data
        this.modalVisible = true;  // Show modal
        this.selectedUserName = data.userName;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        alert('Failed to fetch user data.');
      },
      complete: () => this.isLoading = false
    });
  }

  // Close the modal
  closeModal(): void {
    this.modalVisible = false;
    this.selectedUser = { userId: '', userName: '', email: '', phoneNumber: '',password:'', role: '' };  // Reset selected user
    this.editUserForm.reset();  // Reset the form
  }

  // Submit form for editing user
  onSubmit(): void {
    if (this.editUserForm.valid) {
        const formValues = this.editUserForm.value;
        console.log('Submitting form with values:', formValues);
        
        this._UserService.editUser(this.selectedUser.userId, formValues).subscribe({
            next: (response) => {
                alert('User updated successfully');
                this.closeModal(); // Close the modal on success
            },
            error: (error) => {
                console.error('Error updating user:', error);
                if (error.status === 400 && error.error.errors) {
                    // Extract and display validation errors from the response
                    const validationErrors = error.error.errors;
                    for (const key in validationErrors) {
                        if (validationErrors.hasOwnProperty(key)) {
                            console.error(`${key}: ${validationErrors[key].join(', ')}`);
                            // Optionally, display these errors in your UI
                        }
                    }
                } else {
                    alert('Failed to update user.');
                }
            }
        });
    } else {
        console.error('Form is invalid');
        this.editUserForm.markAllAsTouched(); // Trigger form validation messages
    }
}

}
