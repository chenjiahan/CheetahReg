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
$(document).ready(function(){
	var ID=getPar("id");
	callAjax(baseUrl()+"departmentLevelTwo/"+ID.substr(0,3)+"000","get",null,function(data2){
		var dp2=eval(data2);
		for (var i=0;i<dp2.length;i++){
			if(dp2[i].department_id==ID){
				/*$(".menu img").attr("src",dp2[i].picture);*/
				$(".menu .info").html(dp2[i].description);
			}
			else{
				$(".menu ul").append('<li><a href="department.html?id='+dp2[i].department_id+'">'+dp2[i].chinese_name+'</a></li>');
			}

	}
	});
})
var citys= [
	["北京","北京市","#beijing"],
	["上海","上海市","#shanghai"],
	["广州","广州市","#guangzhou"],
	["山东","山东省","#shandong"],
	["浙江","浙江省","#zhejiang"],
	["福建","福建省","#fujian"],
	["天津","天津市","#tianjin"],
	["江苏","江苏省","#jiangsu"]
];
var level=[" ","一级甲等","二级甲等","二级乙等","二级丙等","三级甲等","三级乙等","三级丙等"];
$(document).ready(function(){
	for(var i=0;i<citys.length;i++){
	callAjax(baseUrl()+"hospitalInfo","post",{department_id:getPar("id"),district_name:citys[i][1]},function(data){
		var hosp=eval(data);
		for (var j=0;j<hosp.length;j++){
		$(citys[i][2]+" ul").append('<li><a href="hospital-introduction.html?id='+hosp[j].hospital_id+'">'+hosp[j].hospital_name+'</a><span class="hidden-xs lv">'+level[parseInt(hosp[j].level)]+'</span>'+
                                    '<a href="reservation.html?department_id='+hosp[j].department_id+'"><button class="btn btn-primary">预约</button></a>');
		}
	});
	}
}) 	