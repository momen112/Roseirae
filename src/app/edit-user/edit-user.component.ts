import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  UserID !: any;
  constructor(private _UsersService: UsersService, private _Router: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.UserID = this._Router.snapshot.paramMap.get('id');
  }
}

