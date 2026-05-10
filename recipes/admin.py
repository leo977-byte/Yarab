from django.contrib import admin
from .models import Recipe, Ingredient

class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 3  
    fields = ['name', 'quantity'] 

class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author') 
    inlines = [IngredientInline] 


admin.site.register(Recipe, RecipeAdmin)
