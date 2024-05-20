from django.urls import path,include


from . import views

urlpatterns = [
path('accounts/', include('allauth.urls')), # all OAuth operations will be performed under this route
    path('about-us', views.about_us, name='about-us'),
    path('contact-us', views.contact_us, name='contact-us'),
    path('privacy-policy', views.privacy_policy, name='privacy-policy'),
    path('refund-policy', views.refund_policy, name='refund-policy'),
    path('cookie-policy', views.cookie_policy, name='cookie-policy'),
    path('terms-conditions', views.web_terms, name='web-terms'),

    path('send-email/', views.contact_us_email, name='send-email'),

    path('logout/', views.logout_view, name="logout_view"),
    
    path('search-suggestions/', views.search_suggestions, name='search_suggestions'),
    path('add-to-cart/', views.add_to_cart_ajax, name='add_to_cart_ajax'),
    path("checkout/",views.checkout,name='check-out'),


    path('google_one_tap_login/',views.google_one_tap_login, name='google-one-tap-login' ),

    path("get-razorpay-options/",views.order_payment,name='get-razorpay-options'),
    path("razorpay/callback/", views.callback, name="callback"),


    path('<str:registered_name>', views.company_detail, name='company_detail'),

    
    path('', views.home, name='company-home'),

   # path('add-to-cart/', views.add_to_cart_ajax, name='add_to_cart_ajax'),

    #path('logout', views.glogout_view, name="logout_view"),
]






    #path('<str:registered_name>/', views.company_detail, name='company_detail'),
    #path('<int:id>/update/', CompanyUpdateAPIView(), name='company-update'),
    #path('list/', CompanyListAPIView(), name='company-list'),
    #path('<int:id>/delete/', CompanyDestroyAPIView(), name='company-delete'),
    