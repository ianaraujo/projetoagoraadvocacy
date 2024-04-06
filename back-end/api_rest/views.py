from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Propositions
from .serializers import PropositionSerializer

import json


@api_view(['POST', 'GET'])
def propositions(request):
    if request.method == 'POST':
        newProposition= request.data
        if 'keyWords' in newProposition and newProposition['keyWords']!="":
            newProposition['keyWords']= json.dumps(newProposition['keyWords'])

        serializer= PropositionSerializer(data= newProposition)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        
        else:
            return Response(status= status.HTTP_400_BAD_REQUEST)


    elif request.method == 'GET':
        try:
            allPropositions= Propositions.objects.all()

            serializer= PropositionSerializer(allPropositions, many=True)
            return Response(serializer.data, status= status.HTTP_200_OK)
        except:
            return Response(status= status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(['PUT', 'GET', 'DELETE'])
def manageProposition(request, id):
    try:
        proposition= Propositions.objects.get(pk= id)
    except:
        return Response(status= status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        updatedProposition= request.data
        if 'keyWords' in updatedProposition and updatedProposition['keyWords']!="":
            updatedProposition['keyWords']= json.dumps(updatedProposition['keyWords'])
        serializer= PropositionSerializer(proposition, updatedProposition)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_202_ACCEPTED)
        
        else:
            return Response(status= status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'GET':
        try:
            serializer= PropositionSerializer(proposition)
            return Response(serializer.data, status= status.HTTP_200_OK)
        except:
            return Response(status= status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    elif request.method == 'DELETE':
        try:
            proposition.delete()
            return Response(status= status.HTTP_202_ACCEPTED)
        except:
            return Response(status= status.HTTP_500_INTERNAL_SERVER_ERROR)
        
