window.onload=function () {
    $("#changeuser").css('display','none');
    $("#adduser").css('display','none');
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var usname = decodeURI(loc.substr(n2+1,n1-n2));
    $.ajax({                                                    //是否越权
        "url": "http://localhost:8080/web_01/VerifyServlet",
        "data": {"username": usname},
        "type": "post",
        "cache": false,
        "success": function (data) {
            // 参数为json类型的对象
            var user = JSON.parse(data);				//解析字符串
            if (user.message != "no") {
                $("#changeuser").css('display','block');
                $("#adduser").css('display','block');
                $.ajax({                                                                            //将所有的用户显示在下拉框中
                    "url": "http://localhost:8080/web_01/SelectUserNameServlet",
                    "type": "post",
                    "cache": false,
                    "success": function (name) {
                        var username = JSON.parse(name);
                        var length=getHsonLength(username);
                        for(var i=0;i<length;i++)
                        {
                            $("#username").append("<option value="+i+">"+username[i]+"</option>");
                        }
                        if(length>=5) {
                            for (i = 5; i < length; i++) {
                                $("#delusername").append("<option value="+i+">"+username[i]+"</option>");
                            }
                        }
                    },
                    "error" :function () {
                        alert("error");
                    }
                });
                $.ajax({                                                                            //将所有的栏目显示在下拉框中
                    "url": "http://localhost:8080/web_01/SelectColumnInfoServlet",
                    "type": "post",
                    "cache": false,
                    "success": function (name) {
                        var columninfo = JSON.parse(name);
                        var length=getHsonLength(columninfo);
                        for(var i=0;i<length;i++)
                        {
                            $("#usercolumn").append("<option value="+columninfo[i].id+">"+columninfo[i].column+"</option>");
                        }
                    },
                    "error" :function () {
                        alert("error");
                    }
                });
                $("#submit").click(function(){

                    var npwdone = $("#npasswordone").val();
                    var npwdtwo = $("#npasswordtwo").val();
                    if(npwdone==npwdtwo)
                    {
                        var username=$('#username option:selected').text();                 //获取select中选中的文本值
                        var nname = $("#nname").val();
                        var nusername = $("#nusername").val();
                        $.ajax({
                            "url": "http://localhost:8080/web_01/ManageUserServlet",
                            "data": {"username": username,"nusername":nusername,"nname":nname,"npwd":npwdone},
                            "type": "post",
                            "cache": false,
                            "success": function (data) {
                                var id = JSON.parse(data);
                                if(id>0)
                                {
                                    id=0;
                                    alert("修改成功");
                                    $.ajax({
                                        "url": "http://localhost:8080/web_01/ReturnUserInfoServlet",
                                        "data": {"uid":id},
                                        "type": "post",
                                        "cache": false,
                                        "success": function (data) {
                                            var user = JSON.parse(data);
                                            location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*1";
                                        }
                                    });
                                }
                                else
                                {
                                    alert("修改成功");
                                    window.location.href = "login.html";
                                }
                            },
                            "error" :function (data) {
                                alert("error");
                            }
                        });
                    }
                });
                $("#addsubmit").click(function(){                             //增加用户
                    var addpwdone = $("#addpasswordone").val();
                    var addpwdtwo = $("#addpasswordtwo").val();
                    if(addpwdone==addpwdtwo)                            //密码相同返回信息到后台查看用户名是否相同，不相同增加用户
                    {
                        var usercolumn = $('#usercolumn ').val();
                        var addusername = $("#addusername").val();
                        var addname = $("#addname").val();
                        $.ajax({                                                                            //将所有的用户显示在下拉框中
                            "url": "http://localhost:8080/web_01/AdduserServlet",
                            "data": {"usercolumn": usercolumn,"addusername":addusername,"addname":addname,"addpwd":addpwdone},
                            "type": "post",
                            "cache": false,
                            "success": function (data) {
                                var flag = JSON.parse(data);
                                if(flag.message=="success")
                                    alert("添加用户成功");
                                else
                                    alert("添加用户失败");
                            },
                            "error" :function () {
                                alert("error");
                            }
                        });
                    }
                    else{
                        alert("密码不相同");
                    }
                });
                $("#delsubmit").click(function(){                             //删除用户
                        var delusername = $("#delusername option:selected").text();
                        $.ajax({                                                                            //将所有的用户显示在下拉框中
                            "url": "http://localhost:8080/web_01/DelUserServlet",
                            "data": {"delusername": delusername},
                            "type": "post",
                            "cache": false,
                            "success": function (data) {
                                var flag = JSON.parse(data);
                                if(flag.message=="success")
                                    alert("删除用户成功");
                                else
                                    alert("删除用户失败");
                            },
                            "error" :function () {
                                alert("error");
                            }
                        });
                });
            }
            else {
                window.location.href = "login.html";  //越权登录返回登录界面
            }
        }
    });
    function getHsonLength(json){                       //获取json数组的长度
        var jsonLength=0;
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }
}