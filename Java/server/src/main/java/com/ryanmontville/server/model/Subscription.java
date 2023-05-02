package com.ryanmontville.server.model;

public class Subscription {
    private int userId;
    private int podcastId;
    private String podcastColor;

    public Subscription(int userId, int podcastId, String podcastColor) {
        this.userId = userId;
        this.podcastId = podcastId;
        this.podcastColor = podcastColor;
    }

    public int getUserId() {
        return userId;
    }

    public int getPodcastId() {
        return podcastId;
    }

    public String getPodcastColor() {
        return podcastColor;
    }
}
