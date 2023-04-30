package com.ryanmontville.server.model;

public class Podcast {
    private int podcastId;
    private int userId;
    private String podcastUrl;
    private String podcastTitle;
    private String podcastImage;
    private String podcastColor;

    public Podcast() {}

    public int getPodcastId() {
        return podcastId;
    }

    public void setPodcastId(int podcastId) {
        this.podcastId = podcastId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getPodcastUrl() {
        return podcastUrl;
    }

    public void setPodcastUrl(String podcastUrl) {
        this.podcastUrl = podcastUrl;
    }

    public String getPodcastTitle() {
        return podcastTitle;
    }

    public void setPodcastTitle(String podcastTitle) {
        this.podcastTitle = podcastTitle;
    }

    public String getPodcastImage() {
        return podcastImage;
    }

    public void setPodcastImage(String image) {
        this.podcastImage = image;
    }

    public String getPodcastColor() {
        return podcastColor;
    }

    public void setPodcastColor(String color) {
        this.podcastColor = color;
    }
}


