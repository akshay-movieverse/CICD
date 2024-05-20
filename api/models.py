from django.db import models

class Company(models.Model):
    URL = models.CharField(max_length=255, null=True)
    RegisteredName = models.CharField(max_length=255, null=True)#,db_index=True
    RegistrationNumber = models.CharField(max_length=50, null=True)
    UENIssueDate = models.DateField(null=True)
    UENStatus = models.CharField(max_length=100, null=True)
    LegalEntityType = models.CharField(max_length=50, null=True)
    LegalEntityTypeSuffix = models.CharField(max_length=50, null=True)
    Town = models.CharField(max_length=100, null=True)
    CreatedAt = models.DateTimeField(null=True)
    UpdatedAt = models.DateTimeField(null=True)

    class Meta:
        managed = False
        db_table = 'Company'

    def __str__(self):
        return self.RegisteredName


class BusinessProfile(models.Model):
    ProfileName = models.CharField(max_length=200)
    ProfilePrice = models.IntegerField()
    ProfileDelivery = models.CharField(max_length=100,blank=True,null=True)
    ProfileDescription = models.TextField(blank=True,null=True)
    ProfilVisibility = models.IntegerField(default=1)  # Assuming visibility is boolean

    class Meta:
        managed = False
        db_table = 'business_profile'

    def __str__(self):
        return self.ProfileName
    





class SampleReport(models.Model):
    ReportTitle = models.CharField(max_length=200)
    ReportUrl = models.CharField(max_length=500,blank=True,null=True)
    ReportVisibility = models.IntegerField(default=1)

    class Meta:
        managed = False
        db_table = 'sample_reports'


    def __str__(self):
        return self.ReportTitle
    




# Variable Tables



class SitesNames(models.Model):
    store_id = models.AutoField(primary_key=True)  # Django will handle auto-incrementing
    name = models.CharField(max_length=255)
    url = models.CharField(max_length=255)
    ssl = models.CharField(max_length=255)
    is_active = models.BooleanField(default=False)
    #sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        managed = True
        db_table = 'sites_names'

    def __str__(self):
        return self.name

class SitesVariables(models.Model):
    id = models.AutoField(primary_key=True)  # Django will handle auto-incrementing
    name = models.CharField(max_length=255)
    #key = models.CharField(max_length=255)

    class Meta:
        managed = True
        db_table = 'sites_variables'

    def __str__(self):
        return self.name

class SitesSettings(models.Model):
    id = models.AutoField(primary_key=True)  # Django will handle auto-incrementing
    site_id = models.ForeignKey(SitesNames, on_delete=models.CASCADE)
    site_variable_id = models.ForeignKey(SitesVariables, on_delete=models.CASCADE)
    #key = models.CharField(max_length=255)
    value = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        managed = True
        db_table = 'sites_settings'

    def __str__(self):
        return str(self.site_variable_id)
    





# class SubpageVisit(models.Model):
#     visitor_identifier = models.CharField(max_length=50)  # Store IP address or session ID
#     subpage_url = models.CharField(max_length=500)  # Or use URLField if you want validation
#     timestamp = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         managed = True
#         db_table = 'subpagevisit'
    