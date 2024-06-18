from django.contrib.auth.models import User
from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password" : {"write_only" : True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        extra_kwargs = {
            "owner" : {"read_only" : True},
            "receivedCash" : {"read_only" : True},
            "totalCash" : {"read_only" : True}
        }
    
    def create(self, validated_data):
        client = Client.objects.create(**validated_data)
        return client
    
class InvoiseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoise
        fields = '__all__'
        extra_kwargs = {
            "owner" : {"read_only" : True},
            "total_cash" : {"read_only": True}
        }

    def create(self, validated_data):
        invoise = Invoise.objects.create(**validated_data)
        return invoise
    
class SalariesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salaries
        fields = '__all__'
        extra_kwargs = {
            "owner" : {"read_only" : True},
        }

    def create(self, validated_data):
            salaries = Salaries.objects.create(**validated_data)
            return salaries
    
class InvoiseSalariesSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvoiseSalaries
        fields = '__all__'
        extra_kwargs = {
            "owner" : {"read_only" : True},
        }

    def create(self, validated_data):
            invoiseSalaries = InvoiseSalaries.objects.create(**validated_data)
            return invoiseSalaries
    
class ReceivedCashSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReceivedCash
        fields = '__all__'
        extra_kwargs = {
            "owner" : {"read_only" : True},
        }
    
    def create(self, validated_data):
            receivedCash = ReceivedCash.objects.create(**validated_data)
            return receivedCash
    
class AdditionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Additional
        fields = '__all__'
        extra_kwargs = {
             "owner" : {"read_only" : True},
             "total" : {"read_only" : True}
             }
        
    def create(self, validated_data):
        additional = Additional.objects.create(**validated_data)
        return additional