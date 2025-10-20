from django.urls import path
from . import views

app_name = 'book'

urlpatterns = [
    path('', views.index, name='index'),
    path('download/', views.download_book, name='download'),
    path('audio-test/', views.audio_test, name='audio_test'),
]












