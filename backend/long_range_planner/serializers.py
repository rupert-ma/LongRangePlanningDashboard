from rest_framework import serializers
from .models import LineOfEffort, Resource, Task


class LineOfEffortSerializer(serializers.ModelSerializer):
    class Meta:
        model = LineOfEffort
        fields = ['id', 'name']
        

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'name']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'name', 'resource', 'start_date', 'end_date', 'duration', 'percent_complete', 'dependencies', 'resource_id', 'lineOfEffort_id']
        depth = 1
        
