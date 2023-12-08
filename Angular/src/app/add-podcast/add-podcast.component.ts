import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PodcastService } from '../podcast.service';
import { Router } from '@angular/router';
import { Colors } from '../colors.array';
import { UserService } from '../user.service';

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
  chosenId: number = 0;
  chosenColor: string = '';
  userId: number = 0;
  colors = Colors;

  constructor(
    private podcastService: PodcastService, 
    private router: Router, 
    private userService: UserService) { }
  ngOnInit() {
    this.podcastService.errorMessage.subscribe(error => {
      this.statusMessage = { message: error, color: 'alert alert-danger' };
    });
    this.podcastService.newestPodcastTitle.subscribe(title => {
      this.podcastTitle = title;
      if (title.length > 0) {
        this.statusMessage = { message: `${title} has been added to database.`, color: 'alert alert-success' };
        setTimeout(() => {
          this.statusMessage = {message: '',color: ''};
        }, 2000)
      }
    });
    this.userId = this.userService.getUserId();
    this.podcastService.podcastId.subscribe(id => {
      this.chosenId = id;
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

  handleColorSelection(colorSelection: string){
    this.chosenColor = colorSelection;
    this.podcastService.newestPodcastTitle.next('');
    let hasSubscribed: boolean = this.podcastService.subscribeToPodcast(this.userId,this.chosenId,this.chosenColor);
  }
}
