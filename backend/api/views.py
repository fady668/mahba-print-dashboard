from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import *
from .serializers import *

# Client Views
class ClientsView(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Client.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class ClientView(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        pk = self.kwargs.get("pk")
        if pk:
            return Client.objects.filter(owner=self.request.user, id=pk)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class ClientsUpdateView(generics.UpdateAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Client.objects.filter(owner=self.request.user)

class ClientsDeleteView(generics.DestroyAPIView):
    serializer_class = ClientSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Client.objects.filter(owner=self.request.user)
    
# Invoise Views
class InvoisesView(generics.ListCreateAPIView):
    serializer_class = InvoiseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Invoise.objects.filter(owner=self.request.user)
    
    def perform_create(self, serializer):
      if serializer.is_valid():
        ClientModel = Client.objects.get(name=serializer.validated_data['client'])
        salariesModel = Salaries.objects.get(id=1)
        data = serializer.validated_data
    
        # Name counter
        invoiseModel = Invoise.objects.filter(owner=self.request.user, client=serializer.validated_data['client'])
        currentName = data.get('name')
        name_lst = []
        same_name_lst = []
        newName = ''

        for x in invoiseModel:
            name_lst.append(x.name)

        for n in name_lst:
            if (n.startswith(currentName) and " " not in n[len(currentName):]) :
                same_name_lst.append(n)
                
        else:
            newName = currentName

        if same_name_lst :
            n = same_name_lst[-1]
            if '(' in n:
                        n_p1 = n[:n.find('(')]
                        n_p2 = n[n.find('('):]
                        name_num = int(str(n_p2[1:]).strip(')'))

                        newName = currentName + f'({name_num + 1})'
            else:    
                newName = currentName + '(2)'

        serializer.validated_data['name'] = newName
        
        # Vars
        paper_taraf = data['paper_taraf']
        paper_count = data.get('paper_count')
        paper_sal = data.get('paper_sal')
        zenk_taraf = data['zenk_taraf'] 
        zenk_count = data.get('zenk_count')
        zenk_sal = data.get('zenk_sal')
        color_k = data['color_k']
        color_y = data['color_y']
        color_m = data['color_m']
        color_c = data['color_c']
        color_zahabi = data['color_zahabi']
        color_faddi = data['color_faddi']
        color_sabgha = data['color_sabgha']
        color_warnish = data['color_warnish']
        color_kohley = data['color_kohley']
        color_special = data['color_special']
        color_back_k = data['color_back_k']
        color_back_y = data['color_back_y']
        color_back_m = data['color_back_m']
        color_back_c = data['color_back_c']
        color_back_zahabi = data['color_back_zahabi']
        color_back_faddi = data['color_back_faddi']
        color_back_sabgha = data['color_back_sabgha']
        color_back_warnish = data['color_back_warnish']
        color_back_kohley = data['color_back_kohley']
        color_back_special = data['color_back_special']
        
        slofan_ckb = data['slofan_ckb']
        slofan_count = data.get('slofan_count')
        uv_ckb = data['uv_ckb']
        uv_count = data.get('uv_count')
        taksir_ckb = data['taksir_ckb']
        taksir_type = data.get('taksir')
        taksir_count = data.get('taksir_count')
        forma = data['forma']
        forma_ckb = data['forma_ckb']
        spot = data['spot']
        spot_ckb = data['spot_ckb']
        film = data.get('film')
        film_ckb = data['film_ckb']
        aklasheh_ckb = data['aklasheh_ckb']
        aklasheh_sal = data.get('aklasheh_sal')
        basma = data['basma']
        basma_ckb = data['basma_ckb']
        taglid_ckb = data['taglid_ckb']
        taglid_count = data.get('taglid_count')
        taglid_sal = data.get('taglid_sal')
        tawdib = data['tawdib']
        tawdib_ckb = data['tawdib_ckb']
        nakl = data['nakl']
        nakl_ckb = data['nakl_ckb']
        tasmim = data['tasmim']
        tasmim_ckb = data['tasmim_ckb']
        khadamat = data['khadamat']
        khadamat_ckb = data['khadamat_ckb']
        salk = data['salk']
        salk_ckb = data['salk_ckb']
        kas = data['kas']
        kas_ckb = data['kas_ckb']

        # Logic
        fatora_cash = 0
        paper_money = 0
        zenk_money = 0

        if paper_taraf == 'المطبعة':
            if paper_count and paper_sal:
                paper_money += float(paper_count * paper_sal)
        elif paper_taraf == 'العميل':
            paper_money = 0
        
        if zenk_taraf == 'المطبعة':
            if zenk_count and zenk_sal:
                zenk_money += float(zenk_count * zenk_sal)
        elif zenk_taraf == 'العميل' or not zenk_count or not zenk_sal:
            zenk_money = 0

        fatora_cash += (paper_money + zenk_money)

        color_cash = 0

        if color_k:
            color_cash += float(salariesModel.k_sal)
        if color_y:
            color_cash += float(salariesModel.y_sal)
        if color_m:
            color_cash += float(salariesModel.m_sal)
        if color_c:
            color_cash += float(salariesModel.c_sal)
        if color_zahabi:
            color_cash += float(salariesModel.zahabi_sal)
        if color_faddi:
            color_cash += float(salariesModel.faddi_sal)
        if color_sabgha:
            color_cash += float(salariesModel.sapgha_sal)
        if color_warnish:
            color_cash += float(salariesModel.warnish_sal)
        if color_kohley:
            color_cash += float(salariesModel.kohley_sal)
        if color_special:
            color_cash += float(salariesModel.special_sal)
        if color_back_k:
            color_cash += float(salariesModel.k_sal)
        if color_back_y:
            color_cash += float(salariesModel.y_sal)
        if color_back_m:
            color_cash += float(salariesModel.m_sal)
        if color_back_c:
            color_cash += float(salariesModel.c_sal)
        if color_back_zahabi:
            color_cash += float(salariesModel.zahabi_sal)
        if color_back_faddi:
            color_cash += float(salariesModel.faddi_sal)
        if color_back_sabgha:
            color_cash += float(salariesModel.sapgha_sal)
        if color_back_warnish:
            color_cash += float(salariesModel.warnish_sal)
        if color_back_kohley:
            color_cash += float(salariesModel.kohley_sal)
        if color_back_special:
            color_cash += float(salariesModel.special_sal)

        if data.get('print_count_two'):
            color_cash *= float(data.get('print_count_two'))

        if slofan_ckb:
            fatora_cash += (int(slofan_count) * float(salariesModel.slofan_sal))
        if uv_ckb:
            fatora_cash += (float(uv_count) * float(salariesModel.UV_sal))
        if taksir_ckb:
            if taksir_type == "كامل":
                fatora_cash += (float(taksir_count) * float(salariesModel.taksir_full_sal))      
            elif taksir_type == "نصف تكسيره": 
                fatora_cash += (float(taksir_count) * float(salariesModel.taksir_half_sal))      
            elif taksir_type == 'ريجه': 
                fatora_cash += (float(taksir_count)) * float(salariesModel.taksir_rega_sal)
        if forma_ckb:
            fatora_cash += float(forma)
        if spot_ckb:
            fatora_cash += float(spot)
        if film_ckb:
            fatora_cash += (float(salariesModel.film_sal) * float(film))
        if aklasheh_ckb:
            fatora_cash += float(aklasheh_sal)
        if basma_ckb:
            fatora_cash += float(basma)
        if taglid_ckb:
            fatora_cash += (float(taglid_count) * float(taglid_sal))
        if tawdib_ckb:
            fatora_cash += float(tawdib)
        if tasmim_ckb:
            fatora_cash += float(tasmim)
        if salk_ckb:
            fatora_cash += float(salk)
        if kas_ckb:
            fatora_cash += float(kas)
        if khadamat_ckb:
            fatora_cash += float(khadamat)
        if nakl_ckb:
            fatora_cash += float(nakl)
        
        total = fatora_cash + color_cash

        serializer.validated_data['total_cash'] = total
        serializer.validated_data['remaining_cash'] = total
        ClientModel.totalCash += Decimal(total)
        ClientModel.save()
        invoise = serializer.save(owner=self.request.user)

        # Create the invoise sals
        InvoiseSalaries.objects.create(
            k_sal = salariesModel.k_sal,
            y_sal = salariesModel.y_sal,
            m_sal = salariesModel.m_sal,
            c_sal = salariesModel.c_sal,
            zahabi_sal = salariesModel.zahabi_sal,
            faddi_sal = salariesModel.faddi_sal,
            sapgha_sal = salariesModel.sapgha_sal,
            warnish_sal = salariesModel.warnish_sal,
            kohley_sal = salariesModel.kohley_sal,
            special_sal = salariesModel.special_sal,
            slofan_sal = salariesModel.slofan_sal,
            taksir_full_sal = salariesModel.taksir_full_sal,
            taksir_half_sal = salariesModel.taksir_half_sal,
            taksir_rega_sal = salariesModel.taksir_rega_sal,
            UV_sal = salariesModel.UV_sal,
            film_sal = salariesModel.film_sal,
            zenk_sal = salariesModel.zenk_sal,
            owner = self.request.user,
            client = serializer.validated_data.get("client"),
            invoise_name = serializer.validated_data.get("name"),
            invoise = invoise,
        )

      else:
          print(serializer.errors)

class InvoisesClientView(generics.ListAPIView):
    serializer_class = InvoiseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        client = self.kwargs.get("cl")
        return Invoise.objects.filter(client=client)
    
class InvoisesUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = InvoiseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id = self.kwargs.get("pk")
        return Invoise.objects.filter(owner=self.request.user, id=id)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            ClientModel = Client.objects.get(name=serializer.validated_data['client'])
            data = serializer.validated_data
            InvoiseModel = Invoise.objects.get(id=self.kwargs.get("pk"))
            salariesModel = InvoiseSalaries.objects.get(invoise=self.kwargs.get("pk"))
            # Subtract the invoise cash from the Client cash
            ClientModel.totalCash -= Decimal(InvoiseModel.total_cash)
            # Name counter
            invoiseModel = Invoise.objects.filter(owner=self.request.user, client=serializer.validated_data['client'])
            currentName = data.get('name')
            name_lst = []
            same_name_lst = []
            newName = ''

            for x in invoiseModel:
                name_lst.append(x.name)
                
            if currentName in name_lst :
                name_lst.remove(currentName)

            for n in name_lst:
                if (n.startswith(currentName) and " " not in n[len(currentName):]) :
                    same_name_lst.append(n)
            else:
                newName = currentName
                
            if same_name_lst :
                n = same_name_lst[-1]
                if '(' in n:
                            n_p1 = n[:n.find('(')]
                            n_p2 = n[n.find('('):]
                            name_num = int(str(n_p2[1:]).strip(')'))

                            newName = currentName + f'({name_num + 1})'
                else:    
                    newName = currentName + '(2)'
            
            serializer.validated_data['name'] = newName
                
            # Vars
            paper_taraf = data['paper_taraf']
            paper_count = data.get('paper_count')
            paper_sal = data.get('paper_sal')
            zenk_taraf = data['zenk_taraf'] 
            zenk_count = data.get('zenk_count')
            zenk_sal = data.get('zenk_sal')
            color_k = data['color_k']
            color_y = data['color_y']
            color_m = data['color_m']
            color_c = data['color_c']
            color_zahabi = data['color_zahabi']
            color_faddi = data['color_faddi']
            color_sabgha = data['color_sabgha']
            color_warnish = data['color_warnish']
            color_kohley = data['color_kohley']
            color_special = data['color_special']
            color_back_k = data['color_back_k']
            color_back_y = data['color_back_y']
            color_back_m = data['color_back_m']
            color_back_c = data['color_back_c']
            color_back_zahabi = data['color_back_zahabi']
            color_back_faddi = data['color_back_faddi']
            color_back_sabgha = data['color_back_sabgha']
            color_back_warnish = data['color_back_warnish']
            color_back_kohley = data['color_back_kohley']
            color_back_special = data['color_back_special']
            
            slofan_ckb = data['slofan_ckb']
            slofan_count = data.get('slofan_count')
            uv_ckb = data['uv_ckb']
            uv_count = data.get('uv_count')
            taksir_ckb = data['taksir_ckb']
            taksir_type = data.get('taksir')
            taksir_count = data.get('taksir_count')
            forma = data['forma']
            forma_ckb = data['forma_ckb']
            spot = data['spot']
            spot_ckb = data['spot_ckb']
            film = data.get('film')
            film_ckb = data['film_ckb']
            aklasheh_ckb = data['aklasheh_ckb']
            aklasheh_sal = data.get('aklasheh_sal')
            basma = data['basma']
            basma_ckb = data['basma_ckb']
            taglid_ckb = data['taglid_ckb']
            taglid_count = data.get('taglid_count')
            taglid_sal = data.get('taglid_sal')
            tawdib = data['tawdib']
            tawdib_ckb = data['tawdib_ckb']
            nakl = data['nakl']
            nakl_ckb = data['nakl_ckb']
            tasmim = data['tasmim']
            tasmim_ckb = data['tasmim_ckb']
            khadamat = data['khadamat']
            khadamat_ckb = data['khadamat_ckb']
            salk = data['salk']
            salk_ckb = data['salk_ckb']
            kas = data['kas']
            kas_ckb = data['kas_ckb']

            # Logic
            fatora_cash = 0
            paper_money = 0
            zenk_money = 0

            if paper_taraf == 'المطبعة':
                if paper_count and paper_sal:
                    paper_money += float(paper_count * paper_sal)
            elif paper_taraf == 'العميل':
                paper_money = 0
            
            if zenk_taraf == 'المطبعة':
                if zenk_count and zenk_sal:
                    zenk_money += float(zenk_count * zenk_sal)
            elif zenk_taraf == 'العميل' or not zenk_count or not zenk_sal:
                zenk_money = 0

            fatora_cash += (paper_money + zenk_money)

            color_cash = 0

            if color_k:
                color_cash += float(salariesModel.k_sal)
            if color_y:
                color_cash += float(salariesModel.y_sal)
            if color_m:
                color_cash += float(salariesModel.m_sal)
            if color_c:
                color_cash += float(salariesModel.c_sal)
            if color_zahabi:
                color_cash += float(salariesModel.zahabi_sal)
            if color_faddi:
                color_cash += float(salariesModel.faddi_sal)
            if color_sabgha:
                color_cash += float(salariesModel.sapgha_sal)
            if color_warnish:
                color_cash += float(salariesModel.warnish_sal)
            if color_kohley:
                color_cash += float(salariesModel.kohley_sal)
            if color_special:
                color_cash += float(salariesModel.special_sal)
            if color_back_k:
                color_cash += float(salariesModel.k_sal)
            if color_back_y:
                color_cash += float(salariesModel.y_sal)
            if color_back_m:
                color_cash += float(salariesModel.m_sal)
            if color_back_c:
                color_cash += float(salariesModel.c_sal)
            if color_back_zahabi:
                color_cash += float(salariesModel.zahabi_sal)
            if color_back_faddi:
                color_cash += float(salariesModel.faddi_sal)
            if color_back_sabgha:
                color_cash += float(salariesModel.sapgha_sal)
            if color_back_warnish:
                color_cash += float(salariesModel.warnish_sal)
            if color_back_kohley:
                color_cash += float(salariesModel.kohley_sal)
            if color_back_special:
                color_cash += float(salariesModel.special_sal)

            if data.get('print_count_two'):
                color_cash *= float(data.get('print_count_two'))

            if slofan_ckb:
                fatora_cash += (int(slofan_count) * float(salariesModel.slofan_sal))
            if uv_ckb:
                fatora_cash += (float(uv_count) * float(salariesModel.UV_sal))
            if taksir_ckb:
                if taksir_type == "كامل":
                    fatora_cash += (float(taksir_count) * float(salariesModel.taksir_full_sal))      
                elif taksir_type == "نصف تكسيره": 
                    fatora_cash += (float(taksir_count) * float(salariesModel.taksir_half_sal))      
                elif taksir_type == 'ريجه': 
                    fatora_cash += (float(taksir_count)) * float(salariesModel.taksir_rega_sal)
            if forma_ckb:
                fatora_cash += float(forma)
            if spot_ckb:
                fatora_cash += float(spot)
            if film_ckb:
                fatora_cash += (float(salariesModel.film_sal) * float(film))
            if aklasheh_ckb:
                fatora_cash += float(aklasheh_sal)
            if basma_ckb:
                fatora_cash += float(basma)
            if taglid_ckb:
                fatora_cash += (float(taglid_count) * float(taglid_sal))
            if tawdib_ckb:
                fatora_cash += float(tawdib)
            if tasmim_ckb:
                fatora_cash += float(tasmim)
            if salk_ckb:
                fatora_cash += float(salk)
            if kas_ckb:
                fatora_cash += float(kas)
            if khadamat_ckb:
                fatora_cash += float(khadamat)
            if nakl_ckb:
                fatora_cash += float(nakl)

            total = fatora_cash + color_cash
    
            serializer.validated_data['total_cash'] = total
            serializer.validated_data['remaining_cash'] = total
            ClientModel.totalCash += Decimal(total)
            ClientModel.save()
            serializer.save(owner=self.request.user)
            
        else:
            print(serializer.errors)

class InvoisesDeleteView(generics.DestroyAPIView):
    serializer_class = InvoiseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Invoise.objects.filter(owner=self.request.user)
    
    def perform_destroy(self, instance):
        client = instance.client
        invoiseModel = Invoise.objects.filter(owner=self.request.user, client=client)
        invoisesalaries = InvoiseSalaries.objects.get(invoise=instance.id)
        client.totalCash -= instance.total_cash
        client.save()
        invoisesalaries.delete()
        instance.delete()
        
    
# Salaries Views
class SalariesView(generics.ListCreateAPIView):
    serializer_class = SalariesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Salaries.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else :
            print(serializer.errors)

class SalariesUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SalariesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Salaries.objects.filter(owner=self.request.user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else :
            print(serializer.errors)

# invoise Salaries
class InvoiseSalariesView(generics.ListCreateAPIView):
    serializer_class = InvoiseSalariesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return InvoiseSalaries.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else :
            print(serializer.errors)


class InvoiseSalariesByNameView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = InvoiseSalariesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        salsId = self.kwargs.get("pk")
        return InvoiseSalaries.objects.filter(id=salsId)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save(owner=self.request.user)
        else :
            print(serializer.errors)

class InvoiseSalariesDeleteView(generics.DestroyAPIView):
    serializer_class = InvoiseSalariesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        salsId = self.kwargs.get("pk")
        return InvoiseSalaries.objects.filter(id=salsId)

# Received Cash Views
class ReceivedCashView(generics.ListCreateAPIView):
    serializer_class = ReceivedCashSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ReceivedCash.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            data = serializer.validated_data
            client = Client.objects.get(name=data.get('client'))
            invoises = Invoise.objects.filter(client=data.get('client'))
            additionals = Additional.objects.filter(client=data.get('client'))
            # auto cashing logic
            client.totalCash -= Decimal(data.get('received_value'))
            client.receivedCash += Decimal(data.get('received_value'))
            inputVal = data.get('received_value')
            if data.get("push_to") == 'الفواتير':
                for x in invoises:
                    if inputVal:
                        if inputVal > x.remaining_cash:
                            inputVal -= x.remaining_cash
                            x.remaining_cash = 0
                            x.done = True
                        elif inputVal < x.remaining_cash:
                            x.remaining_cash -= inputVal
                            inputVal = 0
                        elif inputVal == x.remaining_cash:
                            inputVal = 0
                            x.remaining_cash = 0
                            x.done = True
                    x.save()
                    
            if data.get("push_to") == 'الاضافات':
                for x in additionals:
                    if inputVal:
                        if inputVal > x.remaining_cash:
                            inputVal -= x.remaining_cash
                            x.remaining_cash = 0
                            x.done = True
                        elif inputVal < x.remaining_cash:
                            x.remaining_cash -= inputVal
                            inputVal = 0
                        elif inputVal == x.remaining_cash:
                            inputVal = 0
                            x.remaining_cash = 0
                            x.done = True
                    x.save()
                
            client.save()
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)
    
class ReceivedCashByClientNameView(generics.ListAPIView):
    serializer_class = ReceivedCashSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        clientId = self.kwargs.get("cl")
        return ReceivedCash.objects.filter(client=clientId)
    
class ReceivedCashByIdView(generics.ListAPIView):
    serializer_class = ReceivedCashSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        cashId = self.kwargs.get("pk")
        return ReceivedCash.objects.filter(id=cashId)
    
# Additional Views
class AdditionalsView(generics.ListCreateAPIView):
    serializer_class = AdditionalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Additional.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            client = Client.objects.get(name=serializer.validated_data['client'])
            count = float(serializer.validated_data['count'])
            sal = float(serializer.validated_data['salary_of_one'])
            total = count * sal
            serializer.validated_data['total'] = total
            serializer.validated_data['remaining_cash'] = total
            client.totalCash += Decimal(total)
            client.save()
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)

class AdditionalsByClientIdView(generics.ListAPIView):
    serializer_class = AdditionalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        clientId = self.kwargs.get("cl")
        return Additional.objects.filter(client=clientId)
    
class AdditionalsByIdView(generics.ListAPIView):
    serializer_class = AdditionalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        id = self.kwargs.get("pk")
        return Additional.objects.filter(id=id)

class AdditionalsUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AdditionalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Additional.objects.filter(owner=self.request.user)
    
    def perform_update(self, serializer):
        if serializer.is_valid():
            client = Client.objects.get(name=serializer.validated_data['client'])
            currentAdd = Additional.objects.get(id=self.kwargs.get('pk'))
            client.totalCash -= Decimal(currentAdd.total)
            count = float(serializer.validated_data['count'])
            sal = float(serializer.validated_data['salary_of_one'])
            total = count * sal
            serializer.validated_data['total'] = total
            client.totalCash += Decimal(total)
            client.save()
            serializer.save(owner=self.request.user)
        else:
            print(serializer.errors)
            
    def perform_destroy(self, instance):
        client = instance.client
        client.totalCash -= Decimal(instance.total)
        client.save()
        instance.delete()

# For Registeration    
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    authentication_classes = [SessionAuthentication]
    serializer_class = UserSerializer
    permission_classes = [AllowAny]