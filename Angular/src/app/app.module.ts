import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastService } from './podcast.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PodcastDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PodcastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
