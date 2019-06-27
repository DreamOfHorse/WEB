package servlet;

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

@WebServlet(name = "ManageUserServlet", urlPatterns = "/ManageUserServlet")
public class ManageUserServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");         //放到下面会解析失败
        PrintWriter out = response.getWriter();
        int flag;
        String jsflag;
        String username = request.getParameter("username");
        String nusername = request.getParameter("nusername");
        String nname = request.getParameter("nname");
        String npwd = request.getParameter("npwd");
        try {
            connDB.UpdateUser(username,nusername,nname,npwd);
            flag=connDB.VerifyUser(nusername);
            jsflag = JSON.toJSONString(flag);
            System.out.println(jsflag);
            out.write(jsflag);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
