package servlet;

import bean.User;
import com.alibaba.fastjson.JSON;
import service.LoginCheck;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import static com.sun.javafx.util.Utils.split;
import static service.check.check;

public class LoginServlet extends HttpServlet {
        private static final long serialVersionUID = 1L;
        /**
         * @see HttpServlet#HttpServlet()
         */

        public LoginServlet() {
            super();

            // TODO Auto-generated constructor stub
        }

        /**
         */
        protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            // TODO Auto-generated method stub
            User user=new User();
            response.setCharacterEncoding("utf-8");
            response.setContentType("text/html,charset=utf-8");
            PrintWriter out = response.getWriter();
            String fail = "{\"message\":\"fail\"}";
            String username = request.getParameter("username");				//接收前端数据
            String password = request.getParameter("password");
            LoginCheck logincheck=new LoginCheck();
            if(username!=null&&password!=null) {
                if (check(username) || check(password)){
                    out.write(fail);
                    out.flush();
                    out.close();
                }
                else {
                    try {
                        user=logincheck.check(username,password);					//接收匹配成功数据
                    } catch (SQLException e) {
                        e.printStackTrace();
                    }

                    if(user.getCheck()=="y")
                    {
                        HttpSession session = request.getSession();                         //创建session,并将username传入
                        session.setAttribute("username",user.getUsername());
                        String info = JSON.toJSONString(user);                              //将User转换为json字符串
                        out.write(info);
                    }
                    else
                        out.write(fail);
                    out.flush();
                    out.close();
                }
            }
        }


        /**
         */
        protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
            // TODO Auto-generated method stub
            doGet(request, response);
        }
}
