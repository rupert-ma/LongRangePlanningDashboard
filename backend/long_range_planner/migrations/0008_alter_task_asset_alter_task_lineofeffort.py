# Generated by Django 4.0.4 on 2022-07-15 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('long_range_planner', '0007_alter_task_asset_alter_task_lineofeffort'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='asset',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='long_range_planner.asset'),
        ),
        migrations.AlterField(
            model_name='task',
            name='lineOfEffort',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='long_range_planner.lineofeffort'),
        ),
    ]
