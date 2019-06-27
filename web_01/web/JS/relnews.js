window.onload=function(){
    $("#relnews").css('display','none');
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var n3 = loc.indexOf("-");
    var uid = decodeURI(loc.substr(n2+1, n3-n2-9));//从=号后面的内容
    var username = decodeURI(loc.substr(n3+1,n1-n3));
    var ue = UE.getEditor('editor');
    $.ajax({                                                    //是否越权
        "url": "http://localhost:8080/web_01/VerifyServlet",
        "data": {"username": username},
        "type": "post",
        "cache": false,
        "success": function (data) {
            // 参数为json类型的对象
            var user = JSON.parse(data);				//解析字符串
            if (user.message != "no") {
                $("#relnews").css('display','block');
                if(uid>0){                                                      //普通管理员发布新闻
                    $("#columnspan").css('display','none');
                    $("#submit").click(function(){
                        var title=$("#title").val();
                        var content=ue.getContent();
                        var data=GetData();
                        var url="http://localhost:8080/web_01/RelnewsServlet";
                        $.ajax({
                            "url": url,
                            "data": {"title": title,"content":content,"data":data,"uid":uid},
                            "type": "post",
                            "cache": false,
                            "success": function (data) {
                                var user = JSON.parse(data);
                                alert("success");
                                location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*"+1;
                            },
                            "error": function (data) {
                                alert("error");
                            }
                        });
                    });
                }
                else                                                                              //超级管理员发布新闻
                {
                    $.ajax({
                        "url" : "http://localhost:8080/web_01/SelectColumnInfoServlet",
                        "type" : "post",
                        "cache" : false,
                        "success" : function(data) {
                            var columninfo = JSON.parse(data);
                            var length=getHsonLength(columninfo);
                            for(var i=0;i<length;i++){
                                $("#columnname").append("<option value="+columninfo[i].id+">"+columninfo[i].column+"</option>");
                            }
                        },
                        "error" : function(data) {
                            alert("error");
                        }
                    });
                    $("#submit").click(function(){
                        var title=$("#title").val();
                        var content=ue.getContent();
                        var columnid = $("#columnname").val();            //获取选中的栏目的值
                        var data=GetData();
                        $.ajax({
                            "url": "http://localhost:8080/web_01/RelnewsServlet",
                            "data": {"title": title,"content":content,"data":data,"cid":columnid,"uid":uid},
                            "type": "post",
                            "cache": false,
                            "success": function (data) {
                                var user = JSON.parse(data);
                                location.href="manager.html?"+"id="+encodeURI(user.id)+"username-"+encodeURI(user.username)+"name+"+encodeURI(user.name)+"page*"+1;
                            }
                        });
                    });
                }
            }
            else
                window.location.href = "login.html";  //越权登录返回登录界面
        }
    });

    function getHsonLength(json){                       //获取json数组的长度
        var jsonLength=0;
        for (var i in json) {
            jsonLength++;
        }
        return jsonLength;
    }

    function isFocus(e){
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    }
    function setblur(e){
        UE.getEditor('editor').blur();
        UE.dom.domUtils.preventDefault(e)
    }
    function insertHtml() {
        var value = prompt('插入html代码', '');
        UE.getEditor('editor').execCommand('insertHtml', value)
    }
    function createEditor() {
        enableBtn();
        UE.getEditor('editor');
    }
    function getAllHtml() {
        alert(UE.getEditor('editor').getAllHtml())
    }
    function getContent() {
        var arr = [];
        arr.push("使用editor.getContent()方法可以获得编辑器的内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getContent());
        alert(arr.join("\n"));
    }
    function getPlainTxt() {
        var arr = [];
        arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
        arr.push("内容为：");
        arr.push(UE.getEditor('editor').getPlainTxt());
        alert(arr.join('\n'))
    }
    function setContent(isAppendTo) {
        var arr = [];
        arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
        UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
        alert(arr.join("\n"));
    }
    function setDisabled() {
        UE.getEditor('editor').setDisabled('fullscreen');
        disableBtn("enable");
    }

    function setEnabled() {
        UE.getEditor('editor').setEnabled();
        enableBtn();
    }

    function getText() {
        //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
        var range = UE.getEditor('editor').selection.getRange();
        range.select();
        var txt = UE.getEditor('editor').selection.getText();
        alert(txt)
    }

    function getContentTxt() {
        var arr = [];
        arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
        arr.push("编辑器的纯文本内容为：");
        arr.push(UE.getEditor('editor').getContentTxt());
        alert(arr.join("\n"));
    }
    function hasContent() {
        var arr = [];
        arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
        arr.push("判断结果为：");
        arr.push(UE.getEditor('editor').hasContents());
        alert(arr.join("\n"));
    }
    function setFocus() {
        UE.getEditor('editor').focus();
    }
    function deleteEditor() {
        disableBtn();
        UE.getEditor('editor').destroy();
    }
    function disableBtn(str) {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            if (btn.id == str) {
                UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
            } else {
                btn.setAttribute("disabled", "true");
            }
        }
    }
    function enableBtn() {
        var div = document.getElementById('btns');
        var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
        for (var i = 0, btn; btn = btns[i++];) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        }
    }

    function getLocalData () {
        alert(UE.getEditor('editor').execCommand( "getlocaldata" ));
    }

    function clearLocalData () {
        UE.getEditor('editor').execCommand( "clearlocaldata" );
        alert("已清空草稿箱")
    }

    function GetData(){                       //获取当前时间
        var myDate = new Date;
        var year = myDate.getFullYear();//获取当前年份
        var month = myDate.getMonth()+1;//获取当前月
        var day = myDate.getDate();//获取当前日
        var data=year+"-"+month+"-"+day;
        return data;
    }
}
