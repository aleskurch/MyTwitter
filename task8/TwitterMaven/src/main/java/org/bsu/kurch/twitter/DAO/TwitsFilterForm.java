package org.bsu.kurch.twitter.DAO;

import java.util.Date;
import java.util.List;

public class TwitsFilterForm {
    private Date fromDate;



    private Date untilDate;
    private Integer skip;
    private Integer top;
    private String author;

    public void setSkip(Integer skip) {
        this.skip = skip;
    }

    public void setTop(Integer top) {
        this.top = top;
    }
    public Integer getSkip() {
        return skip;
    }

    public Integer getTop() {
        return top;
    }

    private List<String> hashTags;


    public Date getFromDate() {
        return fromDate;
    }

    public Date getUntilDate() {
        return untilDate;
    }

    public String getAuthor() {
        return author;
    }

    public List<String> getHashTags() {
        return hashTags;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public void setUntilDate(Date untilDate) {
        this.untilDate = untilDate;
    }


    public void setAuthor(String author) {
        this.author = author;
    }

    public void setHashTags(List<String> hashTags) {
        this.hashTags = hashTags;
    }
}
