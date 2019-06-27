window.onload=function(){
    $("#manager").css('display','none');
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var n3 = loc.indexOf("-");//获取-号后面的位置
    var n4 = loc.indexOf("+");//获取+号后面的位置
    var n5 = loc.indexOf("*");
    var id = decodeURI(loc.substr(n2+1, n3-n2-9));//从=号后面的内容
    var username = decodeURI(loc.substr(n3+1, n4-n3-5));
    var name = decodeURI(loc.substr(n4+1,n5-n4-5));
    var page = decodeURI(loc.substr(n5+1,n1-n5));
    if(id>0)
    {
        $("#muser").css('display','none');
        $("#mcolumn").css('display','none');
    }
    $.ajax({                                                    //是否越权
        "url" : "http://localhost:8080/web_01/VerifyServlet",
        "data" : {"username":username},
        "type" : "post",
        "cache" : false,
        "success" : function(data) {
            // 参数为json类型的对象
            var user=JSON.parse(data);				//解析字符串
            if (user.message != "no") {                                 //非越权获取管理界面新闻列表
                $("#manager").css('display','block');
                $.ajax({
                    "url": "http://localhost:8080/web_01/ManagerNewsServlet",
                    "data": {"id": id},
                    "type": "post",
                    "cache": false,
                    "success": function (News) {
                        var news = JSON.parse(News);
                        for(var i=0;i<news.length;i++){
                            news[i].click=news[i].click<10?('0'+news[i].click):(news[i].click);                     //小于10在前面加0
                            $("#table_body").append("<tr><td class='title'><span class='titlespan'><a href='shownews.html?newstitle="+news[i].title+"' target='_blank'>"+news[i].title+"</a></span></td><td class='data'>"+news[i].data+"</td><td class='click'><span class='clickspan'>"+news[i].click+"</span></td><td class='changetd'><button name='"+news[i].id+"' class='change'>修改</button></td><td class='deletetd'><button name='"+news[i].id+"' name='"+news[i].id+"' class='delete'>删除</button></td><tr>");
                        }
                        goPage(page,10);
                        $('.change').click(function(){
                            if(confirm("您确定要修改这条新闻吗？")) {
                                window.location.href="changenews.html?"+"id="+encodeURI($(this).attr("name")+"username-"+encodeURI(username));
                            }
                            else{
                            }
                        });
                        $('.delete').click(function(){                      //删除新闻
                            if(confirm("您确定要删除这条新闻吗？")) {
                                alert($(this).attr("name"));
                                $.ajax({
                                    "url" : "http://localhost:8080/web_01/DelNewsServlet",
                                    "data" : {"nid":$(this).attr("name")},
                                    "type" : "post",
                                    "cache" : false,
                                    "success" : function(data) {
                                        if(data.message=='success')
                                            alert("删除成功");
                                        },
                                    "error" : function(data) {
                                        alert("error");
                                    }
                                });
                            }
                        else{
                        }
                        });
                    }
                });
                $("#headerl").html("<span>欢迎:"+name+"&nbsp;&nbsp;&nbsp; 账号：" + username);
            } else {
                window.location.href = "login.html";  //越权登录返回登录界面
            }
        },
        "error" : function(data) {
            window.location.href="login.html";
        }
    });
    $("#changepwd").click(function(){                       //修改密码
        window.location.href="changepwd.html?"+"username="+encodeURI(username);
    });
    $("#exit").click(function(){                            //退出系统
        if(confirm("您确定要退出系统吗？")) {
            window.location.href = "login.html";
        }
        else{
        }
    });
    $("#relnews").click(function(){                         //发布新闻
        window.location.href="relnews.html?"+"id="+encodeURI(id)+"username-"+encodeURI(username);
    });
    $("#muser").click(function(){                           //管理用户
        window.location.href = "manageuser.html?"+"username="+encodeURI(username);
    });
    $("#mcolumn").click(function(){                         //管理栏目
        window.location.href = "managecolumn.html?"+"username="+encodeURI(username);
    });
    function goPage(pno, psize) {                                                               //进行分页
        var itable = document.getElementById("tablebody");//通过ID找到表格
        var num = itable.rows.length;//表格所有行数(所有记录数)
        var totalPage = 0;//总页数
        var pageSize = 2*psize;//每页显示行数
        //总共分几页
        if (num / pageSize > parseInt(num / pageSize)) {
            totalPage = parseInt(num / pageSize) + 1;
        } else {
            totalPage = parseInt(num / pageSize);
        }
        var currentPage = pno;//当前页数
        var startRow = (currentPage - 1) * pageSize + 1;//开始显示的行  1
        var endRow = currentPage * pageSize;//结束显示的行   15
        endRow = (endRow > num) ? num : endRow;
        //遍历显示数据实现分页
        for (var i = 1; i < (num + 1); i++) {
            var irow = itable.rows[i - 1];
            if (i >= startRow && i <= endRow) {
                irow.style.display = "block";
            } else {
                irow.style.display = "none";
            }
        }
        if (currentPage > 1) {
            var Page=currentPage;
            Page--;
            $("#barcon").append('<li class="prev"><a href="manager.html?id='+encodeURI(id)+"username-"+username+"name+"+name+"page*"+Page+'" target="_self">'+'上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li> ');
            for (var j = 1; j <= totalPage; j++) {
                if (currentPage == j) {
                    $("#barcon").append('<li class="active"><a href="manager.html?id='+encodeURI(id)+"username-"+username+"name+"+name+"page*"+j+'" target="_self">'+ j +'&nbsp;&nbsp;&nbsp;</a></li> ');
                } else {
                    $("#barcon").append('<li><a href="manager.html?id='+encodeURI(id)+"username-"+username+"name+"+name+"page*"+j+'" target="_self">'+j+'&nbsp;&nbsp;&nbsp;</a></li> ');
                }

            }
        }
        else {
            $("#barcon").append( '<li>上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>');
            for (var j = 1; j <= totalPage; j++) {
                if (currentPage == j) {
                    $("#barcon").append('<li class="active"><a href="manager.html?id='+encodeURI(id)+"username-"+username+"name+"+name+"page*"+j+'" target="_self">'+j+'&nbsp;&nbsp;&nbsp;</a></li> ');
                } else {
                    $("#barcon").append( '<li><a href="manager.html?id='+encodeURI(id)+"username-"+username+"name+"+name+"page*"+j+'" target="_self">'+j+'&nbsp;&nbsp;&nbsp;</a></li> ');
                }

            }
        }
        if (currentPage < totalPage) {
            var Page=currentPage;
            Page++;
            $("#barcon").append( '<li class="next"><a href="manager.html?id='+encodeURI(id)+"username-"+username+"name+"+name+"page*"+Page+'" target="_self">'+'下一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li> ');
        } else if(currentPage >=totalPage){
            $("#barcon").append( '<li>下一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>');
        }
    }
}
