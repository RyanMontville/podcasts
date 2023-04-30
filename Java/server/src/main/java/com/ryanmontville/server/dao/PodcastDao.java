package com.ryanmontville.server.dao;

import com.ryanmontville.server.model.Podcast;

import java.util.List;

public interface PodcastDao {
    List<Podcast> getAllPodcasts();
    Podcast getPodcastById(int podcastId);
    Podcast getPodcastByTitle(String podcastTitle);
    Podcast getPodcastByUrl(String podcastUrl);
    String getPocastUrlFromTitle(String podcastTitle);
    int addNewPodcast(Podcast newPodcast);

}
