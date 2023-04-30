export class Podcast {
    public status: string;
    public feed: Feed;
    public items: Item[];

    constructor() {
        this.status = '';
        this.feed = new Feed('','','','','','');
        this.items = [];
    }

    public setStatus(status: string) {
        this.status = status;
    }

    public setFeed(feed: Feed) {
        this.feed = feed;
    }

    public setItems(items: Item[]) {
        this.items = items;
    }
}

export class Feed {
    constructor(
        public url: string, 
        public title: string, 
        public link: string, 
        public author: string, 
        public description: string,
        public image: string) {}
}

export class Item {
    constructor(
        public title: string, 
        public pubDate: string, 
        public link: string, 
        public guid: string, 
        public author: string, 
        public thumbnail: string, 
        public description: string, 
        public content: string, 
        public enclosure: Enclosure, 
        public categories: string) {}
}

export class Enclosure {
    constructor(
        public link: string, 
        public length: string, 
        public duration: string, 
        public rating: Rating) {}
}

export class Rating {
    constructor(public scheme: string, 
        public value: string) {}
}