from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('', views.LinesOfEffort.as_view()),
    path('post/', views.LinesOfEffort.as_view()),
    path('asset/', views.Assets.as_view()),
    path('asset/post/', views.Assets.as_view()),
    path('tasks/', views.Tasks.as_view()),
    path('tasks/post/', views.Tasks.as_view()),
    path('tasks/<int:pk>', views.Tasks.as_view()),
    ]  