/**
 * Created by Huanghei on 16/8/21.
 */



function getNowFormatDate(){
        var date = new Date();
        var seperator1 = "-";//分割符号
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var nowtime = year + seperator1 + month + seperator1 + strDate;
        return nowtime;
}

/*以上是function区域*/

$("#add-group").click(function () {
    alert('您不是管理员,请联系管理员进行处理!!!')
});


$("#add_button").click(function () {

    $(".user-info-page").css({"display":"none"});
    $(".add-user-page").css({"display":"block"});
    $(".modify-info-page").css({"display":"none"});

    $("#date_of_joining").val(getNowFormatDate());
});

$("#add_user").click(function (){

});

$("#id_number").blur(function () {
    var id_number = $('#id_number').val();
    var id_number = id_number.substring(6, 10)+"-"+id_number.substring(10, 12)+"-"+id_number.substring(12, 14);
    $('#birth_date').val(id_number);
    $('#age').val(ages(id_number));
})

$("#back_user_info").click(function () {

    $(".user-info-page").css({"display":"block"});
    $(".add-user-page").css({"display":"none"});
    $(".modify-info-page").css({"display":"none"});

});

$("#modify_back").click(function () {

    $(".user-info-page").css({"display":"block"});
    $(".add-user-page").css({"display":"none"});
    $(".modify-info-page").css({"display":"none"});

});


$(".info-page-table").delegate('tr','dblclick',function(){//点击要修改的行,获取身份证号,跳转修改页面,从数据库拿信息进行填充

    //dblclick 双击元素触发事件
    var strBuff = $(this).text().split(' ')[2];
    var idNumber = strBuff;
    /*for(var i =0 ;i < strBuff.length;i++){
        if(strBuff[i]==' ')
            continue;

        idNumber=idNumber+strBuff[i];
    }*/

    $(".user-info-page").css({"display":"none"});
    $(".add-user-page").css({"display":"none"});
    $(".modify-info-page").css({"display":"block"});


     $.post("get_user/", { id_number:idNumber},
          function(ret){
              if(ret.img_dict[0].user_photo_name){

                  $('#modify_img').attr('src','../static/user_photo/'+ret.img_dict[0].user_photo_name)

              }
              for(var i = 0;i < ret.user_dict.length;i++){

                var id_number = ret.user_dict[i].id_number;
                var id_number = id_number.substring(6, 10)+"-"+id_number.substring(10, 12)+"-"+id_number.substring(12, 14);

                $('#modify_name').val(ret.user_dict[i].name);
                $('#modify_id_number').val(ret.user_dict[i].id_number);
                $('#modify_wages').val(ret.user_dict[i].wages);
                $('#modify_birth_date').val(ret.user_dict[i].birth_date);
                $('#modify_date_of_joining').val(ret.user_dict[i].date_of_joining);
                $('#modify_contact').val(ret.user_dict[i].contact);
                $('#modify_insurer').val(ret.user_dict[i].insurer);
                $('#modify_age').val(ages(id_number));
                $('#modify_position').val(ret.user_dict[i].position_id);
                $('#modify_position').val(ret.user_dict[i].position_id);
              }

              for(var i = 0;i < ret.entry_dict.length;i++){
                  $('.modify-page-table').empty();
                  $('.modify-page-table').append("<tr><th>时间</th><th>事件(详细)</th><th>依据</th></tr>");
                  $('.modify-page-table').append("<tr><td>"+ret.entry_dict[i].date+"</td>\<" +
                    "td>"+ret.entry_dict[i].entry+"</td>\<" +
                    "td>"+ret.entry_dict[i].entry_img+"</td></tr>");
              }


          }, "json");

});

$("#search_button").click(function () {
    
});


$("#add_user").click(function () {
    /*添加人员按钮触发*/
});

$("#out_user").click(function () {
    /*搜索按钮触发*/
    alert('out_user')
});


$("#modify_info").click(function () {
    /*添加人员按钮触发*/
    alert('modify_info')
});

function ages(date)               //计算周岁,网上Copy的,待消化,或者待自写
{
    var r = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if( r == null ){
        return false;
    }
    var birth = new Date(r[1],r[3] - 1,r[4]);
    if(birth.getFullYear() == r[1] && (birth.getMonth()+1) == r[3] && birth.getDate() == r[4])
    {
        var today = new Date();
        var age = today.getFullYear() - r[1];

        if(today.getMonth() > birth.getMonth()){
            return age;
        }

        if(today.getMonth() == birth.getMonth()){

            if(today.getDate() >= birth.getDate()){
                return age;
            }
            else{
                return age-1;
            }
        }
        if(today.getMonth() < birth.getMonth()){
            return age-1;
        }
    }
    return(-1);
}

$('li').on('click',function () {


    $(".user-info-page").css({"display":"block"});//只要点击了li 不管在什么页面都返回 user-info-page 页面
    $(".add-user-page").css({"display":"none"});
    $(".modify-info-page").css({"display":"none"});


    $('li').css({'border-left':'0','color':'#767676','font-weight':'400'}); //清除所有li标签的加粗
    $(this).css({'border-left':'4px solid #2299ee', 'color':'#2299ee','font-weight':'600'});//赋予本组加粗



    $.post("get_group_user/", { group_name:$(this).text()},
          function(user_list){
            $(".info-page-table").empty();
            $(".info-page-table").append("<tr><th>序号</th><th>姓名</th><th>身份证号码</th><th>出生年月</th><th>职务</th><th>所属项目</th></tr>");
            for(var i = 0;i < user_list.length;i++){

                $(".info-page-table").append("<tr>" +
                    "<td>"+(i+1)+"</td> \<" +
                    "td>"+user_list[i].name+"</td> \<" +
                    "td>"+user_list[i].id_number+"</td> \<" +
                    "td>"+user_list[i].birth_date+"</td> \<" +
                    "td>"+user_list[i].position_id+"</td> \<" +
                    "td>"+user_list[i].group_id+"</td> \<" +
                    "/tr>");
            }
    },"json");

});

(function () { //js 都是开始加载的时候就绑定了  这个放在前面就绑定不到点击事件
    $('li:eq(1)').trigger("click");
})();
