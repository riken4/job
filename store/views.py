from itertools import product
from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request, 'home.html') 

def fruits(request):
    # render the fruits page template
    return render(request, 'fruits.html')

def products(request):
    return render(request, 'products.html')


def product_detail(request):
    return render(request, 'product_detail.html')

def veg(request):
    return render(request, 'veg.html')

def flash_products(request):
    return render(request, 'flash_products.html')

def cart(request):
    return render(request, 'cart.html')

def user_home(request):
    return render(request, 'user_home.html')
