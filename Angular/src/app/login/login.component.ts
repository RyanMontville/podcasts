import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() hasLoggedIn = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;
  errorMessage: string = '';

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.errorMessage.subscribe(error => {
      this.errorMessage = error;
    });
    this.userService.isSignedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    })
  }

  login() {
    this.userService.login('ryan');
    if(this.isLoggedIn === true) {
      this.hasLoggedIn.emit(false);
    }
    
    
  }

}
