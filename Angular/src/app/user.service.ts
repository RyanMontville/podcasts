import { Injectable } from "@angular/core";
import { User } from "./User.model";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    public user = new BehaviorSubject<User>({userId: 0,username:''});
    public isSignedIn = new BehaviorSubject<boolean>(false);
    public errorMessage = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) { }

    login(username: string) {
        this.http.get<User>(`http://localhost:9000/users/${username}`).subscribe(data => {
            this.user.next(data);
            this.isSignedIn.next(true);
            this.errorMessage.next('');
        }, error => {
            this.errorMessage.next(error.message);
            return error.message;
        });
        return '';
    }

    logout() {
        this.user.next({userId: 0, username: ''});
        this.isSignedIn.next(false);
    }
}