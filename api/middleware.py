# custom middleware to add nonce to style tags and external stylesheets
import base64
import os
import re

class CSPMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # Generate nonce
        nonce = base64.b64encode(os.urandom(16)).decode('utf-8')

        # Add nonce to style tags
        if 'text/html' in response.get('Content-Type', ''):
            response.content = response.content.replace(
                b'<style>', f'<style nonce="{nonce}">'.encode('utf-8'))

        # Add nonce to script tags
        if 'text/html' in response.get('Content-Type', ''):
            response.content = response.content.replace(
                b'<script>', f'<script nonce="{nonce}">'.encode('utf-8'))
            
        # Add nonce to inline event handlers
        if 'text/html' in response.get('Content-Type', ''):
            response.content = re.sub(
                br'on[event]\s*=\s*["\'].*?["\']', 
                f'on[event]=" nonce-{nonce}"'.encode('utf-8'),
                response.content)
        
        # Add Content-Security-Policy header
        if 'Content-Security-Policy' not in response:
            response['Content-Security-Policy'] = f"default-src 'self'; script-src 'self' 'nonce-{nonce}'; style-src 'self' https://fonts.googleapis.com http://code.jquery.com 'nonce-{nonce}'"

        return response


from django.shortcuts import render
from django.http import HttpResponseNotFound

class Custom404Middleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Check if response status is 404
        if isinstance(response, HttpResponseNotFound):
            return render(request, '404.html', status=404)
        return response
# from django.utils import timezone

# class VisitorMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         if 'last_visit' in request.session:
#             last_visit = request.session['last_visit']
#             request.last_visit = last_visit
#         else:
#             request.last_visit = None

#         #kolkata_time = timezone.localtime(timezone.now(), timezone='Asia/Kolkata')
#         #request.last_visit = last_visit
#         print(timezone.now())
#         # # Update last visit time in session
#         # request.session['last_visit'] = timezone.now()

#         # response = self.get_response(request)

#         # return response
#                                             #timezone.now().
#         request.session['last_visit'] = timezone.now().strftime("%d %b, %Y, %H:%M %p")

#         response = self.get_response(request)

#         return response


# class VisitorMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         if 'last_visit' in request.session:
#             last_visit = request.session['last_visit']
#             request.last_visit = last_visit
#         else:
#             request.last_visit = None

#         # Increment visitor count
#         if 'visitors_count' in request.session:
#             request.session['visitors_count'] += 1
#         else:
#             request.session['visitors_count'] = 1
        
#         request.session['last_visit'] = timezone.now().strftime("%d %b, %Y, %H:%M %p")

#         response = self.get_response(request)

#         return response


# class CSPMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         response = self.get_response(request)

#         # Generate nonce
#         nonce = base64.b64encode(os.urandom(16)).decode('utf-8')

#         # Add nonce to style tags
#         if 'text/html' in response.get('Content-Type', ''):
#             response.content = response.content.replace(
#                 b'<style>', f'<style nonce="{nonce}">'.encode('utf-8'))

#         # Add Content-Security-Policy header
#         if 'Content-Security-Policy' not in response:
#             response['Content-Security-Policy'] = f"default-src 'self'; style-src 'self' https://fonts.googleapis.com http://code.jquery.com 'nonce-{nonce}'"

#         return response