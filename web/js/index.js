/**
 * Created by gyx on 14-12-15.
 */


$(document).ready(function(){

    quickInit();
    departmentListInit();
    provinceInit();
    hotHospitalInit();
});

function hotHospitalInit(){
    var level=[" ","三级甲等","三级乙等","二级甲等","三级乙等","一级乙等","一级丙等"];
    callAjax(baseUrl()+"hot_hospital","get",null,function(data){
        var obj=eval(data.hot_hospital);
        
        for (var i=0;i<obj.length;i++){
            if(obj[i].tel[0]==null){
            $(".hot-hospital ul").append('<li><h4><a href="hospital-introduction.html?id='+obj[i].hospital_id+'">'+obj[i].hospital_name+'['+level[obj[i].level]+']</a></h4>'+
                                    '<a href="hospital-introduction.html?id='+obj[i].hospital_id+'"><img src="images/hot-hospital3.jpg"></a>'+
                                    '<br><p>地址:'+obj[i].address+'</p></li>');
            }
            else
            {
                $(".hot-hospital ul").append('<li><h4><a href="hospital-introduction.html?id='+obj[i].hospital_id+'">'+obj[i].hospital_name+'['+level[obj[i].level]+']</a></h4>'+
                                    '<a href="hospital-introduction.html?id='+obj[i].hospital_id+'"><img src="images/hot-hospital3.jpg"></a>'+
                                    '<p>电话:'+obj[i].tel[0]+'</p><br><p>地址:'+obj[i].address+'</p></li>');
            }   
        }
    });
}

function quickInit(){
    callAjax(baseUrl()+"districtOne","post",null,function(data){
       var obj= eval(data);
       for(var i=0;i<obj.length;i++){
           $("#qprovince select").append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
       }
    });

    $("#qprovince select").on("change",function(){
        var id= $("#qprovince select").find("option:selected").attr("value");
        var value=$("#qprovince select").find("option:selected").html();
        if(id!=""){
            $("#qcity select").empty();
            $("#qcity select").append('<option value="">请选择...</option>');
            if(value.indexOf("市")!=-1){
                $("#qcity select").append('<option>'+value+'</option>');
                return ;
            }
            callAjax(baseUrl()+"districtTwo","post",{district_id:id},function(data){
                var obj = eval(data);
                for(var i=0;i<obj.length;i++){
                    $("#qcity select").append('<option value='+obj[i].district_id+'>'+obj[i].district_name+'</option>');
                }
            });
        }
    });

    $("#qcity select").on("change",function(){
        var id= $("#qcity select").find("option:selected").html();
        if(id!=""){
            $("#qhospital select").empty();
            $("#qhospital select").append('<option value="">请选择...</option>');
            callAjax(baseUrl()+"hospital_name/"+id,"get",null,function(data){
                var obj = eval(data);

                for(var i=0;i<obj.length;i++){
                    $("#qhospital select").append('<option value="'+obj[i].hospital_id+'">'+obj[i].hospital_name+'</option>');
                }
            });
        }
    });

    $("#qhospital select").on("change",function(){
       var id= $("#qhospital select").find("option:selected").html();
        if(id!=""){
            $("#qdepartment select").empty();
            $("#qdepartment select").append('<option value="">请选择...</option>');
            callAjax(baseUrl()+"hospital_department/"+id,"get",null,function(data){
                var obj = eval(data);

                $("#qdepartment select").removeAttr("disable");
                for(var i=0;i<obj.length;i++){
                    $("#qdepartment select").append('<option value="'+obj[i].department_id+'">'+obj[i].department_name+'</option>');
                }
            });
        }
    });

    $(".fast-order-btn").click(function(){
        var id = $("#department_id").val();
        if(id!="0"&&typeof(id)!="undefined"){
        self.location='reservation.html?department_Id='+id;
        }
    })
}


function departmentListInit(){
    callAjax(baseUrl()+"departmentLevelOne","get",null,function(data1){
        var dp1=eval(data1);
        var str;
        var length1=dp1.length>=6?6:dp1.length;
        for(var i=0;i<length1;i++){
            str="";
            str+='<li><label><a href="departmentList.html">'+dp1[i].chinese_name+'</a></label>';
            callAjax(baseUrl()+"departmentLevelTwo/"+dp1[i].department_id,"get",null,function(data2){
                var dp2=eval(data2);
                str+="<p>";
                var length2 = dp2.length>=8?8:dp2.length;
                for(var j=0;j<length2;j++){
                   str+='<span><a href="department.html?id='+dp2[j].department_id+'">'+dp2[j].chinese_name+'</a></span>';
                }
                str+='<span><a href="departmentlist.html" class="more">更多<span class="glyphicon glyphicon-chevron-right" style="padding-top:3px;float:right;"></span></a></span>';
                str+="</p></li>";
                $("#department-list").append(str);
            });
        }
    });

}

function provinceInit(){
    callAjax(baseUrl()+"districtOne","post",null,function(data1){
        var obj1=eval(data1);
        var str="";
        var length1=obj1.length>=7?7:obj1.length;
        var tmpobj;
        for(var i=length1-1;i>=0;i--){
            tmpobj= obj1[i];
            var name = obj1[i].district_name;
            if(i==0){
                str='<li role="presentation" class="active"><a href="#'+obj1[i].district_id+'" role="tab" data-toggle="tab">'+name+'</a></li>';
            }
            else{
                str='<li role="presentation" ><a href="#'+obj1[i].district_id+'" role="tab" data-toggle="tab">'+name+'</a></li>';
            }
            $("#provinceList").prepend(str);
            callAjax(baseUrl()+"hospital_district/"+obj1[i].district_name+"/0","get",null,function(data2){
                var obj2 = eval(data2);
                obj2=obj2.hospital;
                var str2;
                if(i==0){
                    str2='<div role="tabpanel" class="tab-pane active" id="'+tmpobj.district_id+'"><ul>';
                }
                else{
                    str2='<div role="tabpanel" class="tab-pane" id="'+tmpobj.district_id+'"><ul>';
                }
                var length2= obj2.length>=8?8:obj2.length;
                for(var j=0;j<length2;j++){
                    str2+=' <li><a href="hospital-introduction.html?id='+obj2[j].hospital_id+'">'+obj2[j].name+'</a></li>';
                }
                str2+=' <li ><a href="hospital-list.html" class="more">更多<span class="glyphicon glyphicon-chevron-right"></span></a></li>';
                str2+='</ul></div>';
                $("#provinceSelect").prepend(str2);
            });
        }

    });



}