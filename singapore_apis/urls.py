"""
URL configuration for singapore_apis project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
#from django.contrib.auth.views import LogoutView
from django.conf.urls import handler404
urlpatterns = [
    path('adminpanel/', admin.site.urls),
    #path('app/',include('auth_app.urls')),
    # Include the company app URLs
    path('', include('api.urls')),
    
    #path('accounts/', include('allauth.urls')), # all OAuth operations will be performed under this route
    #path('logout', LogoutView.as_view()) # default Django logout view at /logout
    
]
handler404 = 'api.views.error_404_view'