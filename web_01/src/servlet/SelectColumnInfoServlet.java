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

@WebServlet(name = "SelectColumnInfoServlet", urlPatterns = "/SelectColumnInfoServlet")
public class SelectColumnInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        ArrayList<News> list = new ArrayList<News>();
        String columninfo;
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");         //放到下面会解析失败
        PrintWriter out = response.getWriter();
        try {
            list=connDB.SelectColumnInfo();
            System.out.println(list);
            columninfo = JSON.toJSONString(list);
            out.write(columninfo);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
