package com.ryanmontville.server.dao;

import com.ryanmontville.server.model.Podcast;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JdbcPodcastDao implements PodcastDao {
    private final JdbcTemplate jdbcTemplate;
    public JdbcPodcastDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Podcast> getAllPodcasts() {
        List<Podcast> podcasts = new ArrayList<>();
        String sql = "SELECT podcast_id, podcast_url, podcast_title, podcast_image FROM public.podcasts ORDER BY podcast_title ASC;";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql);
        while (results.next()){
            podcasts.add(mapRowToPodcast(results));
        }
        return podcasts;
    }

    @Override
    public Podcast getPodcastById(int podcastId) {
        Podcast podcast = null;
        String sql = "SELECT podcast_id, podcast_url, podcast_title, podcast_image FROM public.podcasts WHERE podcast_id=?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,podcastId);
        if(result.next()){
            podcast = mapRowToPodcast(result);
        }
        return podcast;
    }

    @Override
    public Podcast getPodcastByTitle(String podcastTitle) {
        Podcast podcast = null;
        String sql = "SELECT podcast_id, podcast_url, podcast_title, podcast_image FROM public.podcasts WHERE podcast_title=?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,podcastTitle);
        if(result.next()){
            podcast = mapRowToPodcast(result);
        }
        return podcast;
    }

    @Override
    public Podcast getPodcastByUrl(String podcastUrl) {
        Podcast podcast = null;
        String sql = "SELECT podcast_id, podcast_url, podcast_title, podcast_image FROM public.podcasts WHERE podcast_url=?";
        SqlRowSet result = jdbcTemplate.queryForRowSet(sql,podcastUrl);
        if(result.next()){
            podcast = mapRowToPodcast(result);
        }
        return podcast;
    }

    @Override
    public int addNewPodcast(Podcast newPodcast) {
        String sql = "INSERT INTO public.podcasts(podcast_url, podcast_title, podcast_image) VALUES (?, ?, ?) RETURNING podcast_id;";
        Integer podcastId = jdbcTemplate.queryForObject(sql,Integer.class,newPodcast.getPodcastUrl(),newPodcast.getPodcastTitle(),newPodcast.getPodcastImage());
        return podcastId;
    }

    private Podcast mapRowToPodcast(SqlRowSet rowSet) {
        Podcast podcast = new Podcast();
        podcast.setPodcastId(rowSet.getInt("podcast_id"));
        podcast.setUserId(0);
        podcast.setPodcastUrl(rowSet.getString("podcast_url"));
        podcast.setPodcastTitle(rowSet.getString("podcast_title"));
        podcast.setPodcastImage(rowSet.getString("podcast_image"));
        podcast.setPodcastColor("");
        return podcast;
    }
}
