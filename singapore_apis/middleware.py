from django.conf import settings
from django.http import HttpResponseNotFound
import logging
logger = logging.getLogger(__name__)

class DomainRoutingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        host = request.get_host().split(':')[0]  # Remove port number if present
        logger.debug(f"Received request for domain: {host}")
        # Define domain to app mappings
        domain_to_app = {
            'taxtot.com': 'api',
            'companiesfact.shop': 'api',
            'kompanyreport.com': 'api',
            'companiesfacts.ca': 'hongkong',
        }

        if host in domain_to_app:
            request.urlconf = f'{domain_to_app[host]}.urls'
        else:
            return HttpResponseNotFound('Domain not configured')

        response = self.get_response(request)
        return response


# class DomainRouterMiddleware:
#     def __init__(self, get_response):
#         self.get_response = get_response

#     def __call__(self, request):
#         domain = request.META.get('HTTP_HOST', '')
#         if domain == 'taxtot.com':
#             from api import urls as api_urls
#             return api_urls
#         elif domain == 'companiesfacts.ca':
#             from hongkong import urls as hongkong_urls
#             return hongkong_urls
#         else:
#             return self.get_response(request)

