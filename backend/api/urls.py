from django.urls import path
from . import views

urlpatterns = [
    path("records/", views.RecordListCreate.as_view(), name= "record-list"),
    path("records/<int:pk>/", views.RecordDetail.as_view(), name= "record-detail"),
]