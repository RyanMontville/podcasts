import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Podcast } from 'src/app/Podcast.model';
import { PodcastService } from '../podcast.service';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent implements OnInit {
  podcast: Podcast = new Podcast();
  color: string = 'white';
  url: string = '';
  urlSubject: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute, 
    private podcastService: PodcastService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let paramString: string = params['id'];
      this.podcastService.getUrl(paramString);
      this.podcastService.currentUrl.subscribe(data => {
        this.urlSubject = data;
        this.podcastService.getPodcast(data)
      });
      this.podcastService.errorMessage.subscribe(data => {
        this.errorMessage = data;
      });
      this.podcastService.currentPodcast.subscribe(data => {
        this.podcast = data;
      })
    });
    
  }

  formatDate(date: string) {
    const dateType = new Date(date);
    let formatDate = (dateType.getMonth()+1) + "/" + dateType.getDate() + "/" + dateType.getFullYear();
    return formatDate;
  }

  
}
