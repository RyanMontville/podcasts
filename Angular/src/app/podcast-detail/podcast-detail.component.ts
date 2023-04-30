import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Item, Podcast } from 'src/app/Podcast.model';
import { PodcastService } from '../podcast.service';
import { Link } from '../Link.model';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent implements OnInit {
  podcast: Podcast = new Podcast();
  link: Link = new Link(0,'','','','');
  linkStringified: string = '';
  podcastId: number = 0;
  podcastImage: string = "";
  podcastTitle: string = "";
  podcastHost: string = "";
  hostLink: string = "";
  description: string = "";
  feedItems: Item[] = [];
  url: string = '';
  urlSubject: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private podcastService: PodcastService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let paramString: string = params['id'];
      this.podcastService.getUrl(paramString);
      this.podcastService.currentUrl.subscribe(data => {
        this.urlSubject = data;
        this.linkStringified = JSON.stringify(this.podcastService.getPodcast(data))
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
