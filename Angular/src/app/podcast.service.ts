import { Injectable } from "@angular/core";
import { Link } from "./Link.model";
import { Podcast } from "./Podcast.model";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable()
export class PodcastService {
    private podcasts: Link[] = [];
    public errorMessage = new BehaviorSubject<string>('');
    public newestPodcastTitle = new BehaviorSubject<string>('');
    public currentUrl = new Subject<string>();
    public currentPodcast = new Subject<Podcast>();
    public podcastsListChanged = new Subject<Link[]>();

    constructor(private http: HttpClient) { }

    addPodcast(podcastUrl: string) {
        this.http.post<Link>('http://localhost:9000/podcasts', podcastUrl).subscribe(data => {
            this.newestPodcastTitle.next(data.podcastTitle);
            this.getAllPodcasts();
        }, error => {
            this.errorMessage.next(error.error.message);
        });
    }

    getAllPodcasts() {
        this.http.get<Link[]>('http://localhost:9000/podcasts').subscribe(data => {
            this.podcastsListChanged.next(data);
        });
    }

    getUrl(paramString: string) {
        this.http.get(`http://localhost:9000/podUrl/${paramString}`,{responseType: 'text'}).subscribe(string => {
            this.currentUrl.next(string);
        }, error => {
            this.errorMessage.next(JSON.stringify(error));
        });
    }

    getPodcast(podcastUrl: string) {
        let podcast = new Podcast();
        this.http.get<Podcast>(`https://api.rss2json.com/v1/api.json?rss_url=${podcastUrl}&api_key=oknfgwjsm1rg6qymitppclwvg60z4ml7at0g1be1`).subscribe(data => {
                podcast = data;
                this.currentPodcast.next(data);
            });
            return podcast;
    }


}