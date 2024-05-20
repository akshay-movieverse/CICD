from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.urls import reverse
from .models import Company,BusinessProfile, SampleReport #, SubpageVisit
from django.forms.models import model_to_dict
# Create your views here.
from django.contrib.auth import logout
from django.db.models import Q
from django.conf import settings
import razorpay
from .utility import calculate_total_amount,get_path_from_url,format_title,send_email #,get_total_visitors#get_last_visit_and_total_visitors
#import re
from django.utils import timezone
from django.http import Http404


def search_suggestions(request):
    term = request.GET.get('term')
    # Fetch suggestions starting with the search term and prioritize them
    starting_with_term = Company.objects.filter(RegisteredName__istartswith=term).values_list('RegisteredName', 'URL')[:10]

    # Fetch suggestions containing the search term and prioritize them based on the term's position
    containing_term = Company.objects.filter(RegisteredName__icontains=term).exclude(RegisteredName__istartswith=term).values_list('RegisteredName', 'URL')[:10]

    # Sort suggestions containing the term based on the position of the term within the name
    containing_term = sorted(containing_term, key=lambda x: x[0].lower().index(term.lower()))

    # Combine and limit suggestions to a total of 10
    suggestions = list(starting_with_term) + list(containing_term)
    suggestions = suggestions[:10]

    # Convert suggestions into a list of dictionaries with 'label' and 'url' keys
    suggestions = [{'label': suggestion[0], 'url': request.build_absolute_uri('/' + str(get_path_from_url(suggestion[1])))} for suggestion in suggestions]
    
    return JsonResponse(suggestions, safe=False)




def home(request):

    cart_items = request.session.get('cart', {})
    # Pass the company data to the template for rendering
    context={'total_cart':len(cart_items)}
    return render(request,"home-new.html", context)


# def custom_handler404(request, exception):
#     return redirect(reverse('company-home'))




def company_detail(request, registered_name):

    registered_Url ='https://companieshouse.sg/' + registered_name
    registered_name_parts = registered_name.split('-')
    companies = Company.objects.filter(URL__iexact=registered_Url)

    
    if companies.exists():

        query = Q()
        for part in registered_name_parts:
            query |= Q(RegisteredName__icontains=part)
        
        matching_companies = Company.objects.filter(query).exclude(URL__startswith = registered_Url)[:3]
        matching_companies =[
            {'label': company.RegisteredName,  
             'url': request.build_absolute_uri('/'+get_path_from_url(company.URL)),
             'id': company.id} for company in matching_companies
        ]
        # If at least one company exists, get the first one (assuming unique RegisteredName values)
        company = companies.first()

        cart_items = request.session.get('cart', {})
        # Pass the company data to the template for rendering
        #title = company.RegisteredName
        title = format_title(company.RegisteredName)
        modified_title = title.replace(" - Corporate Profile and Financial Overview","")
        #print(modified_title.strip())


        buiPro = BusinessProfile.objects.filter(ProfilVisibility=1)
        samReport = SampleReport.objects.filter(ReportVisibility=1)

        context={'company': company,
                 "sample_repos": samReport,
                 "business_profiles":buiPro,
                 "matching_companies":matching_companies,
                 'cart_items': cart_items,
                 'total_cart':len(cart_items),
                 'title': modified_title}




        return render(request, 'company_detail.html', context)
    # else:
    #     # If no company exists, handle the case appropriately (e.g., return a different response)
    #    #return render(request, 'company_not_found.html')
    #    return redirect('company-home')
    #    #pass
    else:
        # If no company exists, raise Http404 to render a custom 404 page
        raise Http404("Company not found")
        #return render(request, '404.html', status=404)

def logout_view(request):
    logout(request)
    return redirect("/")









def add_to_cart_ajax(request):
    if request.method == 'POST':
        company_id = request.POST.get('company_id')
        comname = request.POST.get('comname')
        item_id = request.POST.get('item_id')

        # Retrieve or initialize the cart from the session
        cart = request.session.get('cart', {})
        xaction='add_to_cart'
        # Remove the item if it exists in the cart
        if company_id in cart:
            del cart[company_id]
            xaction = "remove_from_cart"

        else:
            cart[company_id] = {'company_id': company_id,'flag':False,'selected_reports': [] ,'company_name' : comname}  # Add new item to cart

        # if item_id not in cart:
        #     cart[company_id] = {'company_id': company_id}  # Add new item to cart
        
        # Save the updated cart back to the session
        request.session['cart'] = cart
        # Calculate total item count in the cart
        #item_count = sum(item['quantity'] for item in cart.values())
        item_count = len(cart)
        #print(cart)
        # Return success response with updated item count
        response_data = {
            'success': True,
            'item_count': item_count,
            'action': xaction,  # Example action
            'item_id': item_id  # Example new item ID
        }
        return JsonResponse(response_data)

    # Handle invalid requests (e.g., GET requests)
    return JsonResponse({'error': 'Invalid request method'}, status=400)




