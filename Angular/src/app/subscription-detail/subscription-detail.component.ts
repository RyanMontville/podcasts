import { Component, OnInit } from '@angular/core';
import { Podcast } from '../Podcast.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PodcastService } from '../podcast.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
    podcast: Podcast = new Podcast();
    color: string = '';
    url: string = '';
    urlSubject: string = '';
    errorMessage: string = '';
  
    constructor( 
      private route: ActivatedRoute, 
      private podcastService: PodcastService,
      private userService: UserService) { }
  
    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        let paramString: string = params['id'];
        let userId = this.userService.getUserId();
        this.podcastService.getUrlAnColor(userId,paramString);
        this.podcastService.currentUrl.subscribe(data => {
          this.urlSubject = data;
          this.podcastService.getPodcast(data)
        });
        this.podcastService.errorMessage.subscribe(data => { this.errorMessage = data; });
        this.podcastService.currentPodcast.subscribe(data => { this.podcast = data; });
        this.podcastService.podcastColor.subscribe(color => { this.color = color; });
      });
      
    }
  
    formatDate(date: string) {
      const dateType = new Date(date);
      let formatDate = (dateType.getMonth()+1) + "/" + dateType.getDate() + "/" + dateType.getFullYear();
      return formatDate;
    }
  
    
  }