from rest_framework import serializers
from .models import CustomUser
from .models import Record


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "phone", "password"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class RecordSerializer(serializers.ModelSerializer):
        model = Record
        fields =  ["id", "creation_date", "first_name", "last_name", "email", "phone", "address", "city", "state", "country", "picture", "user"]
        extra_kwargs = {"user": {"read_only": True} }