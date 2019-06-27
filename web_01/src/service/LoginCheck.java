package service;

import bean.User;
import com.alibaba.fastjson.JSON;
import dao.ConnDB;

import java.sql.SQLException;
import java.util.ArrayList;

public class LoginCheck {
        ArrayList<User> list=new ArrayList<User>();
//    	public static void main(String[] args) {
//		User user=new User();
//		user=check("wy", "wy");
//		System.out.println(user.getName());
//	}
    public User check(String username, String password) throws SQLException {
        ConnDB connDB=new ConnDB();
        list=connDB.SelectUser();
        boolean check = false;
        User user= new User();
        System.out.println(username);
        System.out.println(password);
        for(int i=0;i<list.size();i++)
        {
            user=list.get(i);
            if(user.getUsername().equals(username) && user.getPwd().equals(password)) {
                user.setCheck("y");
                String info = JSON.toJSONString(user);
                System.out.println(info);
                break;
            }
            else {
                user.setCheck("n");
            }
        }
        return user;
    }
}