from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),

    path('recipes/', views.recipe_list_view, name='recipe_list'),
    path('recipes/<int:pk>/', views.recipe_detail_view, name='recipe_detail'),
    
    path('recipes/add/', views.add_recipe_view, name='add_recipe'),
    path('recipes/edit/<int:pk>/', views.edit_recipe_view, name='edit_recipe'),
    path('recipes/delete/<int:pk>/', views.delete_recipe_view, name='delete_recipe'),

    path('favorites/', views.favorites_view, name='favorites'),

    path('add-favorite/<int:recipe_id>/', views.add_to_favorites, name='add_to_favorites'),
    path('remove-favorite/<int:recipe_id>/', views.remove_from_favorites, name='remove_favorite'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)