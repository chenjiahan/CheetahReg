/**
 * Created by gyx on 14-11-19.
 * user_center 用的j s
 */


$(document).ready(function(){


    //获取用户信息
    /*
     callAjax(baseUrl(),"post",function(data,status){

     });
     */

    start();

});

function start(){
    callAjax(baseUrl()+"isUserLoggedIn/","get",{},function(data){
        var obj= eval(data);
        if ( obj.loggedIn == '1' ) {
            Init();
        } else {
            location.href =baseHtml();
        }
    });
}


//检查两次密码是否相同
function checkPassword(){
    var o = $("#old_password").val();
    var n = $("#new_password").val();
    if(o==n){
        //$("#password-form").submit();
    }
    else{
        $("#password-msg").css("display","inherit");
    }
}

//修改头像
function modifyHead(){
    $("#file").trigger("click");
}


//上传图片文件
function uploadFile (file) {
    /*
     If the file is an image and the web browser supports FileReader,
     present a preview in the file list
     */

    if (typeof FileReader !== "undefined" && (/image/i).test(file.type)) {
        img = document.getElementById("head-icon");
        reader = new FileReader();
        reader.onload = (function (theImg) {
            return function (evt) {
                theImg.src = evt.target.result;
            };
        }(img));
        reader.readAsDataURL(file);
    }

}

function traverseFiles (files) {

    if (typeof files !== "undefined") {
        for (var i=0, l=files.length; i<l; i++) {
            uploadFile(files[i]);
        }
    }
    else {
        $("#head-msg").css("display","inherit");
    }
}



//处理窗口大小变化引发的nav变化
function navChange(){
    $nav = $("#main-nav");
    if($(window).width()<=768){
        if($nav.hasClass("nav-pills")){
            $nav.removeClass("nav-stacked");
            $nav.removeClass("nav-pills");
            $nav.removeClass("nav-list");
            $nav.addClass("nav-tabs");
        }
        if($(".navbar-header>.user-icon").attr("src")==null){
            $(".navbar-header").prepend('<img class="user-icon" src="images/male.jpg"/>');
        }
        $(".navbar-collapse > .container").height("auto");
    }
    else{

        if($nav.hasClass("nav-tabs")){
            $nav.addClass("nav-stacked");
            $nav.addClass("nav-pills");
            $nav.addClass("nav-list");
            $nav.removeClass("nav-tabs");
        }
        $("img").remove(".navbar-header .user-icon");
        $(".navbar-collapse > .container").height("50px");

    }
}









function placeInit(){
    var obj;
    callAjax(baseUrl()+"districtOne","post",null,function(data){
        obj= eval(data) ;
        for(var i =0;i<obj.length;i++){
            $(".province").append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
        }
        callAjax(baseUrl()+"districtTwo","post",{district_id:obj[0].district_id},function(data){
            obj= eval(data) ;
            for(var i =0;i<obj.length;i++){
                $(".city").append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
            }

        });
        callAjax(baseUrl()+"districtThree","post",{district_id:obj[0].district_id},function(data){
            obj= eval(data) ;
            for(var i =0;i<obj.length;i++){
                $(".district").append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
            }

        });
    });

}




function contactInit(){
    callAjax(baseUrl()+"getContactPeople","get",null,function(data){
        var obj =eval(data);
        $tbody = $("#contact_people tbody");
        for(var i=0;i<obj.length;i++){
            var gender = obj[i].gender=='1'?"男":"女";
            var self = obj[i].isMyself=='1'?"本人":"非本人";
            var str='<tr id="'+obj[i].contactPeopleId+'"><td>'+obj[i].realName+'</td>'+
                '<td>'+gender+'</td>'+
                '<td>'+self+'</td>'+
                '<td>'+obj[i].IdCardNumber+'</td>'+
                '<td class="operate">'+
                '<a class="get-mod">修改</a>'+
                '<a class="get-add">添加</a>';
            str+= self=='本人'?" ":'<a class="delete">删除</a>';
            str+='</td></tr>';
            $tbody.append(str);
        }
    });
}


function fillModi(id){
    var tds= $("#"+id).children();
    $("#contactId").val(id);
    $("#m_real_name").html(tds.eq(0).html());
    $("#m_id_number").html(tds.eq(3).html());
    if(tds.eq(1).html()=="女"){
        $("#m_sex input").eq(0).attr("checked","true");
        $("#m_sex input").eq(1).attr("checked","false");
    }
    else{
        $("#m_sex input").eq(0).attr("checked","false");
        $("#m_sex input").eq(1).attr("checked","true");
    }


}

