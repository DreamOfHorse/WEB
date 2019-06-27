window.onload=function () {
    $("#managecolumn").css('display','none');
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
                $("#managecolumn").css('display','block');
                $("#addcolumn").css('display','block');
                $("#delcolumn").css('display','block');
                $.ajax({                                                                            //将所有的栏目显示在下拉框中
                    "url": "http://localhost:8080/web_01/SelectColumnNameServlet",
                    "type": "post",
                    "cache": false,
                    "success": function (name) {
                        var columnname = JSON.parse(name);
                        var length=getHsonLength(columnname);
                        for(var i=0;i<length;i++)
                        {
                            $("#columnname").append("<option value="+i+">"+columnname[i]+"</option>");
                        }
                        if(length>=4) {
                            for (var i = 4; i < length; i++) {
                                $("#delcolumnname").append("<option value=" + i + ">" + columnname[i] + "</option>");
                            }
                        }
                    },
                    "error" :function () {
                        alert("error");
                    }
                });
                $("#submit").click(function(){
                    var columnname=$('#columnname option:selected').text();                 //获取select中选中的文本值
                    var ncolumnname = $("#ncolumnname").val();
                    $.ajax({
                        "url": "http://localhost:8080/web_01/ManageColumnServlet",
                        "data": {"columnname": columnname,"ncloumnname": ncolumnname,"uid":0},
                        "type": "post",
                        "cache": false,
                        "success": function (data) {
                            var user = JSON.parse(data);
                            if(user.id==0)
                            {
                                alert("修改成功");
                                location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*1";
                            }
                            else
                            {
                                alert("修改失败");
                            }
                        },
                        "error" :function (data) {
                            alert("error");
                        }
                    });

                });
                $("#addsubmit").click(function(){
                    var addcolumnname = $("#addcolumnname").val();
                    $.ajax({
                        "url": "http://localhost:8080/web_01/AddColumnServlet",
                        "data": {"addcolumnname": addcolumnname,"uid":0},
                        "type": "post",
                        "cache": false,
                        "success": function (data) {
                            var user = JSON.parse(data);
                            if(user.id==0)
                            {
                                alert("添加成功");
                                location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*1";
                            }
                            else
                            {
                                alert("添加失败");
                            }
                        },
                        "error" :function (data) {
                            alert("error");
                        }
                    });

                });
                $("#delsubmit").click(function(){
                    var delcolumnname = $('#delcolumnname option:selected').text();
                    $.ajax({
                        "url": "http://localhost:8080/web_01/DelColumnServlet",
                        "data": {"delcolumnname": delcolumnname,"uid":0},
                        "type": "post",
                        "cache": false,
                        "success": function (data) {
                            var user = JSON.parse(data);
                            if(user.id==0)
                            {
                                alert("删除成功");
                                location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*1";
                            }
                            else
                            {
                                alert("删除失败");
                            }
                        },
                        "error" :function (data) {
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