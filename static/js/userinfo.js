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