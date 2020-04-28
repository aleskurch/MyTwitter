package org.bsu.kurch.twitter.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.bsu.kurch.twitter.DAO.DAO;
import org.bsu.kurch.twitter.DAO.Post;
import org.bsu.kurch.twitter.DAO.TwitsFilterForm;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@WebServlet("/tweets/search")
public class ServletPosts extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String json = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm a z"));
        TwitsFilterForm form = objectMapper.readValue(json, TwitsFilterForm.class);
        form.setSkip(Objects.requireNonNullElse(form.getSkip(), 0));
        form.setTop(Objects.requireNonNullElse(form.getTop(), 10));
        List<Post> result = DAO.getPosts().stream().filter(twit -> (form.getAuthor() == null || twit.getAuthor().equals(form.getAuthor())) &&
                (form.getFromDate() == null || twit.getCreatedAt().after(form.getFromDate()))
                && (form.getUntilDate() == null || twit.getCreatedAt().before(form.getUntilDate()))
                && (form.getHashTags() == null || form.getHashTags().stream().filter(tag -> twit.getHashTags().contains(tag)).count() == form.getHashTags().size()))
                .skip(form.getSkip()).limit(form.getTop()).collect(Collectors.toList());
        response.getWriter().write(objectMapper.writeValueAsString(result));
    }
}