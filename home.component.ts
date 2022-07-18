import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService} from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userForm: FormGroup;
  idgen: any;
  users: any[] = [];
  uid: any;
  uname: string ;
  uemail: string ;
  udob: Date;
  uavatar: string;
  ucountry: string;
  save: any;
  userid: any;


  constructor(private formBuilder: FormBuilder, public usersService: UsersService) { }

  ngOnInit() {
    this.createForm();
    this.save = false;
    console.log(this.save);
  }

  createForm() {
    this.userForm = this.formBuilder.group({
        uid: [''],
        uname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        uemail: ['', [Validators.required, Validators.maxLength(20)]],
        udob: ['', [Validators.required]],
        uavatar: ['', [Validators.required]],
        ucountry: ['', [Validators.required]]
    });
  }

  addUser() {
    const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.uid =  idgen;
    this.uname = this.userForm.controls['uname'].value;
    this.uemail = this.userForm.controls['uemail'].value;
    this.udob = this.userForm.controls['udob'].value;
    this.uavatar = this.userForm.controls['uavatar'].value;
    this.ucountry = this.userForm.controls['ucountry'].value;

    if (this.userForm.invalid) {
      return false;
    } else {
      this.users.push({
        uid: this.uid,
        uname: this.uname,
        uemail: this.uemail,
        udob: this.udob,
        uavatar: this.uavatar,
        ucountry: this.ucountry
      });
      console.log(this.users);
      this.userForm.reset();
    }
  }

  deleteUser(id: number) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uname);
        this.users.splice(i, 1);
      }
    }
  }

  editUser(id: number) {
    this.save = true;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uid);
        this.userid = this.users[i].uid;
        this.userForm.patchValue({
          uid: this.users[i].uid,
          uname: this.users[i].uname,
          uemail: this.users[i].uemail,
          udob: this.users[i].udob,
          uavatar: this.users[i].uavatar,
          ucountry: this.users[i].ucountry
        });
      }
    }
  }

  saveUser(id: number) {
    this.save = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
          console.log(this.users[i].uid);
          this.users[i].uid = this.userForm.controls['uid'].value;
          this.users[i].uname = this.userForm.controls['uname'].value;
          this.users[i].uemail = this.userForm.controls['uemail'].value;
          this.users[i].udob = this.userForm.controls['udob'].value;
          this.users[i].uavatar = this.userForm.controls['uavatar'].value;
          this.users[i].ucountry = this.userForm.controls['ucountry'].value;
      }
    }
    this.userForm.reset();
  }


}