def checkout(request):
    if request.method == 'POST':
        # Retrieve selected report values
        selected_reports = request.POST.getlist('reports[]')
        #print(selected_reports)
        # Retrieve other form data
        report_type = request.POST.get('report_type')
        country = request.POST.get('country')
        company_id = request.POST.get('company_id')
        company_name = request.POST.get('company_name')

        # Process the form data as needed
        cart = request.session.get('cart', {})


        selectedBProfile = BusinessProfile.objects.filter(id__in=selected_reports)
        selected_b_profiles_list = [model_to_dict(b_profile) for b_profile in selectedBProfile]
        
        #print(selected_b_profiles_list)
        #print(cart)
        cart[company_id]= {'company_id': company_id,'flag':True ,'selected_reports': selected_b_profiles_list,'company_name': company_name} 

        request.session['cart'] = cart
        #cart[company_id] = {'company_id': company_id}  # Add new item to cart


        # Render the page with the updated data or perform any other action
        #print(f'checkOut: {cart}')
        # For example, you can pass the data to the template
        return redirect('check-out')
        
    cart_items = request.session.get('cart', {})
    buiPro = BusinessProfile.objects.filter(id=1).first()
    #print(buiPro)
    context={'cart_items':cart_items,"default_business_profile":buiPro,'total_cart':len(cart_items)}
    return render(request,"checkout-new.html",context)











def order_payment(request):
    # if request.method == "POST":
    #     #name = request.POST.get("name")
    #     amount = request.POST.get("amount")
    #     client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
    #     razorpay_order = client.order.create(
    #         {"amount": int(amount) * 100, "currency": "INR", "payment_capture": "1"}
    #     )
    #     # order = Order.objects.create(
    #     #     name=name, amount=amount, provider_order_id=payment_order["id"]
    #     # )
    #     # order.save()
    #     return render(
    #         request,
    #         "payment.html",
    #         {
    #             "callback_url": "http://" + "127.0.0.1:8000" + "/razorpay/callback/",
    #             "razorpay_key": settings.RAZORPAY_KEY_ID,
    #             "order": order,
    #         },
    #     )
    # return render(request, "payment.html")

    cart_items = request.session.get('cart', {})

    if cart_items:  # Check if cart_items is not empty
            
        if request.method == "POST":
            #name = request.POST.get("name")
            #amount = request.POST.get("amount")
            
            amount = calculate_total_amount(cart_items)

            # Create Razorpay order
            client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
            razorpay_order = client.order.create(
                {"amount": int(amount) * 100, "currency": "USD", "payment_capture": "1"}
            )

            # Create an Order object and save it
            #order = Order.objects.create(name=name, amount=amount, provider_order_id=razorpay_order["id"])

            # Construct Razorpay options
            razorpay_options = {
                'key': settings.RAZORPAY_KEY_ID,
                'amount': str(razorpay_order['amount']),  # Amount should be in paise
                'currency': razorpay_order['currency'],
                'name': 'Comapany Facts',  # Your/store name
                'order_id': razorpay_order['id'],
                'redirect': 'true',
                'callback_url': "http://127.0.0.1:8000/razorpay/callback/",  # Callback URL
            }

            # Return Razorpay options as JSON response
            return JsonResponse(razorpay_options)

        # If it's not a POST request, return an empty response
        return JsonResponse({}, status=400)
    
    
    else:
        # Return an empty response if cart_items is empty
        return JsonResponse({}, status=400)
    

