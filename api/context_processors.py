from .models import SitesNames, SitesSettings
from django.db.models import Q
from django.http import request
# def header_footer_data(request):
#     # Fetch data here
#     domain = request.get_host()  # Get the domain from the request
#     domain = request.build_absolute_uri('/')[:-1] + '/'
#     print(domain)
#     try:
#         site = SitesNames.objects.get(Q(url=domain) | Q(ssl=domain))
#         email = SitesSettings.objects.get(site_id=site, site_variable_id__name='email').value

#     except (SitesNames.DoesNotExist, SitesSettings.DoesNotExist):
#         email = None

#     return {
#         'header_email': email,
#         'footer_email': email  # You might have different data for header and footer, adjust accordingly
#     }

def header_footer_data(request):
    # Fetch data here
    domain = request.build_absolute_uri('/')[:-1] + '/'  # Get the domain from the request
    
    site_variables = {
        'logo' : None,
        'whatsapp': None,
        'ga_code': None,
        'contact_page_link': None,
        'country_name': None,
        'phone2': None,
        'phone1': None,
        'address_contact_page': None,
        'halfdomain': None,
        'fulldomain': None,
        'email': None,
        'url' : None,
    }

    try:
        site = SitesNames.objects.get(Q(url=domain) | Q(ssl=domain))
        site_params = SitesSettings.objects.filter(site_id=site)
        if site_params.exists():
            for obj in site_params:
                variable_name = obj.site_variable_id.name
                if variable_name in site_variables:
                    site_variables[variable_name] = obj.value
        site_variables['url'] = domain[:-1]
    except (SitesNames.DoesNotExist, SitesSettings.DoesNotExist):
        pass

    return {'site_variables':site_variables}