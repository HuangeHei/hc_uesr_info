from django.shortcuts import render,render_to_response,redirect #返回Html网页,和跳转
from django.http import HttpResponse
from web.helper import upfile_save,add_user_info
from web.models import user_info,userinfo_photo,group,position
# Create your views here.


def userinfo(request):
    group_list = group.objects.all()
    position_list = position.objects.all()
    print(group_list[0].group_name)
    return render_to_response('userInfo.html',{'group_list':group_list,'position_list':position_list})

def adduser(request):

    if request.method == 'POST':
        if add_user_info(request):
            return redirect('/')
        else:
            pass

    else:

        return HttpResponse('no ok')
