import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Item, Podcast } from 'src/app/Podcast.model';

@Component({
  selector: 'app-podcast-detail',
  templateUrl: './podcast-detail.component.html',
  styleUrls: ['./podcast-detail.component.css']
})
export class PodcastDetailComponent {
  podcastImage: string = "";
  podcastTitle: string = "";
  podcastHost: string = "";
  hostLink: string = "";
  description: string = "";
  feedItems: Item[] = [];

  constructor(private http: HttpClient) { }
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
