/**
 * Created by Relly on 2014/12/22.
 */


var pagenumber=1;
var lname=[" ","三级甲等","三级乙等","三级丙等","二级甲等","二级乙等","二级丙等","一级甲等","一级乙等","一级丙等"];
function getPar(par){
    //获取当前URL
    var local_url = document.location.href;
    local_url =decodeURI(local_url);
    //获取要取得的get参数位置
    var get = local_url.indexOf(par +"=");
    if(get == -1){
        return false;
    }
    //截取字符串
    var get_par = local_url.slice(par.length + get + 1);
    //判断截取后的字符串是否还有其他get参数
    var nextPar = get_par.indexOf("&");
    if(nextPar != -1){
        get_par = get_par.slice(0, nextPar);
    }
    return get_par;
}



var content= getPar("content");


var obj;
function main(){
    callAjax(baseUrl()+"search","post",{keywords:content},callback);
    function callback(data) {
        obj = eval(data);
        if(typeof(obj.message)!='undefined')
        {
            $("#number").html("0");
            for (var k = 1; k<=5; k++) {
                $("#"+k).css("display","none");
            }
            $("#no-result").css('display',"block");
            $("#no-result").html(obj.message);
            return;
        }
        $("#number").html(obj.length);
        for (var k = 1; k<=5; k++) {
            $("#"+k).css("display","block");
        }
        if(obj.length<6)
        {
            for (var k = 5; k>obj.length; k--) {
                $("#"+k).css("display","none");
            }
            $("#page-number").css("display", "none");
            for (var j = 1; j <= obj.length; j++) {
                $("#" + j + " .hospital-name").html(obj[j-1]["hospital_name"]);
                $("#" + j + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj[j-1]["hospital_id"]);
                $("#" + j + " .butn").attr('href',"hospital-introduction.html?id="+obj[j-1]["hospital_id"]);
                $("#" + j + " .ss").html(lname[obj[j-1]["level"]]);
               /* $("#" + j + " .tel").html(obje[j-1]["tel"]);*/
                $("#" + j + " .address").html(obj[j-1]["address"]);

            }
        }
        else
        {
            $("#page-number").css("display", "block");
            pagenumber = 1;
            pagenumber = pagenumber - 1;
            for (var m = 1; m <= 5; m++) {

                $("#" + m + " .hospital-name").html(obj[m + pagenumber * 5 - 1]["hospital_name"]);
                $("#" + m + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .butn").attr('href',"hospital-introduction.html?id="+obj[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .ss").html(lname[obj[m+pagenumber*5-1]["level"]]);
                /*$("#" + m + " .tel").html(obj[m + pagenumber * 5 - 1]["tel"]);*/
                $("#" + m + " .address").html(obj[m + pagenumber * 5 - 1]["address"]);
            }

        }
    }

    $(".page a").click(function() {
        pagenumber = $(this).html();
        pagenumber = pagenumber - 1;
        for (var k = 1; k<=5; k++) {
            $("#"+k).css("display","block");
        }
        if(obj.length-pagenumber*5>4)
        {
            for (var m = 1; m <= 5; m++)
            {
                $("#" + m + " .hospital-name").html(obj[m + pagenumber * 5 - 1]["hospital_name"]);
                $("#" + m + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .butn").attr('href',"hospital-introduction.html?id="+obj[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .ss").html(lname[obj[m+pagenumber*5-1]["level"]]);
                /*$("#" + m + " .tel").html(obj[m + pagenumber * 5 - 1]["tel"]);*/
                $("#" + m + " .address").html(obj[m + pagenumber * 5 - 1]["address"]);
            }

        }
        else
        {
            var a=obj.length-pagenumber*5;
            for (var k = 5; k >a; k--) {
                $("#"+k).css("display","none");
            }
            for (var m = 1; m <= a; m++)
            {
                $("#" + m + " .hospital-name").html(obj[m + pagenumber * 5 - 1]["hospital_name"]);
                $("#" + m + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .butn").attr('href',"hospital-introduction.html?id="+obj[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .ss").html(lname[obj[m+pagenumber*5-1]["level"]]);
                /*$("#" + m + " .tel").html(obj[m + pagenumber * 5 - 1]["tel"]);*/
                $("#" + m + " .address").html(obj[m + pagenumber * 5 - 1]["address"]);
            }
        }
    });
}



$(document).ready(function(){
    $(".input-group .form-control").val(content);
    $(".hospital-box").attr('id', 5);
    for (var i = 0; i < 4; i++) {
        $("#5").clone().prependTo(".hospital-tabs").attr('id', 4-i);
    }
   // $("#1").css("border-top","1px solid #d5d5d5");
    main();
});






