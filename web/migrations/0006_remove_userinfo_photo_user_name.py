# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2016-09-17 10:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0005_remove_user_info_age'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userinfo_photo',
            name='user_name',
        ),
    ]
