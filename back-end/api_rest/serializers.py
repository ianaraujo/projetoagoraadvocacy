from rest_framework import serializers
from .models import Propositions

class PropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Propositions
        fields= '__all__'
