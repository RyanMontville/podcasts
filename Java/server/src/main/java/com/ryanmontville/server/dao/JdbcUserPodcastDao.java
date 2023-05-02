package com.ryanmontville.server.dao;

import com.ryanmontville.server.model.Podcast;
import com.ryanmontville.server.model.Subscription;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcUserPodcastDao implements UserPodcastDao {
    private final JdbcTemplate jdbcTemplate;

    public JdbcUserPodcastDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Podcast> getPodcastsForUserId(int userId) {
        List<Podcast> podcasts = new ArrayList<>();
        String sql = "SELECT podcasts.podcast_id, color, param_string, podcast_url, podcast_title, podcast_image " +
                "FROM public.user_podcast " +
                "JOIN public.podcasts on user_podcast.podcast_id = podcasts.podcast_id " +
                "JOIN public.users on user_podcast.user_id = users.user_id " +
                "WHERE users.user_id=?;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql,userId);
        while (results.next()){
            podcasts.add(mapRowToPodcast(results));
        }
        return podcasts;
    }

    @Override
    public Podcast getPodcastByUserIdAndParamString(int userId, String paramString) {
        Podcast podcast = null;
        String sql = "SELECT podcasts.podcast_id, color, param_string, podcast_url, podcast_title, podcast_image " +
                "FROM public.user_podcast " +
                "JOIN public.podcasts on user_podcast.podcast_id = podcasts.podcast_id " +
                "JOIN public.users on user_podcast.user_id = users.user_id " +
                "WHERE users.user_id=? AND podcasts.param_string=?;";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,userId,paramString);
        if(result.next()) {
            podcast = mapRowToPodcast(result);
        }
        return  podcast;
    }

    @Override
    public int subscribeToPodcast(Subscription subscription) {
        String sql = "INSERT INTO public.user_podcast(user_id, podcast_id, color) VALUES (?, ?, ?) RETURNING user_id;";
        Integer user_id = jdbcTemplate.queryForObject(sql,Integer.class, subscription.getUserId(), subscription.getPodcastId(), subscription.getPodcastColor());
        return user_id;
    }

    private Podcast mapRowToPodcast(SqlRowSet rowSet) {
        Podcast podcast = new Podcast();
        podcast.setPodcastId(rowSet.getInt("podcast_id"));
        podcast.setParamString(rowSet.getString("param_string"));
        podcast.setUserId(0);
        podcast.setPodcastUrl(rowSet.getString("podcast_url"));
        podcast.setPodcastTitle(rowSet.getString("podcast_title"));
        podcast.setPodcastImage(rowSet.getString("podcast_image"));
        podcast.setPodcastColor(rowSet.getString("color"));
        return podcast;
    }
}
