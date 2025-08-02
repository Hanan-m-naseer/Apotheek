from django.contrib import admin
from .models import Category,Product,Gender

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Gender)
class GenderAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'gender', 'price', 'stock', 'size', 'color', 'created_at']
    list_filter = ['category', 'gender', 'size', 'color']
    search_fields = ['name', 'description']
