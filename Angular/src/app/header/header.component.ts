import { Component, Input, OnInit } from '@angular/core';
import { Link } from '../Link.model';
import { UserService } from '../user.service';
import { User } from '../User.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  backgroundColor: string = "";
  color: string = "";
  isLoggedIn: boolean = false;
  user: User = new User(0,'');
  showLoginComponent: boolean = false;
  showRegisterComponent: boolean = false;
  @Input() set podcast(value: Link){
    this.backgroundColor = value.color;
  }

  constructor(private userService: UserService) {}
  ngOnInit() {
    this.userService.isSignedIn.subscribe(isSignedIn => {
      this.isLoggedIn = isSignedIn;
    });
    this.userService.user.subscribe(user => {
      this.user = user;
    })
  }

  login() {
    this.showLoginComponent = true;
    this.showRegisterComponent = false;
  }

  handleLogin(login: boolean) {
    this.showLoginComponent = login;
  }

  register() {
    this.showLoginComponent = false;
    this.showRegisterComponent = true;
  }

  handleRegister(register: boolean) {
    this.showRegisterComponent = register;
  }

  logout() {
    this.userService.logout();
  }

}
