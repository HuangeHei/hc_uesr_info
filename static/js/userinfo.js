/**
 * Created by Huanghei on 16/8/21.
 */



$("#add-group").click(function () {
    alert('您不是管理员,请联系管理员进行处理!!!')
});


$("#add_button").click(function () {

    $(".user-info-page").css({"display":"none"});
    $(".add-user-page").css({"display":"block"});
    $(".modify-info-page").css({"display":"none"});
});



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


$(".user-info-page tr").dblclick(function () {//点击要修改的行,获取身份证号,跳转修改页面,从数据库拿信息进行填充
    //dblclick 双击元素触发事件
    var strBuff = $(this).text().split('\n')[3]
    var idNumber = '';
    for(var i =0 ;i < strBuff.length;i++){
        if(strBuff[i]==' ')
            continue;

        idNumber=idNumber+strBuff[i];
    }
    $(".user-info-page").css({"display":"none"})
    $(".add-user-page").css({"display":"none"})
    $(".modify-info-page").css({"display":"block"});
});

$("#search_button").click(function () {
    /*搜索按钮触发*/
    alert('search_button')
});


$("#add_user").click(function () {
    /*添加人员按钮触发*/
    alert('add_user')
});

$("#out_user").click(function () {
    /*搜索按钮触发*/
    alert('out_user')
});


$("#modify_info").click(function () {
    /*添加人员按钮触发*/
    alert('modify_info')
});
