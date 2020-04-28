package org.bsu.kurch.twitter.servlets;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/get")
public class Servlet2 extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String name=request.getParameter("name");
        if(name.length()>100){
            throw new IOException("Too much simbols");
        }
        response.getWriter().write("Name is: "+name);
    }
}


