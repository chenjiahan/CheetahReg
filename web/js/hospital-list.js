/**
 * Created by Relly on 2014/12/21.
 */

var pagenumber=1;
var l=0;
var lname=[" ","三级甲等","三级乙等","三级丙等","二级甲等","二级乙等","二级丙等","一级甲等","一级乙等","一级丙等"];

function getPar(par){
    //获取当前URL
    var local_url = document.location.href;
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
var city=getPar("city");

function main(){
    callAjax(baseUrl()+"hospital_district/"+city+"/"+l,"get",null,callback);
    var obj;
    function callback(data) {
        obj = eval(data);
        if(obj.number==0)
        {
            $("#number").html("0");
            for (var k = 1; k<=5; k++) {
                $("#"+k).css("display","none");
            }
            $("#no-result").css('display',"block");
            $("#no-result").html("对不起，没有符合您要求的医院。");
            return;
        }
        $("#number").html(obj.number);
        $("#head strong").html(obj.city);
        for (var k = 1; k<=5; k++) {
            $("#"+k).css("display","block");
        }
        if(obj.number<6)
        {
            for (var k = 5; k>obj.number; k--) {
                $("#"+k).css("display","none");
            }
            $("#page-number").css("display", "none");
            for (var j = 1; j <= obj.number; j++) {
                $("#" + j + " .hospital-name").html(obj.hospital[j - 1]["name"]);
                $("#" + j + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj.hospital[j - 1]["hospital_id"]);
                $("#" + j + " .butn").attr('href',"hospital-introduction.html?id="+obj.hospital[j - 1]["hospital_id"]);
                $("#" + j + " .ss").html(lname[obj.hospital[j-1]["level"]]);
                $("#" + j + " .tel").html(obj.hospital[j - 1]["tel"]);
                $("#" + j + " .address").html(obj.hospital[j - 1]["address"]);


            }
        }
        else
        {
            $("#page-number").css("display", "block");
            pagenumber = 1;
            pagenumber = pagenumber - 1;
            for (var m = 1; m <= 5; m++) {
                $("#" + m + " .hospital-name").html(obj.hospital[m + pagenumber * 5 - 1]["name"]);
                $("#" + m + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj.hospital[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .butn").attr('href',"hospital-introduction.html?id="+obj.hospital[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .ss").html(lname[obj.hospital[m+pagenumber*5-1]["level"]]);
                $("#" + m + " .tel").html(obj.hospital[m + pagenumber * 5 - 1]["tel"]);
                $("#" + m + " .address").html(obj.hospital[m + pagenumber * 5 - 1]["address"]);
            }

        }
    }

    $(".page a").click(function() {

        pagenumber = $(this).html();
        pagenumber = pagenumber - 1;
        for (var k = 1; k<=5; k++) {
            $("#"+k).css("display","block");
        }
        if(obj.number-pagenumber*5>4)
        {

            for (var m = 1; m <= 5; m++)
            {
                $("#" + m + " .hospital-name").html(obj.hospital[m + pagenumber * 5 - 1]["name"]);
                $("#" + m + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj.hospital[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .butn").attr('href',"hospital-introduction.html?id="+obj.hospital[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .ss").html(lname[obj.hospital[m + pagenumber * 5 - 1]["level"]]);
                $("#" + m + " .tel").html(obj.hospital[m + pagenumber * 5 - 1]["tel"]);
                $("#" + m + " .address").html(obj.hospital[m + pagenumber * 5 - 1]["address"]);
            }

        }
        else
        {
            var a=obj.number-pagenumber*5;
            for (var k = 5; k >a; k--) {
                $("#"+k).css("display","none");
            }
            for (var m = 1; m <= a; m++)
            {
                $("#" + m + " .hospital-name").html(obj.hospital[m + pagenumber * 5 - 1]["name"]);
                $("#" + m + " .hospital-name").attr('href',"hospital-introduction.html?id="+obj.hospital[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .butn").attr('href',"hospital-introduction.html?id="+obj.hospital[m + pagenumber * 5 - 1]["hospital_id"]);
                $("#" + m + " .ss").html(lname[obj.hospital[m + pagenumber * 5 - 1]["level"]]);
                $("#" + m + " .tel").html(obj.hospital[m + pagenumber * 5 - 1]["tel"]);
                $("#" + m + " .address").html(obj.hospital[m + pagenumber * 5 - 1]["address"]);
            }
        }
    });
}



$(document).ready(function(){
    $(".hospital-box").attr('id', 5);
    for (var i = 0; i < 4; i++) {
        $("#5").clone().prependTo(".hospital-tabs").attr('id', 4-i);
    }
    main();
});



$(".hospital-restrict .sub-span a").click(function(){
    $(".hospital-restrict .sub-span").css("background-color","white");
    if($(this).html()=="三级甲等"){l=1;}
    if($(this).html()=="三级乙等"){l=2;}
    if($(this).html()=="三级丙等"){l=3;}
    if($(this).html()=="二级甲等"){l=4;}
    if($(this).html()=="二级乙等"){l=5;}
    if($(this).html()=="二级丙等"){l=6;}
    $("#sub-span-"+l).css("background-color","#C4E1FF");
    main();
});

/*城市切换*/
$("#menu a").click(function(){
    city=$(this).html();
    window.location.href="hospital-list.html?city="+city;
});

