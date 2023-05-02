import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../podcast.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  color: string = 'white';
  unsubbed: {id:number,title:string}[] = [];

  constructor(private podcastService: PodcastService,private userService: UserService) {}

  ngOnInit() {
    let userId = this.userService.getUserId();
    this.podcastService.getUnsubbedForUser(userId);
    this.podcastService.unsubbed.subscribe(data => {
      this.unsubbed = data;
    })
  }

}
