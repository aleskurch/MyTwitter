package org.bsu.kurch.twitter.DAO;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class DAO {
    private static ArrayList<Post> Posts=new ArrayList<>();
    public DAO() {
        for (int i=0; i<20; i++){
        Post post=new Post(i+1,
                "post"+(i+1),
                "Mr"+(i+1),
                "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                Arrays.asList("roses", "poetry", "violets"),
                Arrays.asList("Shakespeare", "Me"));
        Posts.add(post);
        }
    }
    public static ArrayList<Post> getPosts() {
        if(Posts.isEmpty())
            new DAO();
        return Posts;
    }


}
