package servlet;

import dao.ConnDB;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

@WebServlet(name = "AddClickServlet", urlPatterns = "/AddClickServlet")
public class AddClickServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");         //放到下面会解析失败
        String title = request.getParameter("title");
        try {
            connDB.AddClick(title);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
