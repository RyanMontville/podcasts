import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PodcastService } from '../podcast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-podcast',
  templateUrl: './add-podcast.component.html',
  styleUrls: ['./add-podcast.component.css']
})
export class AddPodcastComponent implements OnInit {
  podcastUrl: string = "";
  podcastTitle: string = "";
  statusMessage: { message: string, color: string } = { message: '', color: '' };
  color: string = 'white';

  constructor(private podcastService: PodcastService, private router: Router) { }
  ngOnInit() {
    this.podcastService.errorMessage.subscribe(error => {
      this.statusMessage = { message: error, color: 'alert alert-danger' };
    });
    this.podcastService.newestPodcastTitle.subscribe(title => {
      this.podcastTitle = title;
      if (title.length > 0) {
        this.statusMessage = { message: `${title} has been added to database.`, color: 'alert alert-success' };
        setTimeout(() => {
          this.podcastService.newestPodcastTitle.next('');
          this.router.navigate(['/']);
        }, 2000)
      }
    })
  }

  onSubmit(f: NgForm) {
    if (f.value.podcastUrl.length === 0) {
      this.statusMessage = { message: 'Please enter a url.', color: 'alert alert-danger' }
    } else {
      this.podcastUrl = f.value.podcastUrl;
      this.podcastService.addPodcast(f.value.podcastUrl);
      this.statusMessage = { message: `Searching for ${f.value.podcastUrl}`, color: 'alert alert-warning' };
    }
  }
}
