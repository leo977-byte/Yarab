"""
URL configuration for djangoproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls),
]
from django.urls import path
import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('recipes/', views.recipe_list_view, name='recipe_list'),
    path('recipes/add/', views.add_recipe_view, name='add_recipe'),
    path('recipes/edit/<int:id>/', views.edit_recipe_view, name='edit_recipe'),
    path('favorites/', views.favorites_view, name='favorites'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
]