function fillAdd(id){
    var tds= $("#"+id).children();
    $("#m_real_name input").val(tds.eq(0).html());
    $("#m_id_number").val(tds.eq(2).html());
    if(tds.eq(1).html()=="女"){
        $("#a_sex input").eq(0).attr("checked","true");
        $("#a_sex input").eq(1).attr("checked","false");
    }
    else{
        $("#a_sex input").eq(0).attr("checked","false");
        $("#a_sex input").eq(1).attr("checked","true");
    }
}


function orderModify(){
    var $tbody = $("#reservations tbody");
    var from=  $(".from input").val();
    var to = $(".to input").val();
    callAjax(baseUrl()+"getReservations/"+from+"/"+to+"/","get",null,function(data){
        $tbody.empty();
        var obj =eval(data);
        for(var i=0;i<obj.length;i++){
            var status ="";
            switch(obj[i].reservationStatus){
                case "1":
                    status="正在预约";
                    break;
                case "2":
                    status="已完成预约";
                    break;
                case "3":
                    status="已就诊";
                    break;
                case "4":
                    status="已取消预约";
                    break;
                case "5":
                    status="预约未就诊";
                    break;
            }

            var str='<tr>'+
                '<td>'+obj[i].date+'</td>'+
                '<td>'+obj[i].hospital+'</td>'+
                '<td>'+obj[i].departmentName+'</td>'+
                '<td>'+obj[i].timeInterval+'</td>'+
                '<td>'+obj[i].contactPeopleName+'</td>'+
                '<td>'+status+'</td>'+
                '<td class="operate">'+
                '<a class="get-cancel">取消预约</a>'+
                '</td>'+
                '</tr>';
            $tbody.append(str);
        }

    });
}


function orderInit(){

    var $tbody = $("#reservations tbody");
    callAjax(baseUrl()+"getReservations/2012-04-06","get",null,function(data){
        var obj =eval(data);
        for(var i=0;i<obj.length;i++){
            var status ="";
            switch(obj[i].reservationStatus){
                case "1":
                    status="正在预约";
                    break;
                case "2":
                    status="已完成预约";
                    break;
                case "3":
                    status="已就诊";
                    break;
                case "4":
                    status="已取消预约";
                    break;
                case "5":
                    status="预约未就诊";
                    break;
            }

            var str='<tr><input type="hidden" value="'+obj[i].reservationId+'"/>'+
                '<td>'+obj[i].date+'</td>'+
                '<td>'+obj[i].hospital+'</td>'+
                '<td>'+obj[i].departmentName+'</td>'+
                '<td>'+obj[i].timeInterval+'</td>'+
                '<td>'+obj[i].contactPeopleName+'</td>'+
                '<td>'+status+'</td>'+
                '<td class="operate">'+
                '<a class="get-cancel">取消预约</a>'+
                '</td>'+
                '</tr>';
            $tbody.append(str);
        }

    });
}


function UserInit(){
    callAjax(baseUrl()+"profile","get",null,function(data){
        var obj =eval(data);
        $("#user_name").html(obj.mobile_number);
        $("#email").html(obj.email);
        $("#real_name").html(obj.real_name);
        $("#id_number").html(obj.ID_card_number);
        $("#register_time").html(obj.created_at);
    });
}




