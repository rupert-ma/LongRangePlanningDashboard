from django.shortcuts import render
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import LineOfEffort, Asset, Task
from .serializers import LineOfEffortSerializer, AssetSerializer, TaskSerializer


# Create your views here.

class LinesOfEffort(APIView):
    def get(self, request):
        linesOfEfforts = LineOfEffort.objects.all()
        serializer = LineOfEffortSerializer(linesOfEfforts, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = LineOfEffortSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class Assets(APIView):
    def get(self, request):
        assets = Asset.objects.all()
        serializer = AssetSerializer(assets, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = AssetSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class Tasks(APIView):
    def get(self, request):
        assets = Task.objects.all()
        serializer = TaskSerializer(assets, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = TaskSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)