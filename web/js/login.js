
$(document).ready(function() {
    //判断登录状态
    callAjax(baseUrlCjh()+"isUserLoggedIn/","get",{},function(data){
        var obj= eval(data);
        if ( obj.loggedIn == '1' ) {
            showPC();
        } else {
            hidePC();
        }
    });

    //登录
    $('#login-btn').click(function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if ( !username && !password ){
            $("#login-warning").html('请填写登录信息!');
        }
        else if ( !username ) {
            $("#login-warning").html('请填写手机号或身份证号!');
        }
        else if ( !password ) {
            $("#login-warning").html('请填写密码!');
        }
        else {
            $("#login-warning").html('');
            callSubmit(baseUrlCjh()+"login","post",callback,$("#login-form"));
            //注册后的响应
            function callback(data){
                var obj = eval(data);
                if(obj.success=='1')//获取成功
                {
                    $('#loginModal').modal('hide');
                    showPC();
                }
                else {
                    $("#login-warning").html('用户名或密码错误，请重新输入！');
                }
            }
        }
    });

    //退出登录
    $('#nav-logout').click(function() {
        callAjax(baseUrlCjh()+"logout/","get",{},function(data){
            var obj= eval(data);
            if ( obj.message == '已登出') {
                hidePC();
                alert('退出登录成功！');
            }
        });
    });
});


//显示个人中心和退出
function showPC() {
    $('#nav-login').hide();
    $('#nav-register').hide();
    $('#nav-pc').show();
    $('#nav-logout').show();
}

//隐藏个人中心和退出
function hidePC() {
    $('#nav-login').show();
    $('#nav-register').show();
    $('#nav-pc').hide();
    $('#nav-logout').hide();
}

