from django.urls import path

from . import views

urlpatterns = [
    path('propositions/', views.propositions, name='propositions'),
    path('propositions/<int:id>', views.manageProposition, name='manage_proposition')
]
