import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Link } from '../Link.model';
import { PodcastService } from '../podcast.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  podcasts: Link[] = [];
  username: string = "Ryan";
  isLoggedIn: boolean = false;
  podcastStringified: string = "";

  constructor(
    private podcastService: PodcastService, 
    private router: Router, 
    private userService: UserService) {}

  ngOnInit() {
    this.podcasts = this.podcastService.getAllPodcasts();
    this.userService.isSignedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  viewPodcast(title: string) {
    let str = title.replace(/\s+/g, '-').toLowerCase();
    this.router.navigate([`/podcast/${str}`]);
  }

  getAll() {
    let allPodcasts = this.podcastService.getAllPodcasts();
    this.podcasts = allPodcasts;
    this.podcastStringified = JSON.stringify(allPodcasts);
  }

}
