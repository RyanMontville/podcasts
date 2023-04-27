import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Link } from '../Link.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  mbmbam: Link = {url: 'https://feeds.simplecast.com/wjQvYtdl', title: 'My Brother My Brother and Me', color: 'blue'};
  sb: Link = {url: 'https://feeds.simplecast.com/n8ppsCKR', title: 'Still Buffering', color: 'pink'};
  stp: Link = {url: 'https://feeds.redcircle.com/c6d2e869-22ae-4e68-b88e-e1957d070d3a?_gl=1*10o0nb8*_ga*MTAzNjcwMDQzMy4xNjgyNjA1ODY0*_ga_KVZ47LYJWW*MTY4MjYwNTg2My4xLjAuMTY4MjYwNTg2My4wLjAuMA', title: 'Safety Third', color: 'red'};
  eakp: Link = {url: 'https://feeds.soundcloud.com/users/soundcloud:users:565312434/sounds.rss', title: 'Evan and Katelyn Podcast', color: 'yellow'};
  dhaj: Link = {url: 'https://feeds.simplecast.com/9YNI3WaL', title: 'Dear Hank and John', color: 'yellow'};
  podcasts: Link[] = [this.mbmbam,this.sb,this.stp,this.eakp,this.dhaj];
}
