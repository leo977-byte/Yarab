from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required, user_passes_test
from django.db.models import Q
from .models import Recipe, Ingredient, Favorite


def is_admin(user):
    return user.is_authenticated and user.is_staff


def signup_view(request):
    if request.method == 'POST':
        u = request.POST.get('username')
        e = request.POST.get('email')
        p = request.POST.get('password')
        role = request.POST.get('user_role')

        if User.objects.filter(username=u).exists():
            messages.error(request, "Username already taken!")
            return render(request, 'account/Sign_Up.html')

        # 1. Force permissions dynamically at creation time
        if role == 'admin':
            user = User.objects.create_superuser(username=u, email=e, password=p)
            user.save()

            login(request, user)
            return redirect('/admin/')  # Hardcoded direct path override
        else:
            user = User.objects.create_user(username=u, email=e, password=p)
            user.save()

            login(request, user)
            return redirect('home')

    return render(request, 'account/Sign_Up.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            if user.is_staff:
                return redirect('admin:index')  # Send admin to Django dashboard
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, 'account/log_in.html')


def logout_view(request):
    logout(request)
    messages.success(request, "Logged out successfully!")
    return redirect('login')


def home_view(request):
    # Fetch the 3 most recently added recipes from your database
    popular_recipes = Recipe.objects.all().order_by('-id')[:3]
    return render(request, 'recipes/Home_Page.html', {'recipes': popular_recipes})


def recipe_list_view(request):
    recipes = Recipe.objects.all()

    # Check if the user is a logged-in admin/staff member
    is_admin = request.user.is_authenticated and request.user.is_staff

    return render(request, 'recipes/Recipes_List.html', {
        'recipes': recipes,
        'is_admin': is_admin  # Pass this explicit flag directly to the HTML
    })

def recipe_detail_view(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    is_fav = False
    if request.user.is_authenticated and not request.user.is_staff:
        is_fav = Favorite.objects.filter(user=request.user, recipe=recipe).exists()
    
    # Calculate admin verification explicitly
    is_admin_user = request.user.is_authenticated and request.user.is_staff
    
    return render(request, 'recipes/recipe-details.html', {
        'recipe': recipe, 
        'is_favorite': is_fav,
        'is_admin': is_admin_user
    })


@login_required
@user_passes_test(is_admin)
def add_recipe_view(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        category = request.POST.get('category')
        instructions = request.POST.get('instructions')  # From the main textarea
        image = request.FILES.get('image')

        recipe = Recipe.objects.create(
            title=title,
            category=category,
            instructions=instructions,
            image=image
        )

        # Handle ingredients submitted via table inputs
        ing_names = request.POST.getlist('ing_name')
        ing_qtys = request.POST.getlist('ing_qty')
        has_table_ingredients = any(name.strip() for name in ing_names)

        if has_table_ingredients:
            for name, qty in zip(ing_names, ing_qtys):
                if name.strip():
                    Ingredient.objects.create(recipe=recipe, name=name.strip(), quantity=qty.strip())
        else:
            # Fallback for comma-separated ingredient textarea
            ingredients_text = request.POST.get('ingredients', '').strip()
            if ingredients_text:
                for line in ingredients_text.split(','):
                    line = line.strip()
                    if not line:
                        continue
                    parts = line.split(maxsplit=1)
                    if len(parts) == 2:
                        Ingredient.objects.create(recipe=recipe, name=parts[1].strip(), quantity=parts[0].strip())
                    else:
                        Ingredient.objects.create(recipe=recipe, name=line, quantity='')

        messages.success(request, "Recipe added successfully!")
        return redirect('recipe_list')

    return render(request, 'recipes/ADD-Recipe.html')


@login_required
@user_passes_test(is_admin)
def edit_recipe_view(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    if request.method == 'POST':
        recipe.title = request.POST.get('title')
        recipe.category = request.POST.get('category')
        recipe.instructions = request.POST.get('instructions')
        if request.FILES.get('image'):
            recipe.image = request.FILES.get('image')
        recipe.save()

        # Clear out old tabular ingredients and overwrite with current inputs
        recipe.ingredients_list.all().delete()
        ing_names = request.POST.getlist('ingredient_name[]')
        ing_qtys = request.POST.getlist('ingredient_qty[]')
        for name, qty in zip(ing_names, ing_qtys):
            if name.strip():
                Ingredient.objects.create(recipe=recipe, name=name.strip(), quantity=qty.strip())

        messages.success(request, "Recipe updated successfully!")
        return redirect('recipe_detail', pk=recipe.pk)

    return render(request, 'recipes/Edit_recipe.html', {'recipe': recipe})


@login_required
@user_passes_test(is_admin)
def delete_recipe_view(request, pk):
    recipe = get_object_or_404(Recipe, pk=pk)
    recipe.delete()
    messages.success(request, "Recipe deleted successfully.")
    return redirect('recipe_list')


@login_required
def favorites_view(request):
    if request.user.is_staff:
        messages.error(request, "Admins cannot access favorites.")
        return redirect('recipe_list')

    favorites = Favorite.objects.filter(user=request.user)
    return render(request, 'recipes/Favorites.html', {'favorites': favorites})


@login_required
def add_to_favorites(request, recipe_id):
    recipe = get_object_or_404(Recipe, id=recipe_id)
    if not request.user.is_staff:
        Favorite.objects.get_or_create(user=request.user, recipe=recipe)
        messages.success(request, f"Added {recipe.title} to your favorites!")
    return redirect('recipe_list')


@login_required
def remove_from_favorites(request, recipe_id):
    if request.user.is_staff:
        messages.error(request, "Admins cannot remove favorites.")
        return redirect('recipe_list')

    recipe = get_object_or_404(Recipe, id=recipe_id)
    Favorite.objects.filter(user=request.user, recipe=recipe).delete()
    messages.success(request, "Removed from favorites.")
    return redirect('favorites')