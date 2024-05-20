from django.contrib import admin
from .models import BusinessProfile,SampleReport, SitesNames, SitesVariables, SitesSettings
from allauth.socialaccount.admin import SocialToken, SocialAccount, SocialApp
# Register your models here.
from django.contrib.sites.models import Site
from django.contrib.auth.models import Group
# class CustomSocialAccount(SocialAccount):
#     class Meta:
#         app_label = 'auth'  # Change the application group
#         verbose_name = 'Custom Social Account'  # Change the display name for single object
#         verbose_name_plural = 'Custom Social Accounts'  # Change the display name for plural objects
#         # If you want to change other meta options, you can add them here


class SocialAccountAdmin(admin.ModelAdmin):
    list_display = ('user', 'provider', 'last_login')  # Include last_login field
    class Meta:
        verbose_name = 'Custom Social Account'  # Change the display name for single object
        verbose_name_plural = 'Custom Social Accounts' 


admin.site.unregister(SocialToken)
admin.site.unregister(SocialAccount)
# admin.site.unregister(SocialApp)

# admin.site.register(CustomSocialAccount, SocialAccountAdmin)
admin.site.register(SocialAccount, SocialAccountAdmin)



# Unregister the Site model
admin.site.unregister(Site)
admin.site.unregister(Group)

#TESTING
#admin.site.register(SocialApp)
#admin.site.register(Site)


class BusinessProfileAdmin(admin.ModelAdmin):
    list_display = ('id','ProfileName', 'ProfilePrice','ProfileDelivery', 'ProfileDescription','ProfilVisibility' )  # Include last_login field
    class Meta:
        verbose_name = 'Business Profile'  # Change the display name for single object
        verbose_name_plural = 'Business Profiles' 


#admin.site.unregister(BusinessProfile)
admin.site.register(BusinessProfile,BusinessProfileAdmin)


class SampleReportAdmin(admin.ModelAdmin):
    list_display = ('id','ReportTitle', 'ReportUrl','ReportVisibility', )  # Include last_login field
    class Meta:
        verbose_name = 'Sample Report'  # Change the display name for single object
        verbose_name_plural = 'Sample Reports' 



admin.site.register(SampleReport,SampleReportAdmin)




# -------------------------------------Variables-----------------------------------------



# admin.site.unregister(SitesNames)
# admin.site.unregister(SitesVariables)



class SitesSettingsAccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'site_id', 'site_variable_id','value')  # Include last_login field
    class Meta:
        verbose_name = 'WebSite Setting'  # Change the display name for single object
        verbose_name_plural = 'Websites Settings' 


admin.site.register(SitesNames)
admin.site.register(SitesVariables)

#admin.site.unregister(SitesSettings)
admin.site.register(SitesSettings,SitesSettingsAccountAdmin)
