from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Record(models.Model):
    creation_date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.CharField(max_length=225)
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=200)
    country = models.CharField(max_length=125)
    picture = models.ImageField(upload_to="uploads/records/", blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="records")

    def __str__(self):
        return self.first_name + "   " + self.last_name