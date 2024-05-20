from urllib.parse import urlparse
import re
from .models import BusinessProfile
def calculate_total_amount(data):
    bui = BusinessProfile.objects.filter(id=1).first()
    total_amount = 0
    for details in data.values():
        if not details['flag'] and not details['selected_reports']:
            total_amount += int(bui.ProfilePrice)
        elif details['flag']:
            for selected_profile in details['selected_reports']:
                total_amount += int(selected_profile["ProfilePrice"])

    return total_amount

# Example usage:
# data = {
#     '5': {'company_id': '5', 'flag': False, 'selected_reports': [], 'company_name': 'AAA.DUCT.CLEANING CONTRACTOR'},
#     '1517': {'company_id': '1517', 'flag': True, 'selected_reports': ['7', '8', '32', '33', '34', '35', '67'], 'company_name': 'SINAR JAWA ABADI'}
# }

# total_amount = calculate_total_amount(data)
# print("Total amount:", total_amount)


def get_path_from_url(url):
    parsed_url = urlparse(url)
    #print(parsed_url)
    #print(parsed_url.path.lstrip('/').rsplit('-', 1)[0])
    return parsed_url.path.lstrip('/')#.rsplit('-', 1)[0]


def format_title(title):
    # Define regex pattern to match " LTD" and "LTD."
    #pattern = re.compile(r'(.*)(Pte\.?\s*Ltd\.?|PTE\.?\s*LTD\.?| LTD)(\.?)$', re.IGNORECASE)
    #pattern = re.compile(r'^(.*?)(Pte\.?\s*Ltd\.?|PTE\.?\s*LTD\.?| LTD\.?)(\.?)$', re.IGNORECASE)
    #pattern = re.compile(r'(.*?)(Pte\.?\s*Ltd\.?|PTE\.?\s*LTD\.?| LTD\.?|PVT\s*LTD)(\.?)$', re.IGNORECASE)
    pattern = re.compile(r'(.*?)(Pte\.?\s*Ltd\.?|PTE\.?\s*LTD\.?| LTD\.?|Pvt\.?\s*Ltd\.?|PVT\.?\s*LTD\.?)(\.?)$', re.IGNORECASE)
    #pattern = re.compile(r'(.*?)(Pte\.?\s*Ltd\.?|PTE\.?\s*LTD\.?| LTD\.?|Pvt\.?\s*LTD\.?)(\.?)$', re.IGNORECASE)


    # Replace any matched ending with "Pte Ltd" and add the fixed part
    modified_title = re.sub(pattern, r'\1 Pte Ltd - Corporate Profile and Financial Overview', title)

    # If no match found, append "Pte Ltd" to the title and add the fixed part
    if modified_title == title:
        modified_title += " Pte Ltd - Corporate Profile and Financial Overview"


    modified_string = re.sub(r'\s+', ' ', modified_title.strip())
    return modified_string  # Trim any extra whitespace and return



from django.core.mail import send_mail

def send_email(subject, message, toSendEmail, recipient_list):
    send_mail(subject, message, toSendEmail, recipient_list)


#----------------------------------------------------------working one 

# from django.db.models import Max
# from .models import SubpageVisit

# def get_total_visitors(request, subpage_url):
#     # Retrieve the visitor's IP address from the session
#     visitor_ip = request.session.get('visitor_ip')

#     # If the visitor's IP address is not stored in the session, retrieve it from the request
#     if not visitor_ip:
#         visitor_ip = request.META.get('REMOTE_ADDR')
#         request.session['visitor_ip'] = visitor_ip  # Store the IP address in the session

#     # Count total visitors and get the last visit timestamp for the specific subpage
#     total_visitors = SubpageVisit.objects.filter(visitor_identifier=visitor_ip, subpage_url=subpage_url).count()
#     last_visit_timestamp = SubpageVisit.objects.filter(visitor_identifier=visitor_ip, subpage_url=subpage_url).aggregate(last_visit=Max('timestamp'))['last_visit']

#     # Format the last visit timestamp to a human-readable format
#     last_visit = last_visit_timestamp.strftime("%d %b, %Y, %I:%M %p") if last_visit_timestamp else None

#     return total_visitors, last_visit







# def get_last_visit_and_total_visitors(request):
#     last_visit = request.last_visit  # Retrieve last visit time from request
#     request.session['last_visit'] = timezone.now().strftime("%d %b, %Y, %H:%M %p")  # Update session data

#     # Count visitors since a specific date July 30, 2023. (2023, 7, 30) curent is May 1,2024
#     since_date = timezone.datetime(2024, 5, 1)  # Date since which you want to count visitors
#     total_visitors = 0

#     for visit_time in request.session.values():
#         visit_datetime = timezone.datetime.strptime(visit_time, "%d %b, %Y, %H:%M %p")
#         if visit_datetime >= since_date:
#             total_visitors += 1


#     active_sessions = Session.objects.filter(expire_date__gte=timezone.now() - timezone.timedelta(days=1))

#     # Count unique visitors based on session key
#     total_visitors = unique_visitors_count = active_sessions.count()

#     return last_visit, total_visitors