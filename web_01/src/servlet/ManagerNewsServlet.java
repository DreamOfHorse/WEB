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

@WebServlet(name = "ManagerNewsServlet", urlPatterns = "/ManagerNewsServlet")
public class ManagerNewsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<News> nlist=new ArrayList<News>();
        ConnDB connDB=new ConnDB();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");         //放到下面会解析失败
        PrintWriter out = response.getWriter();
        int cid =0;
        int uid = Integer.parseInt(request.getParameter("id"));      //获取前端数据
        try {
            cid = connDB.SelectUserColumn(uid);
            nlist=connDB.SelectManagerNews(cid);
            String resultNews = JSON.toJSONString(nlist);
            out.write(resultNews);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}