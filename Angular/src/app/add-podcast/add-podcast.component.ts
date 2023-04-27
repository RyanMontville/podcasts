import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Podcast } from '../Podcast.model';
import { PodcastService } from '../podcast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-podcast',
  templateUrl: './add-podcast.component.html',
  styleUrls: ['./add-podcast.component.css']
})
export class AddPodcastComponent {
  podcastUrl: string = "";
  podcastTitle: string = "";
  podcastColor: string = "";
  podcastImage: string = "";
  podcastHost: string = "";
  status: string = "";

  constructor(private http: HttpClient, private podcastService: PodcastService, private router: Router) {}

  getPodcast(podcast: string) {
    this.http.get<Podcast>(`https://api.rss2json.com/v1/api.json?rss_url=${podcast}`)
    .subscribe(data => {
      if(data.status === 'error') {
        this.status = data.status;
      } else {
        this.podcastImage = data.feed.image;
        this.podcastTitle = data.feed.title;
        this.podcastHost = data.feed.author;
        this.podcastService.addPodcast({url: podcast, title: data.feed.title, color: 'black', image: data.feed.image});
        this.router.navigate(['/']);
      }
    }, error => {
      this.status = 'error';
});
  }

  onSubmit(f: NgForm) {
    this.podcastUrl = f.value.podcastUrl;
    this.status = '';
    this.getPodcast(f.value.podcastUrl);
  }
}
