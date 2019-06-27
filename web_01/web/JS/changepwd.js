window.onload=function(){
    $("#changepwd").css('display','none');
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var username = decodeURI(loc.substr(n2+1,n1-n2));
    $.ajax({                                                    //是否越权
        "url": "http://localhost:8080/web_01/VerifyServlet",
        "data": {"username": username},
        "type": "post",
        "cache": false,
        "success": function (data) {
            // 参数为json类型的对象
            var user = JSON.parse(data);				//解析字符串
            if (user.message != "no") {
                $("#changepwd").css('display','block');
                $("#submit").click(function () {
                    var pwdone = $("#pwdone").val();
                    var pwdtwo = $("#pwdtwo").val();
                    if(!pwdone){
                        $("#message").text("新密码必填!");
                        $("#pwdone").focus();//获取焦点
                        return;
                    }
                    if(!pwdtwo){
                        $("#message").text("确认新密码必填!");
                        $("#pwdtwo").focus();//获取焦点
                        return ;
                    }
                    var url = "http://localhost:8080/web_01/ChangepwdServlet";
                    if (pwdone == pwdtwo) {
                        $.ajax({
                            "url": url,
                            "data": {"newpwd": pwdone},
                            "type": "post",
                            "cache": false,
                            "success": function (data) {
                                alert("修改成功！");
                                window.location.href = "login.html";
                            },
                            "error": function (data) {
                                alert("error");
                            }
                        })
                    } else {
                        $("#message").text("密码不相同");
                    }
                })
            }
             else {
                window.location.href = "login.html";  //越权登录返回登录界面
            }
        }
    });
}