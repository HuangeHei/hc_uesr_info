from django.shortcuts import render,render_to_response,redirect #返回Html网页,和跳转
from django.http import HttpResponse
from web.helper import upfile_save,add_user_info,convert_to_dicts,outspace
from web.models import user_info,userinfo_photo,group,position,user_entry
import json
# Create your views here.




def userinfo(request):
    group_list = group.objects.all()
    position_list = position.objects.all()
    return render_to_response('userInfo.html',{'group_list':group_list,'position_list':position_list})

def adduser(request):

    if request.method == 'POST':
        if add_user_info(request):
            return redirect('/')
        else:
            pass

    else:

        return HttpResponse('no_ok')

def get_group_user(request):
    if request.method == 'POST':

        group_obj = group.objects.get(group_name=request.POST['group_name'])
        list_tmp = user_info.objects.filter(group=group_obj)
        user_list = convert_to_dicts(list_tmp)

        return HttpResponse(json.dumps(user_list))

def get_user(request):
    if request.method == 'POST':

        ret = {}

        entry_tmp = user_entry.objects.filter(user_id_number=request.POST['id_number'])
        user_img = userinfo_photo.objects.filter(user_id_number=request.POST['id_number'])
        user_tmp = user_info.objects.filter(id_number=request.POST['id_number'])
        user_dict = convert_to_dicts(user_tmp)
        img_dict = convert_to_dicts(user_img)
        entry_dict = convert_to_dicts(entry_tmp)

        ret['entry_dict'] = entry_dict
        ret['user_dict'] = user_dict
        ret['img_dict'] = img_dict
        print(len(ret['entry_dict']))

        return HttpResponse(json.dumps(ret))

def get_img(request):
    if request.method == 'GET':
        img_name = request.GET.get('img_name')
        return HttpResponse('<img src="../static/user_photo/'+img_name+'"><img>')

def get_insurer(request):

    id_number = request.POST['id_number']
    id_number = outspace(id_number)
    user_obj = user_info.objects.get(id_number=id_number)

    if user_obj.insurer == 1:
        return HttpResponse(json.dumps(True))
    elif user_obj.insurer == 2:
        return HttpResponse(json.dumps(False))
    else:
        return HttpResponse(json.dumps('Error'))


def del_user(request):
    obj = user_info.objects.filter(id_number=request.POST['id_number'])
    if obj[0].display == 1:
        user_info.objects.filter(id_number=request.POST['id_number']).update(display=2)
        user_entry.objects.create(user_id_number=request.POST['id_number'], entry="办理离职手续", entry_img="None")
        return HttpResponse(json.dumps('成功办理离职手续'))
    else:
        return HttpResponse(json.dumps('该用户已经办理过离职手续，无需再次办理，如要撤销离职请联系管理员！'))


def search_user(request):
    user_list = user_info.objects.filter(name=request.POST['name'])
    if len(user_list) == 0:
        return HttpResponse(json.dumps('Null'))
    ret = convert_to_dicts(user_list)
    return HttpResponse(json.dumps(ret))

def modify_user_info(request):
    user_obj = user_info.objects.get(id_number = request.POST['modify_id_number'])

    if request.POST.get('name',False):

        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                          entry="姓名变更由: "+user_obj.name+" 变更为: "+request.POST.get('name'),
                          entry_img='None')

        user_obj.name=request.POST.get('name')
        user_obj.save()

    if request.POST.get('wages', False):
        print(type(request.POST.get('wages')),request.POST.get('wages'))
        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="工资变更由: " + str(user_obj.wages) + " 变更为: " + request.POST.get('wages'),
                                  entry_img='None')
        user_obj.wages = int(request.POST.get('wages'))
        user_obj.save()

    if request.POST.get('birth_date', False):
        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="出生日期变更由: " + str(user_obj.birth_date) + " 变更为: " + request.POST.get('birth_date'),
                                  entry_img='None')
        user_obj.birth_date = request.POST.get('birth_date')
        user_obj.save()

    if request.POST.get('date_of_joining', False):
        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="入职日期变更由: " + str(user_obj.date_of_joining) + " 变更为: " + request.POST.get('date_of_joining'),
                                  entry_img='None')
        user_obj.date_of_joining = request.POST.get('date_of_joining')
        user_obj.save()

    if request.POST.get('contact', False):
        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="联系方式变更由: " + user_obj.contact + " 变更为: " + request.POST.get('contact'),
                                  entry_img='None')
        user_obj.contact = request.POST.get('contact')
        user_obj.save()

    if request.POST.get('insurer', False):

        if request.POST.get('insurer') == '1':
            insurer = '已购买'
        else:
            insurer = '未购买'

        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="保险状态变更为: " + insurer,
                                  entry_img='None')

        user_obj.insurer = request.POST.get('insurer')
        user_obj.save()

    if request.POST.get('group', False):
        group_obj = group.objects.get(id=int(request.POST.get('group')))
        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="项目组由: "+user_obj.group.group_name+" 变更为: "+group_obj.group_name,
                                  entry_img='None')
        user_obj.group = group_obj
        user_obj.save()

    if request.POST.get('position', False):
        position_obj = position.objects.get(id=int(request.POST.get('position')))
        user_entry.objects.create(user_id_number=request.POST['modify_id_number'],
                                  entry="职位由: "+user_obj.position.position_name+" 变更为: "+position_obj.position_name,
                                  entry_img='None')
        user_obj.position = position_obj
        user_obj.save()

    return HttpResponse(json.dumps('ok'))