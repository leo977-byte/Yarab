from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from .models import Recipe , Favorite

def home_view(request):
    return render(request, 'recipes/Home_Page.html')


def recipe_list_view(request):
    recipes = Recipe.objects.all()
    return render(request, 'recipes/Recipes_List.html', {'recipes': recipes})

def recipe_detail_view(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    return render(request, 'recipes/recipe-details.html', {'recipe': recipe})


def add_recipe_view(request):
    return render(request, 'recipes/ADD-Recipe.html')


def edit_recipe_view(request, id):
    return render(request, 'recipes/Edit_recipe.html')


def favorites_view(request):
    user_favorites = Favorite.objects.filter(user=request.user).order_by('-date_added')
    return render(request, 'recipes/Favorites.html', {'favorites': user_favorites})

def add_to_favorites(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    if recipe.favorites.filter(id=request.user.id).exists():
        messages.info(request, "This recipe is already in your favorites! ❤️")
    else:
        recipe.favorites.add(request.user)
        messages.success(request, "Added to favorites successfully! ✨")

    return redirect(request.META.get('HTTP_REFERER', 'recipe_list'))

def remove_from_favorites(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    recipe.favorites.remove(request.user)
    return redirect('favorites')