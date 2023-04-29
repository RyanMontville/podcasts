import { Component, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() hasRegister = new EventEmitter<{login: boolean, register: boolean}>();
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
        this.hasRegister.emit({login: false, register: false});
      }
    })
  }

  onSubmit(f: NgForm) {
    this.username = f.value.username;
    this.password = f.value.password;
    this.errorMessage = '';
    this.userService.register(f.value.username);
  }

  login() {
    this.hasRegister.emit({login: true, register: false});
  }

  close() {
    this.hasRegister.emit({login: false, register: false});
  }
}
