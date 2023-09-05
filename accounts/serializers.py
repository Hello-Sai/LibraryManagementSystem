from rest_framework import serializers
from .models import Book, CustomUser
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.serializers import ValidationError
class UserRegisterSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = [ 'name', 'college','address', 'phone', 'email','password']

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self,data):
        try:
            user = CustomUser.objects.get(email=data['email'])
            assert user.password ==data["password"]
            return user
        except:
            raise  ValidationError("Invalid Email / Password")

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"