from django.views.decorators.csrf import csrf_exempt
import json
@csrf_exempt
def callback(request):
    def verify_signature(response_data):
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        return client.utility.verify_payment_signature(response_data)
    
    def user_details(payment_id):#test
        client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))
        payment_details= client.payment.fetch(str(payment_id))
        payment_email= payment_details["email"]
        payment_phno = payment_details["contact"]
        print(payment_email,payment_phno)
        print(payment_details)
    
    if "razorpay_signature" in request.POST:
        payment_id = request.POST.get("razorpay_payment_id", "")
        provider_order_id = request.POST.get("razorpay_order_id", "")
        signature_id = request.POST.get("razorpay_signature", "")
        # order = Order.objects.get(provider_order_id=provider_order_id)
        # order.payment_id = payment_id
        # order.signature_id = signature_id
        # order.save()
        user_details(payment_id) #test
        if verify_signature(request.POST):
            # order.status = PaymentStatus.SUCCESS
            # order.save()
            return render(request, "thank-you-new.html", context={"status": 'SUCCESS'})
        else:
            # order.status = PaymentStatus.FAILURE
            # order.save()
            return render(request, "thank-you-new.html", context={"status": 'FAILURE'})
    else:
        payment_id = json.loads(request.POST.get("error[metadata]")).get("payment_id")
        provider_order_id = json.loads(request.POST.get("error[metadata]")).get(
            "order_id"
        )
        # order = Order.objects.get(provider_order_id=provider_order_id)
        # order.payment_id = payment_id
        # order.status = PaymentStatus.FAILURE
        # order.save()
        return render(request, "thank-you-new.html", context={"status": 'FAILURE'})
    



from django.http import request

from django.http import HttpResponseRedirect
@csrf_exempt
def google_one_tap_login(request):
    login_url = request.build_absolute_uri('/')[:-1]  + '/accounts/google/login/'
    #print("yes")
    return HttpResponseRedirect(login_url)




def about_us(request):
    cart_items = request.session.get('cart', {})
    context={'total_cart':len(cart_items)}
    return render(request, 'about-new.html',context)


def contact_us(request):
    cart_items = request.session.get('cart', {})
    context={'total_cart':len(cart_items)}
    return render(request, 'contact-new.html',context)

def privacy_policy(request):
    cart_items = request.session.get('cart', {})
    context={'total_cart':len(cart_items)}
    return render(request, 'privacy-new.html',context)


def refund_policy(request):
    cart_items = request.session.get('cart', {})
    context={'total_cart':len(cart_items)}
    return render(request, 'refund-policy.html',context)


def cookie_policy(request):
    cart_items = request.session.get('cart', {})
    context={'total_cart':len(cart_items)}
    return render(request, 'cookie-policy.html',context)




def web_terms(request):
    cart_items = request.session.get('cart', {})
    context={'total_cart':len(cart_items)}
    return render(request, 'terms.html',context)






from django.http import HttpResponseNotFound


def error_404_view(request, exception):
   
    # we add the path to the 404.html file
    # here. The name of our HTML file is 404.html
    return HttpResponseNotFound(render(request, '404.html'))
    #return render(request, '404.html', status=404)



# def thankyou(request):
#     return render(request,"thank-you.html")

from django.views.decorators.http import require_POST

@require_POST
def contact_us_email(request):

    login_url = request.build_absolute_uri('/')[:-1]
    name = request.POST.get('name')
    email = request.POST.get('email')
    phone_number = request.POST.get('phone_number')
    message = request.POST.get('message')

    # Construct email message
    email_subject = f'New Contact Form Submission from {name}'
    email_message = f'Website: {login_url}\nName: {name}\nEmail: {email}\nPhone Number: {phone_number}\n\nMessage:\n{message}'

    recipient_list = ['akshayrameshwar2017@gmail.com','team@companiesfacts.com']
    send_email(
        email_subject,
        email_message,
        settings.EMAIL_HOST_USER ,  # Replace with your email address
        recipient_list,  # Replace with recipient email address

    )

    return render(request,"thank-you.html")









































# def company_detail(request, registered_name):



#     # if request.path.endswith('/'):
#     #     return redirect(request.path.rstrip('/'))
    
#     # Split the registered_name by hyphen
#     registered_Url ='https://companieshouse.sg/' + registered_name
    
#     registered_name_parts = registered_name.split('-')
#     # Reconstruct the registered name by joining parts with space
#     registered_name = ' '.join(registered_name_parts)
    
#     pattern = re.escape(registered_Url) + r'\b'

#     # Query the database for companies with the reconstructed registered name
#     companies = Company.objects.filter(URL__regex=pattern)


