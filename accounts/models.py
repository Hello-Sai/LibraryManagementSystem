from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save(using = self.db)
		return user
	def create_superuser(self, email, password=None):
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user

# Create your models here.
class CustomUser(AbstractUser):
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    address = models.TextField()
    college = models.CharField(max_length=50)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def __str__(self):
        return self.email 
    

class Book(models.Model):
    user = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    title = models.CharField(max_length=20)
    category = models.CharField(max_length=20,choices=(
        ('Sci-Fi','ScienceFiction'),
        ('Fiction','Fiction'),
        ('Comedy','Comedy')
    ),default='Sci-Fi')
    description = models.TextField()

    def __str__(self) -> str:
        return self.title