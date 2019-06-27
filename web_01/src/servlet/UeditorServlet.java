package servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "UeditorServlet", urlPatterns = "/UeditorServlet")
public class UeditorServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        //拿到编辑器的内容
        String content = request.getParameter("editorValue");
        System.out.println(content);
        String str[] = content.split("src=")[1].split("\"");            //获取url地址
        //如果不为空
        if(content != null){
            //将内容设置进属性
            request.setAttribute("content",content);
            //转发到content.jsp
            request.getRequestDispatcher("content.jsp").forward(request, response);
        }else{
            response.getWriter().append("内容为空!");
        }
    }
}
