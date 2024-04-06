from django.db import models

class Propositions(models.Model):
    
    id= models.AutoField(primary_key=True)
    name= models.CharField(max_length=24, unique=True, blank=False)
    url= models.URLField(max_length=200, unique=True, default="")
    keyWords= models.TextField(default="")