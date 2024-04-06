from django.urls import path

from . import views

urlpatterns = [
    path('propositions/', views.getAllPropositions, name='get_all_propositions')
]
