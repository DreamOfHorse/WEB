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

@WebServlet(name = "ReturnUserInfoServlet", urlPatterns = "/ReturnUserInfoServlet")
public class ReturnUserInfoServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        User user = new User();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");         //放到下面会解析失败
        PrintWriter out = response.getWriter();
        int uid = Integer.parseInt(request.getParameter("uid"));
        try {
            user=connDB.SelectLoginInfo(uid);
            String loginuserinfo = JSON.toJSONString(user);
            out.write(loginuserinfo);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
