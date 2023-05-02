package com.ryanmontville.server.dao;

import com.ryanmontville.server.model.Podcast;
import com.ryanmontville.server.model.Subscription;

import java.util.List;

public interface UserPodcastDao {
    List<Podcast> getPodcastsForUserId(int userId);

    Podcast getPodcastByUserIdAndParamString(int userId, String paramString);

    int subscribeToPodcast(Subscription subscription);
}
