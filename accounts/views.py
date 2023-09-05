from django.shortcuts import render
from rest_framework import viewsets,permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import BookSerializer, UserRegisterSerializer,UserLoginSerializer
from .models import Book, CustomUser
from django.contrib.auth import authenticate
# Create your views here.
from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
import datetime
class RegisterView(APIView):
    def post(self,request):
        data = request.data
        serializer = UserRegisterSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status":200,
                "data":"Successfully registered"
            })
        return Response("Email Already Exists")
# class LoginViewSet(viewsets.ModelViewSet):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserLoginSerializer
class BookViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class LoginView(APIView):
    def post(self,request):
        data = request.data
        serializer = UserLoginSerializer(data = data)
        try:
            if serializer.is_valid(raise_exception=True):
                user =serializer.check_user(data)
                token = RefreshToken.for_user(user)
                
                # token.set_exp(lifetime=datetime.timedelta(days=10))
                return Response({
                    "user":(user.id),
                    "access":str(token.access_token)
                    })
        except:
            return Response(data={"Invalid Email / Password "},status=400)

            
