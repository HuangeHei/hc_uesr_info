/**
 * Created by Huanghei on 16/8/21.
 */
var group_dic = new Array();
var position_dic = new Array();
var user_info = new Array();
var key_name = {'modify_name':'name',
    'modify_id_number':'id_number',
    'modify_wages':'wages',
    'modify_birth_date':'birth_date',
    'modify_date_of_joining':'date_of_joining',
    'modify_contact':'contact',
    'modify_insurer':'insurer',
    'modify_group':'group',
    'modify_position':'position'};

function isEmpty(obj){
    for (var key in obj) {
        return false;
    }
    return true;
}


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

function false_true(val){
    if(val == 1){
        return('是')
    }
    else if(val == 2){
        return('否')
    }
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

$("#id_number").blur(function () {//添加页面的监听 身份证 input 进行修改age 和 birth_date
    var id_number = $('#id_number').val();
    var id_number = id_number.substring(6, 10)+"-"+id_number.substring(10, 12)+"-"+id_number.substring(12, 14);
    $('#birth_date').val(id_number);
    $('#age').val(ages(id_number));
})


$("#modify_id_number").blur(function () { //修改页面的监听 身份证 input 进行修改age 和 birth_date
    var id_number = $('#modify_id_number').val();
    var id_number = id_number.substring(6, 10)+"-"+id_number.substring(10, 12)+"-"+id_number.substring(12, 14);
    $('#modify_birth_date').val(id_number);
    $('#modify_age').val(ages(id_number));
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
                  if(ret.img_dict[0].user_photo_name == 'pic_none'){
                     $('#modify_img').attr('src','../static/toux.jpg')
                  }else{
                     $('#modify_img').attr('src','../static/user_photo/'+ret.img_dict[0].user_photo_name)
                  }
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
                    $('#modify_group').val(ret.user_dict[i].group_id);
                    $('#modify_position').val(ret.user_dict[i].position_id);

                    user_info['name'] = ret.user_dict[i].name;
                    user_info['id_number'] = ret.user_dict[i].id_number;
                    user_info['wages'] = ret.user_dict[i].wages;
                    user_info['birth_date'] = ret.user_dict[i].birth_date;
                    user_info['date_of_joining'] = ret.user_dict[i].date_of_joining;
                    user_info['contact'] = ret.user_dict[i].contact;
                    user_info['insurer'] = ret.user_dict[i].insurer;
                    user_info['group'] = ret.user_dict[i].group_id;
                    user_info['position'] = ret.user_dict[i].position_id;

              }
              $('.modify-page-table').empty();//清空表
              $('.modify-page-table').append("<tr><th>时间</th><th>事件(详细)</th><th>依据</th></tr>");//添加表头
              for(var i = 0;i < ret.entry_dict.length;i++){

                  $('.modify-page-table').append("<tr><td>"+ret.entry_dict[i].date+"</td>\<" +
                    "td>"+ret.entry_dict[i].entry+"</td>\<" +
                    "td>"+ret.entry_dict[i].entry_img+"</td></tr>");
              }


          }, "json");

});

$("#search").focus(function () {
    $('.user-info-page-top').text('输入人员姓名进行人员查找')
});

$("#search").blur(function () {
    $('.user-info-page-top').text('双击行进行修改或查看详细信息')
});

$("#search_button").click(function () { //查找人员

      $.post("search_user/", { name:$("#search").val()},
          function(user_list){

            if(user_list == 'Null'){
                alert('没有找到此人员')
            }else{

                $(".info-page-table").empty();
                $(".info-page-table").append("<tr><th>序号</th><th>姓名</th><th>身份证号码</th><th>出生年月</th><th>年龄</th><th>是否购买保险</th><th>职务</th><th>所属项目</th></tr>");
                for(var i = 0;i < user_list.length;i++){

                    $(".info-page-table").append("<tr>" +
                        "<td>"+(i+1)+"</td> \<" +
                        "td>"+user_list[i].name+"</td> \<" +
                        "td>"+user_list[i].id_number+"</td> \<" +
                        "td>"+user_list[i].birth_date+"</td> \<" +
                        "td>"+ages(user_list[i].birth_date)+"</td> \<" +
                        "td>"+false_true(user_list[i].insurer)+"</td> \<" +
                        "td>"+position_dic[user_list[i].position_id]+"</td> \<" +
                        "td>"+group_dic[user_list[i].group_id]+"</td> \<" +
                        "/tr>");
                }
                $("#search").val('');//清空搜索框
            }
    },"json");
});


$("#add_user").click(function () {
    /*添加人员按钮触发*/
});

