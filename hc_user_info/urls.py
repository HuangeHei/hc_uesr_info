"""hc_user_info URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
import web.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'userinfo/$', web.views.userinfo,name='userinfo'),
    url(r'adduser/$', web.views.adduser, name='adduser'),
    url(r'get_group_user/$', web.views.get_group_user, name='get_group_user'),
    url(r'get_user/$', web.views.get_user, name='get_user'),
    url(r'get_img/$', web.views.get_img, name='get_img'),
    url(r'get_insurer/$', web.views.get_insurer, name='get_insurer'),
    url(r'del_user/$', web.views.del_user, name='del_user'),
    url(r'search_user/$', web.views.search_user, name='search_user'),
    url(r'modify_user_info/$', web.views.modify_user_info, name='modify_user_info'),
    url(r'^$',web.views.userinfo,name='userinfo'),#开头为无的
]
