import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Link } from "./Link.model";

@Injectable()
export class PodcastService {
    private podcasts: Link[] = [
        {url: 'https://access.acast.com/rss/6098240e96965e712accd5a0/default', title: 'Chris and Jacks Podcast Pilots the Podcast', color: 'blue', image: 'https://assets.pippa.io/shows/6098240e96965e712accd5a0/1620589061490-a0147663cd7d2de70f7677c8a881a6e4.jpeg'},
        {url: 'https://feeds.simplecast.com/9YNI3WaL', title: 'Dear Hank and John', color: 'black', image: 'https://image.simplecastcdn.com/images/2dcfae8f-b2e0-4826-a483-1306d3b8be06/d8c21569-e9eb-41d5-b1d0-70d9ea0c8ddc/3000x3000/dhj-podcastartwork-2021-v1.jpg?aid=rss_feed'},
        { url: 'https://feeds.soundcloud.com/users/soundcloud:users:565312434/sounds.rss', title: 'Evan and Katelyn Podcast', color: 'yellow', image: 'https://i1.sndcdn.com/avatars-000559869981-r582jo-original.jpg' },
        { url: 'https://audioboom.com/channels/5097784.rss', title: 'Lateral', color: 'red', image: 'https://images.theabcdn.com/i/40211109.jpg'},
        { url: 'https://feeds.simplecast.com/wjQvYtdl', title: 'My Brother My Brother and Me', color: 'blue', image: 'https://image.simplecastcdn.com/images/9ba52d4c-4e8c-4203-a3de-be89969671f2/13b53677-6ef7-4079-a079-80814f584e14/3000x3000/mbmbam-cover-final.jpg?aid=rss_feed' },
        {url: 'https://rss.art19.com/off-book', title: 'Off Book', color: 'pink', image: 'https://content.production.cdn.art19.com/images/8e/4c/80/a5/8e4c80a5-41f1-437e-8ee8-f770b7d6ae1a/1eeab7826eae1782f93489c2de918796aecf02830220c57b8ecb20c28107a2025c7eb75c591af9bfe447ee4e0cb058f290f5f263c874ece2a1559fd65c7f55b6.jpeg'},
        {url: 'https://feeds.acast.com/public/shows/project-for-awesome', title: 'Project For Awesome 2023', color: 'blue', image: 'https://assets.pippa.io/shows/63fd1c0e23b1ae0011f47baf/1677532559987-c7d690e8f661333b75e420fc8e40ec04.jpeg'},
        { url: 'https://feeds.redcircle.com/c6d2e869-22ae-4e68-b88e-e1957d070d3a?_gl=1*10o0nb8*_ga*MTAzNjcwMDQzMy4xNjgyNjA1ODY0*_ga_KVZ47LYJWW*MTY4MjYwNTg2My4xLjAuMTY4MjYwNTg2My4wLjAuMA', title: 'Safety Third', color: 'red', image: 'https://media.redcircle.com/images/2022/11/17/18/12e55717-79bf-4a3c-a931-f3b378040200_7a2c_26287f31-c43b-4de1-b1f1-edb1d0f2e45d_blob.jpg' },
        {url: 'https://feeds.simplecast.com/y1LF_sn2', title: 'Sawbones: A Marital Tour of Misguided Medicine', color: 'red', image: 'https://image.simplecastcdn.com/images/a5445fde-0e70-4659-8f18-442f9aabbaac/f24cf20c-122b-425f-a782-cc2aecad305c/3000x3000/sawbones-logo-final.png?aid=rss_feed'},
        {url: 'https://feeds.simplecast.com/rRcaqFt4', title: 'Shmanners', color: 'red', image: 'https://image.simplecastcdn.com/images/febf6ef8-64a9-4109-b5bd-bfb5a5777fdd/8f003076-b14d-496f-8527-32948b639faf/3000x3000/shmanners-cover.jpg?aid=rss_feed'},
        { url: 'https://feeds.simplecast.com/n8ppsCKR', title: 'Still Buffering', color: 'pink', image: 'https://image.simplecastcdn.com/images/a796dd11-8395-4b3e-80e8-afef3d18659b/952680a9-4fdd-419e-ba92-65286c2734fc/3000x3000/img-3776.jpg?aid=rss_feed' },
        {url: 'https://feeds.simplecast.com/Urk3897_', title: 'The Besties', color: 'yellow', image: 'https://image.simplecastcdn.com/images/c707e48c-0e5b-4dcd-a183-3a248de67b6e/7d2885c6-c8b8-4219-86b2-af9baf9846e9/3000x3000/uploads-2f1591280888546-ig2f96xefmo-c923c56fc6d3137dfa2f3f8b5ffc7a49-2fbesties-art-itunes.jpg?aid=rss_feed'},
        {url: 'https://feeds.simplecast.com/w1teXNny', title: 'Wonderful!', color: 'blue', image: 'https://image.simplecastcdn.com/images/e1752b59-1c8e-4cc6-bfb6-e7115375c887/a81ebc58-5e76-4cd8-b779-4295bae7ab29/3000x3000/wonderful-cover-art-final.png?aid=rss_feed'},
        //{url: 'urlword', title: 'titleword', color: 'colorword', image: 'imageword'},
    ];

    addPodcast(podcast: Link) {
        this.podcasts.push(podcast);
    }

    getAllPodcasts() {
        return this.podcasts;
    }

    getPodcast(title: string): Link {
        let podcast = this.podcasts.find((podcast: Link) => {
            return podcast.title.toLowerCase() == title;
        });
        if (podcast) {
            return podcast;
        } else {
            return { url: '', title: 'Error', color: 'red', image: '' };
        }

    }


}