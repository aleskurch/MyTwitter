package org.bsu.kurch.twitter.DAO;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class Post {
    private int id;
    private String description;
    public Date createdAt;
    private String author;
    private String photoLink;
    private List<String> hashTags;
    private List<String> likes;

    public Post() {
        this.description = "";
        this.author = "";
        this.photoLink = "";
        this.hashTags = new ArrayList<>();
        this.likes = new ArrayList<>();
    }

    Post(int id, String description, String author, String photoLink, List<String> hashTags, List<String> likes) {
        this.id = id;
        this.description = description;
        this.createdAt = new Date();
        this.author = author;
        this.photoLink = photoLink;
        this.hashTags = new ArrayList<>(hashTags);
        this.likes = new ArrayList<>(likes);
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPhotoLink(String photoLink) {
        this.photoLink = photoLink;
    }

    public void setHashTags(ArrayList<String> hashTags) {
        this.hashTags = hashTags;
    }

    public void setLikes(ArrayList<String> likes) {
        this.likes = likes;
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getPhotoLink() {
        return photoLink;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public List<String> getLikes() {
        return likes;
    }
}
