from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Record


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True} }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class RecordSerializer(serializers.ModelSerializer):
        model = Record
        fields =  ["id", "creation_date", "first_name", "last_name", "email", "phone", "address", "city", "state", "country", "picture", "user"]
        extra_kwargs = {"user": {"read_only": True} }