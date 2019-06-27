/**
 *
 */
$(function(){
    $("#submit").click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        if(!username){
            $("#message").text("用户名必填!");
            $("#username").focus();//获取焦点
            return;
        }
        if(!password){
            $("#message").text("密码必填!");
            $("#password").focus();//获取焦点
            return ;
        }
        var url = "http://localhost:8080/web_01/LoginServlet";
        var params = {"username":username, "password":password};
        $.ajax({
            "url" : url,
            "data" : params,
            "type" : "post",
            "cache" : false,
            "success" : function(data) {
                // 参数为json类型的对象
                var user=JSON.parse(data);				//解析字符串

                if(user.check=='y')
                {
                    location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*"+1;	//跳转网站的同时传输用户名和登录人姓名
                }
                else{
                    $("#message").text("用户名或密码错误");
                }
            },
            "error" : function(data) {
                alert("error");
            }
        });
    });
});