/**
 * Created by gyx on 14-12-7.

function baseHtml(){
    return "http://10.111.1.79/youone/1/index.html";
}

function baseUrl(){
    return "http://10.111.1.79/CheetahReg/public/index.php/";
}
function baseUrl1(){
    return "http://localhost/CheetahReg/public/index.php/";
}
function baseUrlCjh(){
    return "http://localhost/CheetahReg/public/index.php/";
}
function callAjax(Ajaxurl,Ajaxtype,Ajaxdata,callback){
    $.ajax({url:Ajaxurl,type:Ajaxtype,dataType:"json",async:false,data:Ajaxdata, success:callback});
}


function callSubmit(Ajaxurl,Ajaxtype,callback,form){
    var ajax_option={
        url:Ajaxurl,//默认是form action
        type:Ajaxtype,
        dataType:"json",
        async:false,
        success:callback
    };
    form.ajaxSubmit(ajax_option);

}

$(".input-group  .btn").click(function(){
    var result =$(".input-group .form-control").val();

    window.location.href="search-result.html?content="+result;
})
*/