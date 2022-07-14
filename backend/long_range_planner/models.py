from django.db import models

# Create your models here.


class LineOfEffort(models.Model):
    name = models.CharField(max_length=255)


class Task(models.Model):
    name = models.CharField(max_length=255)
    resource = models.CharField(max_length=255)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    duration = models.IntegerField()
    percent_complete = models.IntegerField()
    dependencies = models.CharField(max_length=255)


class Resource(models.Model):
    name = models.CharField(max_length=255)
