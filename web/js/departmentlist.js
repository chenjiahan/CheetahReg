$(document).ready(function(){
	callAjax(baseUrl()+"departmentLevelOne","get",null,function(data1){
	var dp1=eval(data1);

	for(var i=0;i<dp1.length;i++){
		$("#menu").children().eq(i).find("a").html(dp1[i].chinese_name+"<span>"+dp1[i].english_name+"</span>");
		$("#menu"+i+ " .info").html(dp1[i].description);
		callAjax(baseUrl()+"departmentLevelTwo/"+dp1[i].department_id,"get",null,function(data2){
		var dp2=eval(data2);
		for(var j=0;j<dp2.length;j++){
			$("#menu"+i+" ul").append('<li class="col-xs-12"><a href="department.html?id='+dp2[j].department_id+'">'+dp2[j].chinese_name+'</a><a>（<span class="text_orange">'+dp2[j].hospital_number+'</span>个相关医院）</a></li>');
		}
		});
		}
	});
	})