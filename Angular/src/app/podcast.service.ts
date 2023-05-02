import { Injectable } from "@angular/core";
import { Link } from "./Link.model";
import { Podcast } from "./Podcast.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class PodcastService {
    private podcasts: Link[] = [];
    public unsubbed = new Subject<{podcastId:number,podcastTitle:string}[]>();
    public errorMessage = new BehaviorSubject<string>('');
    public newestPodcastTitle = new BehaviorSubject<string>('');
    public currentUrl = new Subject<string>();
    public currentPodcast = new Subject<Podcast>();
    public podcastsListChanged = new Subject<Link[]>();
    public podcastColor = new Subject<string>();

    constructor(
        private http: HttpClient,
        private router: Router) { }

    getAllPodcasts() {
        this.http.get<Link[]>('http://localhost:9000/podcasts').subscribe(data => {
            this.podcastsListChanged.next(data);
        });
    }

    getPodcastsForUser(userId: number) {
        this.http.get<Link[]>(`http://localhost:9000/subscriptions/${userId}`).subscribe(data => {
            this.podcastsListChanged.next(data);
        })
    }

    getUnsubbedForUser(userId: number) {
        this.http.get<{podcastId:number,podcastTitle:string}[]>(`http://localhost:9000/NotSubscribed/${userId}`).subscribe(data => {
            this.unsubbed.next(data);
        })
    }

    getPodcast(podcastUrl: string) {
        let podcast = new Podcast();
        this.http.get<Podcast>(`https://api.rss2json.com/v1/api.json?rss_url=${podcastUrl}&api_key=oknfgwjsm1rg6qymitppclwvg60z4ml7at0g1be1`).subscribe(data => {
                podcast = data;
                this.currentPodcast.next(data);
            });
            return podcast;
    }

    getUrl(paramString: string) {
        this.http.get(`http://localhost:9000/podUrl/${paramString}`,{responseType: 'text'}).subscribe(string => {
            this.currentUrl.next(string);
        }, error => {
            this.errorMessage.next(JSON.stringify(error));
        });
    }

    getUrlAnColor(userId: number, paramString: string) {
        this.http.get<Link>(`http://localhost:9000/subscriptions/${userId}/${paramString}`).subscribe(data =>{
            this.currentUrl.next(data.podcastUrl);
            this.podcastColor.next(data.podcastColor);
        }, error => {
            this.errorMessage.next(JSON.stringify(error));
        });
    }

    addPodcast(podcastUrl: string) {
        this.http.post<Link>('http://localhost:9000/podcasts', podcastUrl).subscribe(data => {
            this.newestPodcastTitle.next(data.podcastTitle);
            this.getAllPodcasts();
        }, error => {
            this.errorMessage.next(error.error.message);
        });
    }

    subscribeToPodcast(userId: number, podcastId: number, color: string) {
        let hasSubscribed: boolean = false;
        this.http.post<boolean>('http://localhost:9000/subscribe',{userId: userId, podcastId: podcastId, podcastColor: color}).subscribe(data => {
            if(data) {
                this.router.navigate(['']);
            }
        });

        return hasSubscribed;
    }
}