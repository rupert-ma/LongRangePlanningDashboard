from asyncore import read
from rest_framework import serializers
from .models import LineOfEffort, Asset, Task
from django.db import models

class LineOfEffortSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineOfEffort
        fields = ['id', 'name']


class AssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asset
        fields = ['id', 'name']


class TaskSerializer(serializers.ModelSerializer):
    asset_id = serializers.IntegerField()
    lineOfEffort_id = serializers.IntegerField()
    class Meta:
        model = Task
        fields = ['id', 'name', 'resource', 'start_date', 'end_date', 'duration',
                  'percent_complete', 'dependencies', 'asset_id', 'lineOfEffort_id']
        depth = 1