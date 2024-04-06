from rest_framework import serializers
from .models import Propositions

class PropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model= Propositions
        Fields= '__all__'