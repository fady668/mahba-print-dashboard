from decimal import Decimal
from django.db import models
from django.contrib.auth.models import User

class Client(models.Model):
    name = models.CharField(max_length=50, verbose_name="اسم العميل")
    phone = models.CharField(max_length=50, verbose_name="هاتف العميل", blank=True)
    receivedCash = models.DecimalField(verbose_name="النقديه المتبقيه", max_digits=15, decimal_places=2, default=Decimal(0.00))
    totalCash = models.DecimalField(verbose_name="اجمالي النقديه", max_digits=15, decimal_places=2, default=Decimal(0.00))
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="العملاء")

    def __str__(self):
        return self.name

class Invoise(models.Model):
    # Choices
    TARAF_CHOICES = [
        ("العميل" , "العميل"),
        ("المطبعة" , "المطبعة")
    ]
    TYPE_CHOICES = [
        ("كوشيه", "كوشيه"),
        ("طبع", "طبع"),
        ("استيكر", "استيكر"),
        ("دوبلكس", "دوبلكس"),
        ("برستول كوشيه", "برستول كوشيه")
    ]
    GROUPS_COUNT_CHOICES = [
        ("25", "25"),
        ("33", "33"),
        ("50", "50"),
        ("100", "100"),
        ("150", "150"),
        ("200", "200")
    ]
    SORTING_CHOICES = [
        ("اول", "اول"),
        ("اول + اخير", "اول + اخير"),
        ("اول + وسط + اخير", "اول + وسط + اخير"),
        ("اول + 2وسط + اخير", "اول + 2وسط + اخير"),
        ("اول + 3وسط + اخير", "اول + 3وسط + اخير")
    ]
    SLOFAN_CHOICES = [
        ("مط", "مط"),
        ("لامع", "لامع")
    ]
    TAKSIR_CHOICES = [
        ("كامل", "كامل"),
        ("نصف تكسيره", "نصف تكسيره"),
        ("ريجه", "ريجه")
    ]
    AKLASHEH_CHOICES = [
        ("بصمه", "بصمه"),
        ("كوفراج", "كوفراج"),
        ("بصمه و كوفراج", "بصمه و كوفراج")
    ]
    TAGLID_CHOICES = [
        ("كرتون", "كرتون"),
        ("لف", "لف"),
        ("لطش", "لطش"),
        ("دبوس", "دبوس"),
        ("لصق بونطه", "لصق بونطه"),
        ("غراء", "غراء")
        
    ]
    # TYPE_CHOICES = {
    #     "كوشيه" : ['90gm 70%', '115gm 70%', '130gm 70%', '150gm 70%', '170gm 70%', '200gm 70%', '250gm 70%', '300gm 70%', '350gm 70%', '90gm جاير', '115gm جاير', '130gm جاير', '150gm جاير', '170gm جاير', '200gm جاير', '250gm جاير', '300gm جاير', '350gm جاير'],
    #     "طبع" : ['70gm 70%', '80gm 70%', '100gm 70%', '120gm 70%', '70gm جاير', '80gm جاير', '100gm جاير', '120gm جاير', 'ورق كريمي', 'مكربن'],
    #     "استيكر" : ['بلاستيك ابيض', 'بلاستيك شفاف', 'فضي', 'ذهبي', 'ورق'],
    #     "دوبلكس" : ['220gm', '250gm', '300gm', '350gm'],
    #     "برستول كوشيه" : ['230gm 70%', '250gm 70%', '300gm 70%', '250gm جاير', '300gm جاير', '350gm 70%']
    # }

    name = models.CharField(max_length=100, verbose_name="اسم الفاتورة")
    date = models.DateField(verbose_name="التاريخ")
    done = models.BooleanField(default=False)
    # Paper
    paper_taraf = models.CharField(max_length=50, choices=TARAF_CHOICES, verbose_name="الورق طرف", blank=True)
    paper_count = models.IntegerField(verbose_name="عدد الافرخ", default=0, blank=True, null=True)
    paper_sal = models.DecimalField(max_digits=15, decimal_places=2, verbose_name="السعر", default=Decimal(0.00), blank=True, null=True)
    paper_type_one = models.CharField(max_length=50, choices=TYPE_CHOICES, verbose_name="نوع الورق", blank=True)
    paper_type_two = models.CharField(max_length=50, blank=True)
    paper_size_one = models.CharField(max_length=10, verbose_name="مقاس القص 1", blank=True)
    paper_size_two = models.CharField(max_length=10, verbose_name="مقاس القص 2", blank=True)
    # Zenk
    zenk_taraf = models.CharField(max_length=50, choices=TARAF_CHOICES, verbose_name="الزنك طرف", blank=True)
    zenk_count = models.IntegerField(default=int(0), blank=False)
    zenk_sal = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(42.5))
    # Print
    print_count_one = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    print_count_two = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    print_douple_face = models.BooleanField(default=False, verbose_name="تطبع و تقلب")
        # colors
    color_k = models.BooleanField(default=False)
    color_y = models.BooleanField(default=False)
    color_m = models.BooleanField(default=False)
    color_c = models.BooleanField(default=False)
    color_zahabi = models.BooleanField(default=False)
    color_faddi = models.BooleanField(default=False)
    color_sabgha = models.BooleanField(default=False)
    color_warnish = models.BooleanField(default=False)
    color_kohley = models.BooleanField(default=False)
    color_special = models.CharField(max_length=50, blank=True)
    color_back_k = models.BooleanField(default=False)
    color_back_y = models.BooleanField(default=False)
    color_back_m = models.BooleanField(default=False)
    color_back_c = models.BooleanField(default=False)
    color_back_zahabi = models.BooleanField(default=False)
    color_back_faddi = models.BooleanField(default=False)
    color_back_sabgha = models.BooleanField(default=False)
    color_back_warnish = models.BooleanField(default=False)
    color_back_kohley = models.BooleanField(default=False)
    color_back_special = models.CharField(max_length=50, blank=True)
    # Final Step
    daftar_count = models.CharField(max_length=50, blank=True)
    groups_count = models.CharField(max_length=50, blank=True, choices=GROUPS_COUNT_CHOICES)
    sorting = models.CharField(max_length=50, blank=True, choices=SORTING_CHOICES)
    counting = models.CharField(max_length=50, blank=True)
    slofan = models.CharField(max_length=50, blank=True, choices=SLOFAN_CHOICES)
    slofan_ckb = models.BooleanField(default=False)
    slofan_geha = models.CharField(max_length=50, blank=True)
    slofan_count = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    uv = models.CharField(max_length=50, blank=True)
    uv_ckb = models.BooleanField(default=False)
    uv_count = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    taksir = models.CharField(max_length=50, blank=True, choices=TAKSIR_CHOICES)
    taksir_ckb = models.BooleanField(default=False)
    taksir_count = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    forma = models.CharField(max_length=50, blank=True)
    forma_ckb = models.BooleanField(default=False)
    spot = models.CharField(max_length=50, blank=True)
    spot_ckb = models.BooleanField(default=False)
    film = models.CharField(max_length=50, blank=True)
    film_ckb = models.BooleanField(default=False)
    aklasheh = models.CharField(max_length=50, blank=True, choices=AKLASHEH_CHOICES)
    aklasheh_ckb = models.BooleanField(default=False)
    aklasheh_sal = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    basma = models.CharField(max_length=50, blank=True)
    basma_ckb = models.BooleanField(default=False)
    taglid = models.CharField(max_length=50, blank=True, choices=TAGLID_CHOICES)
    taglid_ckb = models.BooleanField(default=False)
    taglid_count = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    taglid_sal = models.DecimalField(max_digits=15, decimal_places=2, default=Decimal(0.00), blank=True, null=True)
    tawdib = models.CharField(max_length=50, blank=True)
    tawdib_ckb = models.BooleanField(default=False)
    nakl = models.CharField(max_length=50, blank=True)
    nakl_ckb = models.BooleanField(default=False)
    tasmim = models.CharField(max_length=50, blank=True)
    tasmim_ckb = models.BooleanField(default=False)
    khadamat = models.CharField(max_length=50, blank=True)
    khadamat_ckb = models.BooleanField(default=False)
    salk = models.CharField(max_length=50, blank=True)
    salk_ckb = models.BooleanField(default=False)
    kas = models.CharField(max_length=50, blank=True)
    kas_ckb = models.BooleanField(default=False)

    total_cash = models.DecimalField(default=Decimal(0.00), max_digits=10, decimal_places=2)
    remaining_cash = models.DecimalField(default=Decimal(0.00), max_digits=10, decimal_places=2)

    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="الفواتير")
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return self.name
    

