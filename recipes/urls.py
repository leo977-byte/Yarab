from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),

    path('recipes/', views.recipe_list_view, name='recipe_list'),
    path('recipes/add/', views.add_recipe_view, name='add_recipe'),
    path('recipes/edit/<int:id>/', views.edit_recipe_view, name='edit_recipe'),

    path('favorites/', views.favorites_view, name='favorites'),
]