#     #companies_queryset = [company for company in companies if ("https://companieshouse.sg/"+get_path_from_url(company.URL)) == registered_Url]
#     #companies = Company.objects.filter(id__in=[company.id for company in companies_queryset])
#     #print(companies_queryset)
#     # Check if any company exists with the specified registered name
#     if companies.exists():
#         # Retrieve the subpage URL from the request
#         subpage_url = companies.first().id  # You might need to adjust this depending on your URL structure

#         # Retrieve the visitor's IP address from the request
#         visitor_ip = request.META.get('REMOTE_ADDR')

#         # Check if a visit from the current visitor has already been recorded
#         existing_visit = SubpageVisit.objects.filter(Q(visitor_identifier=visitor_ip) & Q(subpage_url=subpage_url)).exists()

#         if not existing_visit:
#             # Record the visit to the subpage if it's the first visit from the visitor
#             SubpageVisit.objects.create(visitor_identifier=visitor_ip, subpage_url=subpage_url)

#         else:
#             existing_visit = SubpageVisit.objects.filter(Q(visitor_identifier=visitor_ip) & Q(subpage_url=subpage_url)).first()
#             existing_visit.timestamp = timezone.now()  # Assuming you've imported timezone from django.utils
#             existing_visit.save()
#         # Your other view logic here...

#         total_visitors, last_visit = get_total_visitors(request,subpage_url)



#         query = Q()
#         for part in registered_name_parts:
#             query |= Q(RegisteredName__icontains=part)
        
#         matching_companies = Company.objects.filter(query).exclude(URL__startswith = registered_Url)[:6]
#         matching_companies =[
#             {'label': company.RegisteredName,  
#              'url': request.build_absolute_uri('/'+get_path_from_url(company.URL)),
#              'id': company.id} for company in matching_companies
#         ]
#         # If at least one company exists, get the first one (assuming unique RegisteredName values)
#         company = companies.first()

#         cart_items = request.session.get('cart', {})
#         # Pass the company data to the template for rendering
#         #title = company.RegisteredName
#         title = format_title(company.RegisteredName)
#         modified_title = title.replace(" - Corporate Profile and Financial Overview","")
#         #print(modified_title.strip())


#         buiPro = BusinessProfile.objects.filter(ProfilVisibility=1)
#         samReport = SampleReport.objects.filter(ReportVisibility=1)

#         context={
#                 'last_visit': last_visit,
#                 'total_visitors': total_visitors,
#                 'company': company,
#                  "sample_repos": samReport,
#                  "business_profiles":buiPro,
#                  "matching_companies":matching_companies,
#                  'cart_items': cart_items,
#                  'total_cart':len(cart_items),
#                  'title': modified_title}




#         return render(request, 'company_detail.html', context)
#     else:
#         # If no company exists, handle the case appropriately (e.g., return a different response)
#        #return render(request, 'company_not_found.html')
#        return redirect('company-home')
#        #pass


# its the last one on 3-5-24 at 15:48
# def company_detail(request, registered_name):

#     #regex_pattern = fr'^https://companieshouse\.sg/{registered_name}-?\b'
#     #regex_pattern = fr'^https://companieshouse\.sg/{registered_name}$'
#     regex_pattern = fr'^https://companieshouse\.sg/{registered_name}(?:-[a-zA-Z0-9]+)?/?$'
#     # if request.path.endswith('/'):
#     #     return redirect(request.path.rstrip('/'))
    
#     # Split the registered_name by hyphen
#     registered_Url ='https://companieshouse.sg/' + registered_name
    
#     registered_name_parts = registered_name.split('-')
#     # Reconstruct the registered name by joining parts with space
#     registered_name = ' '.join(registered_name_parts)
    
#     pattern = re.escape(registered_Url) + r'\b'

#     # Query the database for companies with the reconstructed registered name
#     companies = Company.objects.filter(URL__regex=regex_pattern)

    
#     #companies_queryset = [company for company in companies if ("https://companieshouse.sg/"+get_path_from_url(company.URL)) == registered_Url]
#     #companies = Company.objects.filter(id__in=[company.id for company in companies_queryset])
#     #print(companies_queryset)
#     # Check if any company exists with the specified registered name
#     if companies.exists():

#         query = Q()
#         for part in registered_name_parts:
#             query |= Q(RegisteredName__icontains=part)
        
