from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Recipe

def home_view(request):
    return render(request, 'recipes/Home_Page.html')


def recipe_list_view(request):
    recipes = Recipe.objects.all()
    return render(request, 'recipes/Recipes_List.html', {'recipes': recipes})


def add_recipe_view(request):
    return render(request, 'recipes/ADD-Recipe.html')


def edit_recipe_view(request, id):
    return render(request, 'recipes/Edit_recipe.html')


def favorites_view(request):
    return render(request, 'recipes/Favorites.html')