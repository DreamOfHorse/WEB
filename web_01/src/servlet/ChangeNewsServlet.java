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

@WebServlet(name = "ChangeNewsServlet", urlPatterns = "/ChangeNewsServlet")
public class ChangeNewsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");
        PrintWriter out = response.getWriter();
        String success = "{\"message\":\"success\"}";
        int uid=0;
        int id = Integer.parseInt(request.getParameter("newsid"));
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String data = request.getParameter("data");
        String username = request.getParameter("username");
        try {
                if(content.indexOf("<img")!=-1)
                {
                    uid=connDB.VerifyUser(username);
                    String str[] = content.split("src=")[1].split("\"");        //获取url的地址
                    connDB.ChangeNews(id,title,content,data,uid,str[1]);
                }
                else{
                    uid=connDB.VerifyUser(username);
                    connDB.ChangeNews(id,title,content,data,uid,"null");
                }
            out.write(success);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
