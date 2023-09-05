from django.urls import include, path
from .views import BookViewSet, RegisterView,LoginView
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

router.register(r'books',BookViewSet)
urlpatterns =[
    path('',include(router.urls)),
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
]