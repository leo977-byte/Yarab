from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from models import Recipe


def home_view(request):
    return render(request, 'Home_Page.html')


def recipe_list_view(request):
    recipes = Recipe.objects.all()
    return render(request, 'Recipes_List.html', {'recipes': recipes})


def signup_view(request):
    if request.method == 'POST':
        u = request.POST.get('username')
        e = request.POST.get('email')
        p = request.POST.get('password')
        cp = request.POST.get('confirm_password')
        role = request.POST.get('user_role')

        if p != cp:
            messages.error(request, "Passwords do not match!")
            return redirect('signup')

        if User.objects.filter(username=u).exists():
            messages.error(request, "Username already exists.")
            return redirect('signup')

        new_user = User.objects.create_user(username=u, email=e, password=p)
        if role == 'admin':
            new_user.is_staff = True
            new_user.save()

        messages.success(request, "Account created! Now you can log in.")
        return redirect('login')
    return render(request, 'Sign_up.html')


def login_view(request):
    if request.method == 'POST':
        u = request.POST.get('username')
        p = request.POST.get('password')
        user = authenticate(request, username=u, password=p)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, "Invalid username or password.")
    return render(request, 'log_in.html')


def logout_view(request):
    logout(request)
    return redirect('home')


# Add placeholders for the rest of the team
def add_recipe_view(request): return render(request, 'ADD-Recipe.html')


def favorites_view(request): return render(request, 'Favorites.html')

# Add this to the bottom of views.py
def edit_recipe_view(request, id):
    return render(request, 'Edit_recipe.html')