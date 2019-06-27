window.onload=function(){
    var loc = location.href;
    var n1 = loc.length;//地址的总长度
    var n2 = loc.indexOf("=");//取得=号的位置
    var n3 = loc.indexOf("-");
    var id = decodeURI(loc.substr(n2+1, n3-n2-5));//从=号后面的内容
    var name = decodeURI(loc.substr(n3+1, n1-n3));
    alert(id+name);

}
