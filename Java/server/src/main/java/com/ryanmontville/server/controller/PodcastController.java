package com.ryanmontville.server.controller;

import com.ryanmontville.server.PodcastService;
import com.ryanmontville.server.dao.JdbcPodcastDao;
import com.ryanmontville.server.dao.JdbcUserDao;
import com.ryanmontville.server.dao.JdbcUserPodcastDao;
import com.ryanmontville.server.model.PodNameId;
import com.ryanmontville.server.model.Podcast;
import com.ryanmontville.server.model.Subscription;
import com.ryanmontville.server.model.User;
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
    private JdbcUserPodcastDao userPodcastDao;
    private JdbcUserDao userDao;
    private PodcastService podcastService = new PodcastService();
    public PodcastController(JdbcPodcastDao podcastDao, JdbcUserPodcastDao userPodcastDao, JdbcUserDao userDao) {
        this.podcastDao = podcastDao;
        this.userPodcastDao = userPodcastDao;
        this.userDao = userDao;
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

    @RequestMapping(path = "/subscriptions/{userId}/{paramString}", method = RequestMethod.GET)
    public Podcast getPodcastFromUserIdAndPodcastID(@PathVariable int userId, @PathVariable String paramString) {
        Podcast podcast = null;
        podcast = userPodcastDao.getPodcastByUserIdAndParamString(userId,paramString);
        if(podcast == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not subscribed");
        } else {
            return podcast;
        }
    }

    @RequestMapping(path = "/subscriptions/{userId}", method = RequestMethod.GET)
    public List<Podcast> getPodcastsForUserId(@PathVariable int userId) {
        User userCheck = userDao.getUserById(userId);
        if(userCheck == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        } else {
            return userPodcastDao.getPodcastsForUserId(userId);
        }
    }

    @RequestMapping(path = "/NotSubscribed/{userId}", method = RequestMethod.GET)
    public List<PodNameId> getUnsubscribedPodcastsForUserId(@PathVariable int userId) {
        User userCheck = userDao.getUserById(userId);
        if(userCheck == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }
        List<Podcast> all = podcastDao.getAllPodcasts();
        List<Podcast> subscribed = userPodcastDao.getPodcastsForUserId(userId);
        List<PodNameId> unsubscribed = new ArrayList<>();
        for(Podcast podcast: all) {
            boolean isSubbed = false;
            for(Podcast pod: subscribed) {
                if(pod.getPodcastId() == podcast.getPodcastId()) {
                    isSubbed = true;
                }
            }
            if(!isSubbed) {
                unsubscribed.add(new PodNameId(podcast.getPodcastId(),podcast.getPodcastTitle()));
            }
        }
        return unsubscribed;
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

    @RequestMapping(path = "/subscribe", method = RequestMethod.POST)
    public boolean subscribeToPodcast(@RequestBody Subscription subscription) {
        User userCheck = userDao.getUserById(subscription.getUserId());
        Podcast podcastCheck = podcastDao.getPodcastById(subscription.getPodcastId());
        if(podcastCheck == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Podcast not found.");
        }
        if(userCheck == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        } else {
            int id = userPodcastDao.subscribeToPodcast(subscription);
            if(id>0) {
                return true;
            } else {
                return false;
            }
        }
    }
    /*************************************** PUTS **************************************/
    /************************************* DELETES *************************************/
}
