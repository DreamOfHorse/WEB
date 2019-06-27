package servlet;

import bean.User;
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

@WebServlet(name = "AdduserServlet", urlPatterns = "/AdduserServlet")
public class AdduserServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");
        ConnDB connDB=new ConnDB();
        PrintWriter out = response.getWriter();
        String success = "{\"message\":\"success\"}";
        String fail = "{\"message\":\"fail\"}";
        String addusername = request.getParameter("addusername");
        String addname = request.getParameter("addname");
        String addpwd = request.getParameter("addpwd");
        int usercolumn = Integer.parseInt(request.getParameter("usercolumn"));
        try {
            if(connDB.DistUser(usercolumn,addusername)==0)                           //不存在相同的用户
            {
                connDB.AddUser(usercolumn,addusername,addname,addpwd);
                out.write(success);
            }
            else
            {
                out.write(fail);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
