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
import java.util.ArrayList;

@WebServlet(name = "SelectColumnNameServlet", urlPatterns = "/SelectColumnNameServlet")
public class SelectColumnNameServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ConnDB connDB=new ConnDB();
        ArrayList list = new ArrayList();
        String jslist;
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/html,charset=utf-8");         //放到下面会解析失败
        PrintWriter out = response.getWriter();
        try {
            list=connDB.SelectColumnName();
            jslist = JSON.toJSONString(list);
            out.write(jslist);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        out.flush();
        out.close();
    }
}
