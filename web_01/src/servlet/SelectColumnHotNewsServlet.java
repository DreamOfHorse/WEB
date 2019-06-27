package servlet;

import bean.News;
import com.alibaba.fastjson.JSON;
import dao.ConnDB;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "SelectColumnHotNewsServlet", urlPatterns = "/SelectColumnHotNewsServlet")
public class SelectColumnHotNewsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        ArrayList<News> list = new ArrayList<News>();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");
        PrintWriter out = response.getWriter();
        int cid=0;
        String columnname = request.getParameter("columnname");
        try {
            cid=connDB.SelectColumnId(columnname);
            list = connDB.SelectColumnHotNews(cid);
            String hotnews = JSON.toJSONString(list);
            out.write(hotnews);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
