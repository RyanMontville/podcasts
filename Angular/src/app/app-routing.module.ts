import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':id', component: PodcastDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
