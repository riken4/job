from django.urls import path
from . import views

app_name = 'store'

urlpatterns = [
     path('', views.home, name='home'),
    path('home/', views.home, name='home'),
    path('fruits/', views.fruits, name='fruits'),
    path('veg/', views.veg, name='veg'),
    path('products/', views.products, name='products'),
    path('product_detail/', views.product_detail, name='product_detail'),
    path('flash_products/', views.flash_products, name='flash_products'),
    path('cart/', views.cart, name='cart'),
    path('user_home/', views.user_home, name='user_home'),
    path('user_address/', views.user_address, name='user_address'),    
    path('user_order/', views.user_order, name='user_order'),    
    path('user_detail/', views.user_detail, name='user_detail'),    
    path('user_registration/', views.user_registration, name='user_registration'),      
 path('user/user_dashboard/', views.user_dashboard, name='user_dashboard'),
]