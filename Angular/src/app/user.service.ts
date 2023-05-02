import { Injectable } from "@angular/core";
import { User } from "./User.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class UserService {
    public user = new BehaviorSubject<User>({userId: 0,username:''});
    public userId: number = 0;
    public isSignedIn = new BehaviorSubject<boolean>(false);
    public errorMessage = new BehaviorSubject<string>('');

    constructor(
        private http: HttpClient,
        private router: Router) { }

    login(username: string) {
        this.http.get<User>(`http://localhost:9000/users/${username}`).subscribe(data => {
            this.user.next(data);
            this.userId = data.userId;
            this.isSignedIn.next(true);
            this.errorMessage.next('');
            this.router.navigate(['']);
        }, error => {
            this.errorMessage.next(error.error.message);
        });
    }

    register(username: string) {
        this.http.post<User>('http://localhost:9000/users',username).subscribe(data => {
            this.user.next(data);
            this.isSignedIn.next(true);
            this.errorMessage.next('');
        }, error => {
            this.errorMessage.next(error.error.message);
        });
    }

    logout() {
        this.user.next({userId: 0, username: ''});
        this.isSignedIn.next(false);
    }

    getUserId() {
        return this.userId;
    }
}