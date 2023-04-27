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
  podcast: Link = {id: 0, url: '', title: '', color: ''};
  podcastId: number = 0;
  podcastImage: string = "";
  podcastTitle: string = "";
  podcastHost: string = "";
  hostLink: string = "";
  description: string = "";
  feedItems: Item[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private podcastService: PodcastService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      let id: number = +params['id'];
      this.podcast = this.podcastService.getPodcast(id);
      alert(this.podcast.title);
      this.getPodcast(this.podcast.url);
    })
    
  }
  getPodcast(podcast: string) {
    this.http.get<Podcast>(`https://api.rss2json.com/v1/api.json?rss_url=${podcast}`).subscribe(data => {
      this.podcastImage = data.feed.image;
      this.podcastHost = data.feed.author;
      this.podcastTitle = data.feed.title;
      this.description = data.feed.description;
      this.hostLink = data.feed.link;
      this.feedItems = data.items;
    })
  }

  formatDate(date: string) {
    const dateType = new Date(date);
    let formatDate = dateType.getMonth() + "/" + dateType.getDay() + "/" + dateType.getFullYear();
    return formatDate;
  }

  
}
