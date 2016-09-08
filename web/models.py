from django.db import models

# Create your models here.

class group(models.Model):
    group_name = models.CharField(max_length=256)                                   #组名
    note = models.TextField()                                                       # 备注

class position(models.Model):
    position_name = models.CharField(max_length=256)                                #职位名称
    note = models.TextField()                                                       # 备注

class user_info(models.Model):
    name = models.CharField(max_length=256)                                         #姓名
    id_number = models.CharField(primary_key=True,max_length=256)                                    #身份证号码
    wages = models.IntegerField()                                                   #工资
    birth_date = models.DateTimeField()                                             #生日
    date_of_joining = models.DateTimeField()   #auto_now=True自动设置入职时间          #入职时间
    contact = models.CharField(max_length=256)                                      #联系方式
    insurer = models.IntegerField(max_length=2,default=0)                           #是否投保
    group = models.ForeignKey(group)                                                #项目组
    position = models.ForeignKey(position)                                          #是职位
    note = models.TextField()                                                       #备注
    display = models.IntegerField(max_length=2,default=1)                           #是否显示，用作删除属性

class userinfo_photo(models.Model):
    user_name = models.CharField(max_length=256)                                    #用户名称
    user_id_number =  models.CharField(max_length=256)                              #用户id_number
    user_photo_name =  models.CharField(max_length=256)                             #用户图片ID

class user_entry(models.Model):
    user_id_number = models.CharField(max_length=256)
    date = models.DateTimeField(auto_now = True)
    entry = models.CharField(max_length=4096)
    entry_img = models.CharField(max_length=256)

#update sqlite_sequence SET seq = 0 where name ='web_userinfo_photo'; 设置表内自增ID为0
#delete from web_user_info; 清空表内数据
#primary_key=True 主键不可重复
