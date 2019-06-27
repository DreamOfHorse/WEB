window.onload = function () {
    $.ajax({                                                                            //轮播图
        "url": "http://localhost:8080/web_01/SelectPicNewsServlet",
        "type": "post",
        "cache": false,
        "success": function (name) {
            var picnews = JSON.parse(name);
            var length=getHsonLength(picnews);
            var imgs=[picnews[0].url,picnews[1].url,picnews[2].url,picnews[3].url,picnews[4].url];
            var texts=[picnews[0].title,picnews[1].title,picnews[2].title,picnews[3].title,picnews[4].title];
            var links=["./HTML/shownews.html?newstitle="+picnews[0].title,"./HTML/shownews.html?newstitle="+picnews[1].title,"./HTML/shownews.html?newstitle="+picnews[2].title,"./HTML/shownews.html?newstitle="+picnews[3].title,"./HTML/shownews.html?newstitle="+picnews[4].title];
            var counts=imgs.length;
            var k=0;
            var timer;
            $("#upImg").attr("src",imgs[k]);
            for(var i=0;i<counts;i++)
            {
                $("#dots").append("<li>●</li>");
            }
            showImg();
            function showImg(){
                $("#dots>li").css("color","#aaa");
                $("#dots>li").eq(k).css("color","#fff");
                $("#imgText").text(texts[k]);
                $("#downImg").attr("src",$("#upImg").attr("src"));
                $("#upImg").attr("src",imgs[k]).css("display","none");
                $("#upImg").fadeIn(1000);
                $("#imgLink").attr("href",links[k]);
            }
            function autoPlay()
            {
                k++;
                k%=counts;
                showImg();
            }
            timer=setInterval(autoPlay,3000);
            $("#imgBox").mouseover(function(){
                clearInterval(timer);
            });
            $("#imgBox").on("mouseout",function(){
                timer=setInterval(autoPlay,3000);
            });
            $("#dots>li").on("mouseover",function(){
                k=$(this).index();
                showImg();
                clearInterval(timer);
            });
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
                $("#column").append('<li><a href="HTML/column.html?columnname='+columnname[i]+"page-"+1+'" target="_blank">'+columnname[i]+'</a></li> ');
            }
            $("#columnnameone").text(columnname[0]);
            $("#columnnametwo").text(columnname[1]);
            $("#columnnamethree").text(columnname[2]);
            $("#columnnamefour").text(columnname[3]);
            var marginleft = (750/(length+1))-40;
            $("#column>li").css("marginLeft",marginleft);
        },
        "error" :function () {
            alert("error");
        }
    });
    $.ajax({                                                                            //将所有的新闻显示在栏目中
        "url": "http://localhost:8080/web_01/SelectIndexNewsServlet",
        "type": "post",
        "cache": false,
        "success": function (data) {
            var indexnews = JSON.parse(data);
            var length=getHsonLength(indexnews);
            for(var i=0;i<length;i++)
            {
                switch (indexnews[i].cid) {
                    case 1:$("#columnone").append('<li><a href="HTML/shownews.html?newstitle='+indexnews[i].title+'" target="_blank"><span>'+indexnews[i].title+'</span></a>'+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+indexnews[i].data+'</li> ');break;
                    case 2:$("#columntwo").append('<li><a href="HTML/shownews.html?newstitle='+indexnews[i].title+'" target="_blank"><span>'+indexnews[i].title+'</span></a>'+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+indexnews[i].data+'</li> ');break;
                    case 3:$("#columnthree").append('<li><a href="HTML/shownews.html?newstitle='+indexnews[i].title+'" target="_blank"><span>'+indexnews[i].title+'</span></a>'+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+indexnews[i].data+'</li> ');break;
                    case 4:$("#columnfour").append('<li><a href="HTML/shownews.html?newstitle='+indexnews[i].title+'" target="_blank"><span>'+indexnews[i].title+'</span></a>'+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+indexnews[i].data+'</li> ');break;
                }
            }
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
            window.location.href="HTML/showsearchnews.html?searchword="+encodeURI($("#searchtitle").val())+"page*1";
        }
    });

    var $imgList=$("#scrollBox ul");                        //友情链接
    var timer;
    var direction=1;
    $imgList.append($imgList.html());
    function scrollImg(){
        var l=$imgList.position().left;
        $imgList.css("left",l+direction+"px");
        if($imgList.position().left==-1020&&direction<0){
            $imgList.css("left",0+"px");
        }
        if($imgList.position().left>=0&&direction>0){
            $imgList.css("left","-1020px");
        }
    }
    timer=setInterval(scrollImg,10);
    $("#left").click(function(){
        direction=-1;
    });
    $("#right").click(function(){
        direction=1;
    });
    $("#scrollBox").mouseover(function(){
        clearInterval(timer);
    });
    $("#scrollBox").mouseout(function(){
        timer=setInterval(scrollImg,10);
    });

    function getHsonLength(json){                       //获取json数组的长度
        var jsonLength=0;
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }
}