#         matching_companies = Company.objects.filter(query).exclude(URL__startswith = registered_Url)[:3]
#         matching_companies =[
#             {'label': company.RegisteredName,  
#              'url': request.build_absolute_uri('/'+get_path_from_url(company.URL)),
#              'id': company.id} for company in matching_companies
#         ]
#         # If at least one company exists, get the first one (assuming unique RegisteredName values)
#         company = companies.first()

#         cart_items = request.session.get('cart', {})
#         # Pass the company data to the template for rendering
#         #title = company.RegisteredName
#         title = format_title(company.RegisteredName)
#         modified_title = title.replace(" - Corporate Profile and Financial Overview","")
#         #print(modified_title.strip())


#         buiPro = BusinessProfile.objects.filter(ProfilVisibility=1)
#         samReport = SampleReport.objects.filter(ReportVisibility=1)

#         context={'company': company,
#                  "sample_repos": samReport,
#                  "business_profiles":buiPro,
#                  "matching_companies":matching_companies,
#                  'cart_items': cart_items,
#                  'total_cart':len(cart_items),
#                  'title': modified_title}




#         return render(request, 'company_detail.html', context)
#     else:
#         # If no company exists, handle the case appropriately (e.g., return a different response)
#        #return render(request, 'company_not_found.html')
#        return redirect('company-home')
#        #pass















# def search_suggestions(request):
#     term = request.GET.get('term')
#     suggestions = Company.objects.filter(RegisteredName__icontains=term).values_list('RegisteredName', flat=True)[:10]
#     return JsonResponse(list(suggestions), safe=False)

# def search_suggestions(request):
#     term = request.GET.get('term')
#     suggestions = Company.objects.filter(RegisteredName__icontains=term).values_list('RegisteredName', 'URL')[:10]
#     suggestions = [{'label': suggestion[0], 'url': request.build_absolute_uri('/' + str(get_path_from_url(suggestion[1])))} for suggestion in suggestions]
#     return JsonResponse(list(suggestions), safe=False)




# def search_suggestions(request):
#     term = request.GET.get('term')
    
#     # Filter companies where RegisteredName starts with the search term
#     starts_with = Company.objects.filter(RegisteredName__istartswith=term).values_list('RegisteredName', 'URL')
    
#     # Filter companies where RegisteredName contains the search term but doesn't start with it
#     contains = Company.objects.filter(RegisteredName__icontains=term).exclude(RegisteredName__istartswith=term).values_list('RegisteredName', 'URL')
    
#     # Combine both queryset results and order them by relevance
#     suggestions = (starts_with | contains).distinct().order_by('RegisteredName')[:10]
    
#     # Format suggestions
#     suggestions = [{'label': suggestion[0], 'url': request.build_absolute_uri('/' + str(get_path_from_url(suggestion[1])))} for suggestion in suggestions]
    
#     return JsonResponse(suggestions, safe=False)

# def search_suggestions(request):
#     term = request.GET.get('term')
    
#     # Filter suggestions by searching for the term in both registered name and URL
#     suggestions = Company.objects.filter(Q(RegisteredName__istartswith=term) | Q(RegisteredName__icontains=term)).values_list('RegisteredName', 'URL')[:12]

#     # Custom sorting logic: prioritize suggestions where the search term matches the beginning of the registered name
#     suggestions = sorted(suggestions, key=lambda x: x[0].lower().startswith(term.lower()), reverse=True)[:12]


#     # Format suggestions into JSON response
#     suggestions = [{'label': suggestion[0], 'url': request.build_absolute_uri('/' + str(get_path_from_url(suggestion[1])))} for suggestion in suggestions]

#     return JsonResponse(suggestions, safe=False)

# def search_suggestions(request):
#     term = request.GET.get('term')
    
#     # Filter suggestions starting with the search term
#     starting_with_term = Company.objects.filter(RegisteredName__istartswith=term).values_list('RegisteredName', 'URL')[:12]
    
#     # Filter suggestions containing the search term
#     containing_term = Company.objects.filter(RegisteredName__icontains=term).exclude(RegisteredName__istartswith=term).values_list('RegisteredName', 'URL')[:12]
    
#     # Combine and limit suggestions to a total of 10
#     suggestions = list(starting_with_term) + list(containing_term)
#     suggestions = suggestions[:12]

#     # Preprocess suggestions for consistency
#     suggestions = [{'label': suggestion[0], 'url': request.build_absolute_uri('/' + str(get_path_from_url(suggestion[1])))} for suggestion in suggestions]

#     return JsonResponse(suggestions, safe=False)

