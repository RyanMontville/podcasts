package com.ryanmontville.server.controller;

import com.ryanmontville.server.PodcastService;
import com.ryanmontville.server.dao.JdbcPodcastDao;
import com.ryanmontville.server.model.Podcast;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class PodcastController {
    private JdbcPodcastDao podcastDao;
    private PodcastService podcastService = new PodcastService();
    public PodcastController(JdbcPodcastDao podcastDao) {
        this.podcastDao = podcastDao;
    }
    /*************************************** GETS **************************************/
    @RequestMapping(path = "/podcasts", method = RequestMethod.GET)
    public List<Podcast> getAllPodcasts() {
        return podcastDao.getAllPodcasts();
    }

    @RequestMapping(path = "/podcasts/{podcastId}", method = RequestMethod.GET)
    public Podcast getPodcastById(@PathVariable int podcastId) {
        Podcast podcast = podcastDao.getPodcastById(podcastId);
        if(podcast==null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Podcast not found.");
        } else {
            return podcast;
        }
    }

    @RequestMapping(path = "/podUrl/{paramString}", method = RequestMethod.GET)
    public String getUrlFromParam(@PathVariable String paramString) {
        String url = podcastDao.getPocastUrlFromTitle(paramString);
        if(url == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Podcast not found.");
        } else {
            return url;
        }
    }

    /*************************************** POST **************************************/
    @RequestMapping(path = "/podcasts", method = RequestMethod.POST)
    public Podcast addNewPodcast(@RequestBody String podcastUrl) throws Exception {
        Podcast podcastCheck = podcastDao.getPodcastByUrl(podcastUrl);
        if(podcastCheck!=null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Podcast already in database.");
        } else {
            Podcast newPodcast = podcastService.getPodcast(podcastUrl);
            int podcastId = podcastDao.addNewPodcast(newPodcast);
            return podcastDao.getPodcastById(podcastId);
        }
    }
    /*************************************** PUTS **************************************/
    /************************************* DELETES *************************************/
}
