$(function(){
    $("#submit").click(function(){
        var username=$("#username").val();
        var password=$("#password").val();
        alert(username);
        alert(password);
        var url = "/LServlet";
        var params = {"username":username, "pwd":password};
        $.ajax({
            "url" : url,
            "data" : params,
            "type" : "post",
            "success" : function(data) {
                // 参数为json类型的对象
                alert("success");
                alert(data.message);
            },
            "error" : function(data) {
                alert("error");
                alert(data);
                var jsonData = JSON.stringify(data);// 转成JSON格式
                var result = $.parseJSON(jsonData);// 转成JSON对象
                alert(jsonData);
            }
        });
    });
})