window.onload=function () {
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var n3 = loc.indexOf("-");
    var columnname = decodeURI(loc.substr(n2+1,n3-n2-5));
    var page = decodeURI(loc.substr(n3+1,n1-n3));
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
    $.ajax({                                                                            //将热点新闻显示在栏目中
        "url": "http://localhost:8080/web_01/SelectColumnHotNewsServlet",
        "type": "post",
        "data" : {"columnname": columnname},
        "cache": false,
        "success": function (data) {
            var columnhotnews = JSON.parse(data);
            var length=getHsonLength(columnhotnews);
            for(var i=0;i<length;i++)
            {
                    $("#HotNews").append('<li><a href="shownews.html?newstitle='+columnhotnews[i].title+'" target="_self"><span>'+columnhotnews[i].title+'</span></a></li> ');
            }
        },
        "error" :function () {
            alert("error");
        }
    });
    $.ajax({                                                                            //将栏目所有新闻显示
        "url": "http://localhost:8080/web_01/SelectColumnNewsServlet",
        "type": "post",
        "data" : {"columnname": columnname},
        "cache": false,
        "success": function (data) {
            var columnnews = JSON.parse(data);
            var length=getHsonLength(columnnews);
            for(var i=0;i<length;i++)
            {
                $("#table_body").append("<tr><td class='title'><span class='titlespan'><a href='shownews.html?newstitle="+columnnews[i].title+"' target='_blank'>"+columnnews[i].title+"</a></span></td><td class='data'>"+columnnews[i].data+"</td><td class='author'><span class='authorspan'>"+columnnews[i].author+"</span></td><tr>");
            }
            goPage(page,3);
        },
        "error" :function () {
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
            $("#barcon").append('<li class="prev"><a href="column.html?columnname='+columnname+"page-"+Page+'" target="_self">'+'上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li> ');
            for (var j = 1; j <= totalPage; j++) {
                if (currentPage == j) {
                    $("#barcon").append('<li class="active"><a href="column.html?columnname='+columnname+"page-"+j+'" target="_self">'+ j +'&nbsp;&nbsp;&nbsp;</a></li> ');
                } else {
                    $("#barcon").append('<li><a href="column.html?columnname='+columnname+"page-"+j+'" target="_self">'+j+'&nbsp;&nbsp;&nbsp;</a></li> ');
                }

            }
        }
        else {
            $("#barcon").append( '<li>上一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>');
            for (var j = 1; j <= totalPage; j++) {
                if (currentPage == j) {
                    $("#barcon").append('<li class="active"><a href="column.html?columnname='+columnname+"page-"+j+'" target="_self">'+j+'&nbsp;&nbsp;&nbsp;</a></li> ');
                } else {
                    $("#barcon").append( '<li><a href="column.html?columnname='+columnname+"page-"+j+'" target="_self">'+j+'&nbsp;&nbsp;&nbsp;</a></li> ');
                }

            }
        }
        if (currentPage < totalPage) {
            var Page=currentPage;
            Page++;
            $("#barcon").append( '<li class="next"><a href="column.html?columnname='+columnname+"page-"+Page+'" target="_self">'+'下一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li> ');
        } else if(currentPage >=totalPage){
            $("#barcon").append( '<li>下一页&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>');
        }
    }
    function getHsonLength(json){                       //获取json数组的长度
        var jsonLength=0;
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }
}