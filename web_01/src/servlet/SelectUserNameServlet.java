package servlet;

import bean.User;
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

@WebServlet(name = "SelectUserNameServlet", urlPatterns = "/SelectUserNameServlet")
public class SelectUserNameServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");
        PrintWriter out = response.getWriter();
        ArrayList list= new ArrayList();
        try {
            list = connDB.SelectUserName();
            String usernameinfo = JSON.toJSONString(list);
            out.write(usernameinfo);                                        //返回管理员的姓名
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
