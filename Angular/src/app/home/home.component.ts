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

  viewPodcast(title: string) {
    let str = title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate([`/podcast/${str}`]);
  }

}
