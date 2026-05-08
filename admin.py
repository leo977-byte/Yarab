from django.contrib import admin
from models import Recipe

# This line makes the Recipe model appear in the Admin Panel
admin.site.register(Recipe)