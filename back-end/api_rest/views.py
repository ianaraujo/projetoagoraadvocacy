from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Propositions
from .serializers import PropositionSerializer


@api_view(['GET'])
def getAllPropositions():
    try:
        propositions= Propositions.objects.all()

        serializer= PropositionSerializer(propositions, many=True)
        return Response(serializer.data, status= status.HTTP_200_OK)
    except:
        return Response(status= status.HTTP_500_INTERNAL_SERVER_ERROR)
