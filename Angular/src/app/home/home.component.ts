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

  constructor(
    private podcastService: PodcastService, 
    private router: Router, 
    private userService: UserService) {}

  ngOnInit() {
    this.podcastService.getAllPodcasts();
    this.podcastService.podcastsListChanged.subscribe((podcastsList: Link[]) => {
      this.podcasts = podcastsList;
    })
    this.userService.isSignedIn.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }

  viewPodcast(title: string) {
    this.router.navigate([`/podcast/${title}`]);
  }

  getAll() {
    this.podcastService.getAllPodcasts();
  }

}