$("#out_user").click(function () { // 清退人员
    /*搜索按钮触发*/
    $.post("get_insurer/", {id_number:$("#modify_id_number").val()},
          function(ret){

            if(ret){
                alert('该用户有保险请更换完保险再来进行离职');
            }
            else if(!ret){
                $.post("del_user/", {id_number:$("#modify_id_number").val()},
                    function(ret){
                        alert(ret);
                },"json");
            }
    },"json");
});


$("#modify_info").click(function () {  //修改人员信息
    /*修改人员信息按钮触发*/

    var modify_dic = new FormData();
    modify_dic.append('modify_id_number',user_info['id_number']);
    var modify = 0;

    for(key in key_name){

       if(user_info[key_name[key]] != $('#'+key).val()){
            modify_dic.append(key_name[key],$('#'+key).val())
            modify = 1;
       }

    }

    if(!($('#modify_upload').val() == '')){
        modify = 1;
        modify_dic.append('img',$('#modify_upload').get(0).files[0])
    }else{
        modify_dic.append('img','Null')
    }

    if(!modify){
        alert('修改失败:您并没有修改任何内容')
    }else{
       $.ajax({
            url: "/modify_user_info/",                              //django中post地址末尾必须加上/ 不然就会报错
            type: "POST",
            processData: false,
            contentType: false,
            data: modify_dic,
            success: function(ret) {
                if(ret == 1){
                    alert('修改成功');

                    $("li:eq("+$("#modify_group").val()+")").trigger("click"); // eq定位第几个，可以使用到modif_group.val 要取到实际input的内容不是全局用户信息存储的内容不行

                }
            }
        },'json');
    }


});

$('li').on('click',function () {


    $(".user-info-page").css({"display":"block"});//只要点击了li 不管在什么页面都返回 user-info-page 页面
    $(".add-user-page").css({"display":"none"});
    $(".modify-info-page").css({"display":"none"});


    $('li').css({'border-left':'0','color':'#767676','font-weight':'400'}); //清除所有li标签的加粗
    $(this).css({'border-left':'4px solid #2299ee', 'color':'#2299ee','font-weight':'600'});//赋予本组加粗



    $.post("get_group_user/", { group_name:$(this).text()},
          function(user_list){
                $('.user-info-page-top').text('双击行进行修改或查看详细信息(字体颜色为红色的为已离职人员,离职人员信息会在30日内删除,如有特殊需要请联系管理员)')
                if(user_list.length == 0){
                    $('.user-info-page-top').text('该项目当前暂无人员')
                }

                $(".info-page-table").empty();
                $(".info-page-table").append("<tr><th>序号</th><th>姓名</th><th>身份证号码</th><th>出生年月</th><th>年龄</th><th>是否购买保险</th><th>职务</th><th>所属项目</th></tr>");
                for(var i = 0;i < user_list.length;i++){
                    if(user_list[i].display == 2){

                        $(".info-page-table").append("<tr style='color: red;'>" +
                        "<td>"+(i+1)+"</td> \<" +
                        "td>"+user_list[i].name+"</td> \<" +
                        "td>"+user_list[i].id_number+"</td> \<" +
                        "td>"+user_list[i].birth_date+"</td> \<" +
                        "td>"+ages(user_list[i].birth_date)+"</td> \<" +
                        "td>"+false_true(user_list[i].insurer)+"</td> \<" +
                        "td>"+position_dic[user_list[i].position_id]+"</td> \<" +
                        "td>"+group_dic[user_list[i].group_id]+"</td> \<" +
                        "/tr>");

                    }else{
                        $(".info-page-table").append("<tr>" +
                        "<td>"+(i+1)+"</td> \<" +
                        "td>"+user_list[i].name+"</td> \<" +
                        "td>"+user_list[i].id_number+"</td> \<" +
                        "td>"+user_list[i].birth_date+"</td> \<" +
                        "td>"+ages(user_list[i].birth_date)+"</td> \<" +
                        "td>"+false_true(user_list[i].insurer)+"</td> \<" +
                        "td>"+position_dic[user_list[i].position_id]+"</td> \<" +
                        "td>"+group_dic[user_list[i].group_id]+"</td> \<" +
                        "/tr>");

                    }

                }

    },"json");

});


(function () { //js 都是开始加载的时候就绑定了  这个放在前面就绑定不到点击事件
    $('li:eq(1)').trigger("click");

    for(var i=0;i < $("#group option").length;i++){
        group_dic[$("#group option")[i].value] = $("#group option")[i].text
    }

    for(var i=0;i < $("#position option").length;i++){
        position_dic[$("#position option")[i].value] = $("#position option")[i].text
    }

})();
