import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../podcast.service';
import { UserService } from '../user.service';
import { Colors } from '../colors.array';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {
  color: string = 'white';
  unsubbed: {podcastId:number,podcastTitle:string}[] = [];
  unsubstr: string = '';
  colors = Colors;
  chosenId: number = 0;
  chosenTitle: string = '';
  chosenColor: string = '';
  userId: number = 0;

  constructor(private podcastService: PodcastService,private userService: UserService) {}

  ngOnInit() {
    let userId = this.userService.getUserId();
    this.userId = userId;
    this.podcastService.getUnsubbedForUser(userId);
    this.podcastService.unsubbed.subscribe(data => {
      this.unsubbed = data;
      this.unsubstr = JSON.stringify(data[0]);
    });
  }

  handlePodcastSelection(chosenPodcast: {podcastId:number,podcastTitle:string}) {
    this.chosenId = chosenPodcast.podcastId;
    this.chosenTitle = chosenPodcast.podcastTitle;
  }

  handleColorSelection(colorSelection: string){
    this.chosenColor = colorSelection;
    let hasSubscribed: boolean = this.podcastService.subscribeToPodcast(this.userId,this.chosenId,this.chosenColor);
  }

}
