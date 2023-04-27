import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Link } from "./Link.model";

@Injectable()
export class PodcastService {
    podcastsChanged = new Subject<Link[]>();
    private podcasts: Link[] = [
        {id: 0, url: 'https://feeds.simplecast.com/wjQvYtdl', title: 'My Brother My Brother and Me', color: 'blue'},
        {id: 1, url: 'https://feeds.simplecast.com/n8ppsCKR', title: 'Still Buffering', color: 'pink'},
        {id: 2, url: 'https://feeds.redcircle.com/c6d2e869-22ae-4e68-b88e-e1957d070d3a?_gl=1*10o0nb8*_ga*MTAzNjcwMDQzMy4xNjgyNjA1ODY0*_ga_KVZ47LYJWW*MTY4MjYwNTg2My4xLjAuMTY4MjYwNTg2My4wLjAuMA', title: 'Safety Third', color: 'red'},
        {id: 3, url: 'https://feeds.soundcloud.com/users/soundcloud:users:565312434/sounds.rss', title: 'Evan and Katelyn Podcast', color: 'yellow'}];

    addPodcast(podcast: Link) {
        this.podcasts.push(podcast);
        this.podcastsChanged.next(this.podcasts.slice());
    }

    getPodcast(id: number): Link {
        alert(id);
        let podcast = this.podcasts.find((podcast: Link) => {
            return podcast.id == id;
        });
        alert(JSON.stringify(podcast));
        if(podcast) {
            alert(podcast.title);
            return podcast;
        } else {
            return {id: 0, url:'',title: 'Error',color:'red'};
        }
        
    }

    
}