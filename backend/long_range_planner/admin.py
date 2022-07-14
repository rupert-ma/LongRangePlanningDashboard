from importlib.resources import Resource
from django.contrib import admin
from .models import LineOfEffort, Asset, Task


# Register your models here.
admin.site.register(LineOfEffort)
admin.site.register(Asset)
admin.site.register(Task)