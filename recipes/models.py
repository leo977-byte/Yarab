from django.db import models
from django.contrib.auth.models import User


class Recipe(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    ingredients = models.TextField()
    instructions = models.TextField()
    image = models.ImageField(upload_to='recipes/', null=True, blank=True)

    def __str__(self):
        return self.title