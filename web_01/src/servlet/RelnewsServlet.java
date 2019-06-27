package servlet;

import bean.User;
import com.alibaba.fastjson.JSON;
import dao.ConnDB;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.ArrayList;

@WebServlet(name = "RelnewsServlet", urlPatterns = "/RelnewsServlet")
public class RelnewsServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");
        ConnDB connDB=new ConnDB();
        HttpSession session = request.getSession();
        User user = new User();
        int cid;
        PrintWriter out = response.getWriter();
        String title = request.getParameter("title");
        String content = request.getParameter("content");
        String data = request.getParameter("data");                         //获取前端信息
        int uid = Integer.parseInt(request.getParameter("uid"));
        try {
            if(uid==0)
            {
                cid = Integer.parseInt(request.getParameter("cid"));
                if(content.indexOf("<img")!=-1)
                {
                    String str[] = content.split("src=")[1].split("\"");        //获取url的地址
                    connDB.RelNews(title,content,data,str[1],uid,cid);
                }
                else{
                    connDB.RelNews(title,content,data,"null",uid,cid);
                }
            }
            else{
                if(content.indexOf("<img")!=-1)
                {
                    String str[] = content.split("src=")[1].split("\"");        //获取url的地址
                    cid=connDB.SelectUserColumn(uid);
                    connDB.RelNews(title,content,data,str[1],uid,cid);
                }
                else{
                    cid=connDB.SelectUserColumn(uid);
                    connDB.RelNews(title,content,data,"null",uid,cid);
                }
            }

            user=connDB.SelectLoginInfo(uid);                                      //查询登录者的信息
            String loginuserinfo = JSON.toJSONString(user);
            out.write(loginuserinfo);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }

}
