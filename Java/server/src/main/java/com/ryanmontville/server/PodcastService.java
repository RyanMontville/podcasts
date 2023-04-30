package com.ryanmontville.server;

import com.ryanmontville.server.model.Podcast;
import org.apache.http.HttpEntity;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.charset.Charset;

public class PodcastService {
    private String baseUrl = "https://api.rss2json.com/v1/api.json?rss_url=";
    private String apiKey = "&api_key=oknfgwjsm1rg6qymitppclwvg60z4ml7at0g1be1";
    public Podcast getPodcast(String podcastUrl) throws URISyntaxException, IOException {
        String apiEndPoint= baseUrl + podcastUrl + apiKey;
        StringBuilder requestBuilder=new StringBuilder(apiEndPoint);
        URIBuilder builder = new URIBuilder(requestBuilder.toString());
        HttpGet get = new HttpGet(builder.build());

        CloseableHttpClient httpclient = HttpClients.createDefault();

        CloseableHttpResponse response = httpclient.execute(get);

        String rawResult=null;

        try {
            if (response.getStatusLine().getStatusCode() != HttpStatus.SC_OK) {
                System.out.printf("Bad response status code: ", response.getStatusLine().getStatusCode());
            }
            HttpEntity entity = response.getEntity();
            if (entity != null) {
                rawResult=EntityUtils.toString(entity, Charset.forName("utf-8"));
            }
        } finally {
            response.close();
        }

        JSONObject obj = new JSONObject(rawResult);
        Podcast podcast = new Podcast();
        JSONObject feed = obj.getJSONObject("feed");
        podcast.setPodcastId(0);
        podcast.setPodcastUrl(podcastUrl);
        podcast.setPodcastTitle(feed.getString("title"));
        podcast.setPodcastImage((feed.getString("image")));

        return podcast;
    }

}