function Init(){

    UserInit();
    orderInit();

    $(".flit").click(orderModify);

    contactInit();

    //初始化
    placeInit();

    //获取市信息
    $(".province").on("change",function(){
        var $city=$(this).next().next();
        $city.empty();
        var id= $(this).find("option:selected").attr("value");
        callAjax(baseUrl()+"districtTwo","post",{district_id:id},function(data){
            var obj= eval(data);
            for(var i =0;i<obj.length;i++){
                $city.append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
            }

        });
    });

    //获取区信息
    $(".city").on("change",function(){
        var $district=$(this).next().next();
        $district.empty();
        var id= $("#city").find("option:selected").attr("value");
        callAjax(baseUrl()+"districtThree","post",{district_id:id},function(data){
            var obj= eval(data);
            for(var i =0;i<obj.length;i++){
                $district.append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
            }
        });
    });


    //初始化时间选择器
    $('.timeSelecter .date').datepicker({
        'format': 'yyyy-mm-dd',
        'autoclose': true
    });

    // initialize datepair
    $('.timeSelecter').datepair();

    //bs中nav不支持嵌套，所以手动写一个
    $(".person-nav").click(function(){
        if($(this).hasClass("active")){
            return ;
        }
        else{
            $(".person-nav").each(function(){
                $(this).removeClass("active");
            });

            $(".ac-content").css("display","none");
            switch ($(this).attr("id")){
                case "personTab":
                    $("#person").css("display","inherit");
                    break;
                case "modifyTab":
                    $("#modify").css("display","inherit");
                    break;
                case "headTab":
                    $("#head").css("display","inherit");
            }
        }
    });

    //动态显示的动画

    $(".get-mod").click(function(){
        if( $("#add_person").css("display")=="none"){
            fillModi($(this).parent().parent().attr("id"));
            $("#patient .table-responsive").css("margin-top","0");
            $("#modify_person").show();
        }

    });
    $("#m_hide").click(function(){
        $("#patient .table-responsive").css("margin-top","50px");
        $("#modify_person").hide();
    });
    $(".get-add").click(function(){
        if($("#modify_person").css("display")=="none"){
            fillAdd($(this).parent().parent().attr("id"));
            $("#patient .table-responsive").css("margin-top","0");
            $("#add_person").show();
        }

    });
    $("#a_hide").click(function(){
        $("#patient .table-responsive").css("margin-top","50px");
        $("#add_person").hide();
    });

    $(".delete").click(function(){

        var $parent =$(this).parent().parent();
        var id= $parent.attr("id");
        var r=confirm("是否删除该联系人？");
        if (r==true)
        {
            callAjax(baseUrl()+"deleteContactPeople","post",{contactPeopleId:id},function(data){
                var obj = eval(data);
                if(data.success=="1"){
                    alert("删除成功");
                    $parent.remove("#"+id);
                }
                else{
                    alert("删除失败");
                }
            });
        }
    });


    $("#mod-password").click(checkPassword);
    $("#head-icon").click(modifyHead);

    $(window).resize(navChange);
    navChange();

    //这里用原生js的onchange。。不知道为什么JQ不好用
    document.getElementById("file").addEventListener("change", function () {
        traverseFiles(this.files);
    }, false);


    $("#modify_person .submit").click(function(){
        var id= $("#contactId").val();
        var sex=$("#m_sex input").eq(0).val()=="1"?"男":"女";
        callSubmit(baseUrl()+"updateContactPeople","post",function(data){
            var obj =eval(data);
            if(data.success=="1"){
                alert("修改成功联系人成功");
                $("#"+id).children().eq(1).html(sex);
                $("#m_hide").trigger("click");
            }
        },$(this).parent());
    });



    $("#add_person .submit").click(function(){
        callSubmit(baseUrl()+"addContactPeople","post",function(data){
            var obj =eval(data);
            if(data.success=="1"){
                $a = $("#add_person input");
                $tbody =  $("#contact_people tbody");
                alert("添加联系人成功");
                var str='<tr id="'+obj.contactPeopleId+'"><td>'+$a.eq(0).val()+'</td>'+
                    '<td>'+($a.eq(2).attr("checked")=="checked"?"男":"女")+'</td>'+
                    '<td>'+"非本人"+'</td>'+
                    '<td>'+$a.eq(1).val()+'</td>'+
                    '<td class="operate">'+
                    '<a class="get-mod">修改</a>'+
                    '<a class="get-add">添加</a>'+
                    '<a class="delete">删除</a>'+
                    '</td></tr>';
                $tbody.append(str);
                $("#a_hide").trigger("click");
            }
            else{
                alert("添加联系人失败");
            }
        },$(this).parent());
    });

    $(".get-cancel").click(function(){
        var $status = $(this).parent().prev();
        var id = $(this).parent().parent().children().eq(0).val();
        if($status.html()=="已取消预约"){
            alert("该预约已被取消");
        }
        else{
            callAjax(baseUrl()+"cancelReserve?reservationId="+id,"get",null,function(data){
                var obj=eval(data);
                if(obj.success==0){
                    alert(obj.message);
                }
                else{
                    $status.html("已取消预约");
                    alert("取消成功");
                }
            });
        }
    });


}