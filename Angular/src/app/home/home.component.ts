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

  constructor(private podcastService: PodcastService, private router: Router) {}

  ngOnInit() {
    this.podcastService.podcastsChanged.subscribe((podcasts: Link[])=> {
      this.podcasts = podcasts;
    });
  }

  addPodcast() {
    this.podcastService.addPodcast({id: 4, url: 'https://feeds.simplecast.com/9YNI3WaL', title: 'Dear Hank and John', color: 'yellow'});
  }

}
