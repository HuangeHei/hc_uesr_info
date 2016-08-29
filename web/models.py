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
    id_number = models.CharField(max_length=256)                                    #身份证号码
    wages = models.IntegerField()                                                   #工资
    birth_date = models.DateTimeField()                                             #生日
    date_of_joining = models.DateTimeField(auto_now=True)                           #入职时间
    contact = models.CharField(max_length=256)                                      #联系方式
    age = models.IntegerField()                                                     #年龄
    insurer = models.IntegerField(max_length=2,default=0)                           #是否投保
    group = models.ForeignKey(group)                                                #项目组
    position = models.ForeignKey(position)                                          #是职位
    note = models.TextField()                                                       #备注
    display = models.IntegerField(max_length=2,default=1)                           #是否显示，用作删除属性

