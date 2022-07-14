from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.LinesOfEffort.as_view()),
    path('post/', views.LinesOfEffort.as_view()),
    
    ]  