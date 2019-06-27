package servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "VerifyServlet", urlPatterns = "/VerifyServlet")
public class VerifyServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        String uname = (String) session.getAttribute("username");       //获取sessionusername
        String username = request.getParameter("username");
        response.setHeader("content-type", "text/html;charset=UTF-8");//设置编码
        String success = "{\"message\":\"yes\"}";
        String fail = "{\"message\":\"no\"}";
        PrintWriter out = response.getWriter();
        if(uname.equals(username))
            out.print(success);
        else
            out.print(fail);
        out.flush();
        out.close();
    }
}
