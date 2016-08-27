from django.shortcuts import render,render_to_response,redirect #返回Html网页,和跳转
from django.http import HttpResponse
# Create your views here.


def userinfo(request):
    return render_to_response('userInfo.html')
    #return HttpResponse('userinfo')

