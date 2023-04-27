import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Link } from '../Link.model';
import { PodcastService } from '../podcast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  podcasts: Link[] = [];
  username: string = "Ryan";

  constructor(private podcastService: PodcastService, private router: Router) {}

  ngOnInit() {
    this.podcasts = this.podcastService.getAllPodcasts();
  }

  addPodcast() {
    this.podcastService.addPodcast({url: 'https://feeds.simplecast.com/9YNI3WaL', title: 'Dear Hank and John', color: 'black', image: 'https://image.simplecastcdn.com/images/2dcfae8f-b2e0-4826-a483-1306d3b8be06/d8c21569-e9eb-41d5-b1d0-70d9ea0c8ddc/3000x3000/dhj-podcastartwork-2021-v1.jpg?aid=rss_feed'});
    this.podcasts = this.podcastService.getAllPodcasts();
  }

  viewPodcast(title: string) {
    let str = title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate([`/${str}`]);
  }

}
