import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() hasLoggedIn = new EventEmitter<{login: boolean, register: boolean}>();
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.errorMessage.subscribe(error => {
      this.errorMessage = error;
    });
    this.userService.isSignedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      if(loggedIn) {
        this.hasLoggedIn.emit({login: false, register: false});
      }
    })
  }

  onSubmit(f: NgForm) {
    this.username = f.value.username;
    this.password = f.value.password;
    this.errorMessage = '';
    this.userService.login(f.value.username);
  }

  register() {
    this.hasLoggedIn.emit({login: false, register: true});
  }

  close() {
    this.hasLoggedIn.emit({login: false, register: false});
  }

}
