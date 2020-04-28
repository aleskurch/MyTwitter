package org.bsu.kurch.twitter.servlets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.bsu.kurch.twitter.DAO.DAO;
import org.bsu.kurch.twitter.DAO.Post;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

@WebServlet("/tweets")
public class Servlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm a z"));
        String json = objectMapper.writeValueAsString(DAO.getPosts().get(Integer.parseInt(id)-1));
        if (DAO.getPosts().size() < Integer.parseInt(id)) {
            throw new IOException("No post with such id");
        } else
            response.getWriter().write(json);
    }
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String id = request.getParameter("id");
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm a z"));
        String json = objectMapper.writeValueAsString(DAO.getPosts().get(Integer.parseInt(id)-1));
        if (DAO.getPosts().size() < Integer.parseInt(id)) {
            throw new IOException("No post with such id");
        } else{
            response.getWriter().write(json+"Deleted");
            DAO.getPosts().remove(Integer.parseInt(id)-1);
        }
    }
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String json = request.getReader().lines().reduce("", (accumulator, actual) -> accumulator + actual);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm a z"));
        Post postNew = objectMapper.readValue(json, Post.class);
        postNew.setId(DAO.getPosts().size()+1);
        postNew.setCreatedAt(new Date());
        DAO.getPosts().add(postNew);
    }
}