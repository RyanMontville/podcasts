import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { AddPodcastComponent } from './add-podcast/add-podcast.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { SubscribeComponent } from './subscribe/subscribe.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'podcast/:id', component: PodcastDetailComponent},
  {path: 'subscription/:id', component: SubscriptionDetailComponent},
  {path: 'subscribe', component: SubscribeComponent},
  {path: 'add', component: AddPodcastComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
