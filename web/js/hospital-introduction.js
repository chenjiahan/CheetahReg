/**
 * Created by Relly on 2014/12/21.
 */
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

var lname=[" ","三级甲等","三级乙等","三级丙等","二级甲等","二级乙等","二级丙等","一级甲等","一级乙等","一级丙等"];
$(document).ready(function(){
    callAjax(baseUrl()+"hospital/"+getPar("id"),"get",null,callback);
    function callback(data){
        var obj = eval(data);
        $("#city-name").html(obj.city);
        $("#city-name").attr("href","hospital-list.html?city="+obj.city);
        $("#hospitalname").html(obj.name);
        $(".name").html(obj.name);
        $(".rank").html(lname[obj.level]);
        $("#tel").html(obj.tel);
        $("#address").html(obj.address);
        $("#urll").html(obj.url);
        $("#urll").attr("href",obj.url);
        $("#message-hospital").html(obj.introduction);
        $("#cycle").html(obj.reservation_cycle);
        $("#open-time").html(obj.registration_open_time);
        $("#stop-time").html(obj.registration_closed_time);
        $("#deadline").html(obj.registration_cancel_deadline);
        var department1=obj.department_name.length;
        for(var i=1;i<department1;i++){
            $("#0").clone().appendTo(".department").attr('id', i);
            $("#"+i+" .depart2_name").attr('id',i+"0");
        }
        var obje =new Array();
        for( var k=0; k<department1;k++){
            for( var j=0; j<obj.department_name[k].length;j++){
                if(j!=0){
                    $("#"+k+"0").clone().appendTo("#"+k+" .p").attr('id', k.toString()+ j.toString());
                }
                obje[k] = eval(obj.department_name[k][j]);

                $("#"+k.toString()+ j.toString()+" .n").html(obje[k].department_name);
                $("#"+k.toString()+ j.toString()+" .n").attr("href","reservation.html?department_id="+obje[k].department_id);

            }
            $("#"+k+" .tt").html(obje[k].department_category_name);

        }





    }
});