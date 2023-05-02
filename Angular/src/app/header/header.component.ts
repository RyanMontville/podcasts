import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User.model';
import { Router } from '@angular/router';
import { PodcastService } from '../podcast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  user: User = new User(0,'');
  showComponents: {login: boolean, register: boolean} = {login: false, register: false};
  @Input() color: string = 'white';

  constructor(
    private userService: UserService,
    private router: Router) {}
  ngOnInit() {
    this.userService.isSignedIn.subscribe(isSignedIn => { this.isLoggedIn = isSignedIn; });
    this.userService.user.subscribe(user => { this.user = user; });
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
    this.router.navigate(['']);
  }

}
