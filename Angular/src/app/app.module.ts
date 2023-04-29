import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastService } from './podcast.service';
import { AddPodcastComponent } from './add-podcast/add-podcast.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PodcastDetailComponent,
    AddPodcastComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PodcastService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
