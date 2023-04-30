import { Injectable } from "@angular/core";
import { Link } from "./Link.model";
import { Podcast } from "./Podcast.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class PodcastService {
    private podcasts: Link[] = [];
    public errorMessage = new BehaviorSubject<string>('');
    public newestPodcastTitle = new BehaviorSubject<string>('');

    constructor(private http: HttpClient) { }

    addPodcast(podcastUrl: string) {
        this.http.post<Link>('http://localhost:9000/podcasts',podcastUrl).subscribe(data => {
            this.newestPodcastTitle.next(data.podcastTitle);
            this.getAllPodcasts();
        }, error => {
            this.errorMessage.next(error.error.message);
        });
    }

    getAllPodcasts() {
        this.http.get<Link[]>('http://localhost:9000/podcasts').subscribe(data => {
            this.podcasts = data;
        });
        return this.podcasts.slice();
    }

    getPodcast(title: string): Link {
        let podcast = this.podcasts.find((podcast: Link) => {
            return podcast.podcastTitle.toLowerCase() == title;
        });
        if (podcast) {
            return podcast;
        } else {
            return {podcastId: 0, podcastUrl: '', podcastTitle: 'Error', podcastImage: '' };
        }

    }


}