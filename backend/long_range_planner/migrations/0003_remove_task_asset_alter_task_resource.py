# Generated by Django 4.0.4 on 2022-07-14 21:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('long_range_planner', '0002_task_asset_alter_task_resource'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='asset',
        ),
        migrations.AlterField(
            model_name='task',
            name='resource',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='long_range_planner.asset'),
        ),
    ]
