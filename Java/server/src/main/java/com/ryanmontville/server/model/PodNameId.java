package com.ryanmontville.server.model;

public class PodNameId {
    private int podcastId;
    private String podcastTitle;

    public PodNameId(int podcastId, String podcastTitle) {
        this.podcastId = podcastId;
        this.podcastTitle = podcastTitle;
    }
    public int getPodcastId() { return podcastId; }
    public String getPodcastTitle() { return podcastTitle; }
}