class Salaries(models.Model):
    k_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    y_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    m_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    c_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    zahabi_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    faddi_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    sapgha_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    warnish_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    kohley_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    special_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    slofan_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    taksir_full_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    taksir_half_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    UV_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    film_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    zenk_sal = models.DecimalField(max_digits=15, decimal_places=1, blank=False, default=Decimal(0.00))
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class InvoiseSalaries(models.Model):
    k_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    y_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    m_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    c_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    zahabi_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    faddi_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    sapgha_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    warnish_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    kohley_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    special_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    slofan_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    taksir_full_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    taksir_half_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    UV_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    film_sal = models.DecimalField(max_digits=15, decimal_places=2, blank=False, default=Decimal(0.00))
    zenk_sal = models.DecimalField(max_digits=15, decimal_places=1, blank=False, default=Decimal(0.00))
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    invoise_name = models.CharField(max_length=50)
    invoise = models.ForeignKey(Invoise, on_delete=models.CASCADE, blank=False)

class ReceivedCash(models.Model):
    PUSH_WAY_CHOICES = [
        ("كاش", "كاش"),
        ("محفظه الكترونيه", "محفظه الكترونيه")
    ]
    PUSH_TO_CHOICES = [
        ("الفواتير", "الفواتير"),
        ("الاضافات", "الاضافات")
    ]

    received_value = models.DecimalField(max_digits=15, decimal_places=1, blank=False)
    date = models.DateTimeField(auto_now_add=True)
    push_to = models.CharField(max_length=50, choices=PUSH_TO_CHOICES, blank=False)
    push_way = models.CharField(max_length=50, choices=PUSH_WAY_CHOICES, blank=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Additional(models.Model):
    additional_type = models.CharField(max_length=50, blank=False, verbose_name="الصنف")
    count = models.IntegerField(blank=False, verbose_name="العدد")
    salary_of_one = models.DecimalField(max_digits=15, decimal_places=2, blank=False, verbose_name="سعر الوحده")
    total = models.CharField(max_length=50, verbose_name="الاجمالي")
    remaining_cash = models.DecimalField(default=Decimal(0.00), max_digits=10, decimal_places=2)
    done = models.BooleanField(default=False)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
