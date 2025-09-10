from itertools import product
from unicodedata import category
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    context = {
        'featured_products': [],
        'categories': [],
        'cart': [],
        'search_query': '',
    }
    return render(request, 'home.html', context)


def product_list(request):
    return HttpResponse('Product list placeholder')


def about(request):
    return HttpResponse('About page placeholder')


def contact(request):
    return HttpResponse('Contact page placeholder')


def cart_detail(request):
    return HttpResponse('Cart detail placeholder')


def register(request):
    return HttpResponse('Register page placeholder')

