window.onload= function () {
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var title = decodeURI(loc.substr(n2+1, n1-n2));
    $.ajax({                                                                            //增加点击数
        "url": "http://localhost:8080/web_01/AddClickServlet",
        "type": "post",
        "data" : {"title": title},
        "cache": false,
        "success": function () {
        },
        "error" :function () {
            alert("error");
        }
    });
    $.ajax({                                                                            //将所有的栏目名称显示
        "url": "http://localhost:8080/web_01/SelectColumnNameServlet",
        "type": "post",
        "cache": false,
        "success": function (name) {
            var columnname = JSON.parse(name);
            var length=getHsonLength(columnname);
            for(var i=0;i<length;i++)
            {
                $("#column").append('<li><a href="column.html?columnname='+columnname[i]+"page-"+1+'" target="_self">'+columnname[i]+'</a></li> ');
            }
        },
        "error" :function () {
            alert("error");
        }
    });
    $.ajax({                                                                //显示新闻
        "url" : "http://localhost:8080/web_01/SelectNewsServlet",
        "data" : {"title":title},
        "type" : "post",
        "cache" : false,
        "success" : function(data) {
            var news = JSON.parse(data);
            $("#title").text(news[0].title);
            $("#content").html(news[0].content);            //显示文章的内容
            $("#data").text("发布时间："+news[0].data);
            $("#author").text("提交："+news[0].author);
            $("#click").text("点击次数："+news[0].click);
        },
        "error" : function(data) {
            alert("error");
        }
    });
    $('#searchtitle').focus(function() {
        if($(this).val()=="搜索"){
            $(this).val("");
            this.style.color='#000'
        }
    }).blur(function() {
        if ($(this).val() == "") {
            $(this).val("搜索");
            this.style.color='#999'
        }
    });
    $("#searchtitle").keypress(function (e) {               //回车搜索
        if (e.which == 13) {
            window.location.href="showsearchnews.html?searchword="+encodeURI($("#searchtitle").val())+"page*1";
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