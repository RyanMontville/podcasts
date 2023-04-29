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
  showComponents: {login: boolean, register: boolean} = {login: false, register: false};
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
    this.showComponents = {login: true, register: false};
  }

  handleLogin(loginSent: {login: boolean, register: boolean}) {
    this.showComponents = {login: loginSent.login, register: loginSent.register};
  }

  register() {
    this.showComponents = {login: false, register: true};
  }

  handleRegister(registerSent: {login: boolean, register: boolean}) {
    this.showComponents = {login: registerSent.login, register: registerSent.register};
  }

  logout() {
    this.userService.logout();
  }

}
