package dao;
import java.sql.*;
import java.util.ArrayList;
import bean.News;
import bean.User;

public class ConnDB {
    private Connection conn;
    PreparedStatement pstmt;
    private ResultSet rs;
    ArrayList<User> ulist = new ArrayList<User>();
    ArrayList<News> nlist = new ArrayList<News>();
    ArrayList list = new ArrayList();
    String sql;
    static String url = "jdbc:mysql://localhost:3306/myweb";
    static String user = "root";
    static String pwd = "wy5251";

    //连接数据库
    public ConnDB() {
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conn = DriverManager.getConnection(url, user, pwd);
            System.out.println("success");

        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }

    //查询所有管理员信息数据并返回
    public ArrayList<User> SelectUser() throws SQLException {
        try {
            sql = "select * from user";
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                User user = new User();
                user.setId(rs.getInt("id"));
                user.setName(rs.getString("name"));
                user.setUsername(rs.getString("username"));
                user.setPwd(rs.getString("password"));
                ulist.add(user);
            }
        } catch (Exception e) {
        }
        pstmt.close();
        conn.close();
        return ulist;
    }

    //获取非超级管理员人员的名称
    public ArrayList SelectUserName() throws SQLException {
        sql = "select username from user ORDER BY id ASC";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()) {
            User user = new User();
            user.setUsername(rs.getString("username"));
            list.add(user.getUsername());
        }
        pstmt.close();
        conn.close();
        return list;
    }

    //筛选管理员界面新闻
    public ArrayList<News> SelectManagerNews(int c_id) throws SQLException {
        try {
            if (c_id > 0) {
                sql = "select id,title,data,click from news where c_id= " + c_id + " order by data desc";
                pstmt = conn.prepareStatement(sql);
                rs = pstmt.executeQuery();
                while (rs.next()) {
                    News news = new News();
                    news.setId(rs.getInt("id"));
                    news.setTitle(rs.getString("title"));
                    news.setData(rs.getString("data"));
                    news.setClick(rs.getInt("click"));
                    nlist.add(news);
                }
            } else {
                sql = "select id,title,data,click from news order by data desc";
                pstmt = conn.prepareStatement(sql);
                rs = pstmt.executeQuery();
                while (rs.next()) {
                    News news = new News();
                    news.setId(rs.getInt("id"));
                    news.setTitle(rs.getString("title"));
                    news.setData(rs.getString("data"));
                    news.setClick(rs.getInt("click"));
                    nlist.add(news);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        pstmt.close();
        conn.close();
        return nlist;
    }

    //修改密码
    public void ChangePwd(String username, String newpwd) throws SQLException {
        try {
            sql = "update user set password = '" + newpwd + "' where username = '" + username + "';";
            pstmt = conn.prepareStatement(sql);
            pstmt.execute();
        } catch (Exception e) {
        }
        pstmt.close();
        conn.close();
    }

    //筛选管理员管理的栏目
    public int SelectUserColumn (int id) throws SQLException {
        User user = new User();
        int columnnum = 0;
        sql = "SELECT `column` FROM `user` WHERE id ="+id+";";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()) {
            columnnum=rs.getInt("column");
        }
        return columnnum;
    }
    //插入新闻
    public void RelNews(String title, String content, String data,String url,int uid,int cid) throws SQLException {
        try {
            sql = "insert into news(title,content,data,url,u_id,c_id,click) VALUES (?,?,?,?,?,?,?);";
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, title);
            pstmt.setString(2, content);
            pstmt.setString(3, data);
            pstmt.setString(4,url);
            pstmt.setInt(5, uid);
            pstmt.setInt(6, cid);
            pstmt.setInt(7, 0);
            pstmt.executeUpdate();
        } catch (Exception e) {
        }
    }

    //查询登录者的信息
    public User SelectLoginInfo(int id) throws SQLException {
        User user = new User();
        sql = "SELECT id,username,`name`,`column` FROM `user` WHERE id="+id+";";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()) {
            user.setId(rs.getInt("id"));
            user.setName(rs.getString("name"));
            user.setUsername(rs.getString("username"));
            user.setColumn(rs.getInt("column"));
        }
        pstmt.close();
        conn.close();
        return user;
    }

    //更新管理员信息
    public void  UpdateUser(String username,String nusername,String nname,String npwd) throws SQLException {
        sql = "update user set username = '" + nusername + "' , name = '"+nname+"' , password = '"+npwd+ "' where username = '" + username + "';";
        pstmt = conn.prepareStatement(sql);
        pstmt.execute();
    }

    //筛选登录者的id
    public int VerifyUser(String username)throws SQLException {
        sql = "select id from user where username= '" +username+"';";
        int uid = 0;
        try {
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            while (rs.next())
            {
                uid = rs.getInt("id");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        pstmt.close();
        return uid;
    }

    //获取栏目的名称
    public ArrayList SelectColumnName() throws SQLException {
        sql = "SELECT `column`,id FROM `column`;";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        String columnname;
        while (rs.next()) {
            if(rs.getInt("id")!=0) {
                columnname = (rs.getString("column"));
                list.add(columnname);
            }
        }
        return list;
    }

    //修改密码
    public void UpdateColumn(String columnname, String ncolumnname) throws SQLException {
        try {
            sql = "UPDATE `column` SET `column`='"+ncolumnname+"'WHERE `column`='"+columnname+"';";
            pstmt = conn.prepareStatement(sql);
            pstmt.execute();
        } catch (Exception e) {
        }
    }

    //删除新闻
    public void DleNews(int nid) throws SQLException {
        sql = "DELETE FROM news WHERE id= "+nid+" ;";
        pstmt = conn.prepareStatement(sql);
        pstmt.execute();
        pstmt.close();
        conn.close();
    }

    //筛选需要修改的新闻信息
    public ArrayList<News> SelectNewsInfo(int newsid) throws SQLException {
        sql = "SELECT title,content FROM news WHERE id= "+newsid+"; ";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next())
        {
            News news = new News();
            news.setTitle(rs.getString("title"));
            news.setContent(rs.getString("content"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }

    //修改新闻
    public void ChangeNews(int id,String title, String content, String data,int uid,String url) throws SQLException{
        sql = "UPDATE news SET title='"+title+"',content='"+content+"',`data`='"+data+"',url='"+url+"',u_id="+uid+",click=0 WHERE id="+id+";";
        pstmt = conn.prepareStatement(sql);
        pstmt.execute();
        pstmt.close();
        conn.close();
    }

    //判别需要增加的栏目管理员是否存在
    public int DistUser (int usercolumn,String addusername) throws SQLException{
        int flag=0;
        sql = "SELECT username FROM `user` WHERE `column`="+usercolumn+";";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next())
        {
            if(addusername.equals(rs.getString("username")))
            {
                flag=1;
                break;
            }
        }
        return flag;
    }

    //增加用户
    public void AddUser(int usercolumn,String addusername,String addname,String addpwd) throws SQLException{                                     //增加用户
        sql ="INSERT INTO `user` (username,`name`,`password`,`column`) VALUES (?,?,?,?);";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, addusername);
        pstmt.setString(2, addname);
        pstmt.setString(3, addpwd);
        pstmt.setInt(4, usercolumn);
        pstmt.executeUpdate();
        pstmt.close();
        conn.close();
    }

    //查询主页新闻
    public ArrayList<News> SelectIndexNews() throws SQLException {
        sql = "SELECT title,`data`,c_id FROM news,`user` WHERE news.u_id=`user`.id;";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while(rs.next())
        {
            News news = new News();
            news.setTitle(rs.getString("title"));
            news.setData(rs.getString("data"));
            news.setCid(rs.getInt("c_id"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }

    //根据栏目名称获取栏目id
    public int SelectColumnId(String columnname) throws SQLException {
        sql = "SELECT id FROM `column` WHERE `column`='"+columnname+"';";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        int cid=0;
        while(rs.next()){
            cid = rs.getInt("id");
        }
        return cid;
    }

    //筛选栏目页栏目热点新闻
    public ArrayList<News> SelectColumnHotNews(int cid) throws SQLException {
        sql = "SELECT title FROM news WHERE c_id="+cid+" ORDER BY click DESC LIMIT 0,5;";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()){
            News news = new News();
            news.setTitle(rs.getString("title"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }

    //新闻增加点击数
    public void AddClick (String title) throws SQLException {
        sql = "UPDATE news SET click=click+1 WHERE title='"+title+"';";
        pstmt = conn.prepareStatement(sql);
        pstmt.execute();
        pstmt.close();
        conn.close();
    }
    //筛选栏目页栏目热点新闻
    public ArrayList<News> SelectColumnNews(String columnname) throws SQLException {
        sql = "SELECT title,`data`,`name` FROM `column`,news,`user` WHERE`user`.id=news.u_id AND column.id=news.c_id AND `column`.`column`='"+columnname+"';";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()){
            News news = new News();
            news.setTitle(rs.getString("title"));
            news.setData(rs.getString("data"));
            news.setAuthor(rs.getString("name"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }
    //筛选要显示的在新闻界面的新闻信息
    public ArrayList<News> SelectNews (String title) throws SQLException{
        sql = "SELECT title,content,`data`,click,`name` \n" +
                "FROM `news`,`user`\n" +
                "WHERE news.u_id=`user`.id AND title='"+title+"';";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next())
        {
            News news = new News();
            news.setTitle(rs.getString("title"));
            news.setContent(rs.getString("content"));
            news.setData(rs.getString("data"));
            news.setClick(rs.getInt("click"));
            news.setAuthor(rs.getString("name"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }
    //筛选轮播新闻信息
    public ArrayList<News> SelectPicNews () throws SQLException{
        sql = "SELECT title,url FROM `news` WHERE url!='null' ORDER BY `data` DESC LIMIT 0,5;";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next())
        {
            News news = new News();
            news.setTitle(rs.getString("title"));
            news.setUrl(rs.getString("url"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }
    //筛选查找的新闻信息
    public ArrayList<News> SelectSearchNews (String selectwords) throws SQLException{
        sql = "SELECT title,`data`,`name` FROM news,`user` \n" +
                "WHERE `user`.id=news.u_id AND title LIKE '%"+selectwords+"%';";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()){
            News news = new News();
            news.setTitle(rs.getString("title"));
            news.setData(rs.getString("data"));
            news.setAuthor(rs.getString("name"));
            list.add(news);
        }
        pstmt.close();
        conn.close();
        return list;
    }
    //增加栏目
    public void AddColumn (String addcolumnname) throws SQLException{
        sql ="INSERT INTO `column` (`column`) VALUES (?);";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, addcolumnname);
        pstmt.executeUpdate();
    }
    //删除栏目
    public void DelColumn(String delcomumnname) throws SQLException{
        sql = "DELETE FROM `column` WHERE `column`='"+delcomumnname+"';";
        pstmt = conn.prepareStatement(sql);
        pstmt.execute();
    }
    //筛选栏目的id和栏目名称
    public ArrayList<News> SelectColumnInfo() throws SQLException {
        sql = "SELECT `column`,id FROM `column`;";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        while (rs.next()) {
            if(rs.getInt("id")!=0) {
                News news = new News();
                news.setColumn(rs.getString("column"));
                news.setId(rs.getInt("id"));
                nlist.add(news);
            }
        }
        return nlist;
    }
    //删除用户
    public void DelUser (String delusername) throws SQLException {
        sql = "DELETE FROM `user` WHERE username= '"+delusername+" ';";
        pstmt = conn.prepareStatement(sql);
        pstmt.execute();
        pstmt.close();
        conn.close();
    }
}