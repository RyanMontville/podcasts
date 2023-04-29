import { Component, Input } from '@angular/core';
import { Link } from '../Link.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  backgroundColor: string = "";
  color: string = "";
  @Input() set podcast(value: Link){
    this.backgroundColor = value.color;
  }

}
