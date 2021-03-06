from tkinter import CASCADE
from django.db import models

# Create your models here.


class LineOfEffort(models.Model):
    name = models.CharField(max_length=255)


class Asset(models.Model):
    name = models.CharField(max_length=255)


class Task(models.Model):
    name = models.CharField(max_length=255)
    resource = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    duration = models.IntegerField(null=True)
    percent_complete = models.IntegerField()
    dependencies = models.CharField(max_length=255, null=True)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE,related_name='assets')
    lineOfEffort = models.ForeignKey(
        LineOfEffort, on_delete=models.CASCADE, related_name='effort')
