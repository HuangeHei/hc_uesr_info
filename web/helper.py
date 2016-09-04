#coding:utf-8
from django.shortcuts import render,render_to_response,redirect
from random import Random
from hc_user_info.settings import USER_PHOTO_PATH
from web.models import user_info,userinfo_photo,group,position,user_entry

def random_str(randomlength=28):#生成随机字符串 28位
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str += chars[random.randint(0, length)]
    return str

def is_login(session):#是否是登录状态判定

    if 'is_login' in session:

        if session['is_login']:
            return True
        else:
            return False
    else:
        return False


def upfile_save(file):#存储上传文件
    fileBuff = file.__str__()
    fileBuff = fileBuff.split('.')
    fileBuff[0] = random_str()
    filename = '%s.%s' %(fileBuff[0],fileBuff[1])

    with open(USER_PHOTO_PATH+filename,'wb+') as temp_fp:
        temp_fp.write(file.read())
    return filename

def add_user_info(request):#添加用户进入数据库


    if not request.FILES.get('upload_img', False):#检测是否传图片过来了
        file_name = 'pic_none'
    else:
        file_name = upfile_save(request.FILES['upload_img'])

    add_group = group.objects.get(id=int(request.POST['group']))
    add_position = position.objects.get(id=int(request.POST['position']))
    user_info.objects.create(name=request.POST['name'],
                             id_number=request.POST['id_number'],
                             wages=request.POST['wages'],
                             birth_date=request.POST['birth_date'],
                             date_of_joining=request.POST['date_of_joining'],
                             contact=request.POST['contact'],
                             age=request.POST['age'],
                             insurer=request.POST['insurer'],
                             group=add_group,
                             position=add_position,
    )

    userinfo_photo.objects.create(user_name=request.POST['name'],
                                  user_id_number=request.POST['id_number'],
                                  user_photo_name=file_name)

    user_entry.objects.create(user_id_number = request.POST['id_number'],
                             entry = '办理入职手续',
                             entry_img = 'None',
                             )


    '''
    user_list = user_info.objects.all().filter(group__group_name='公司总部')一对多关系中
    print(user_list[0].group.group_name)一对多关系中 获取到单个用户的对象只需要一对多键后面加"."索引就可以
    '''
    return True
