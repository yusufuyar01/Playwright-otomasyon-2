# Playwright Regresyon Otomasyonu

Bu proje, Playwright kullanarak web uygulamalarının otomatik regresyon testlerini yazmak için oluşturulmuştur.

## Başlangıç

İlk olarak bilgisayarında Node.js yüklü olmalı. Kurulu değilse LTS (uzun vadeli destek) sürümünü indirip kur.

```bash
node -v
npm -v
```

İkinci olarak proje dizinine git ve roje klasörünün içinde şu komutu çalıştır:

```bash
npm install
```
Bu komut, proje için gereken tüm paketleri node_modules klasörüne yükler.

Playwright son sürüm Yükle

```bash

npm install playwright@latest
npx playwright install

```

## Test komutlarının çalıştırılması


```bash
npx playwright test tests/merchant/deneme.spec.ts --headed
```

Çalıştırmak iştediğiniz test dosyasının dizinini seçin. '--headed', otomasyon çalışırken ekranda canlı olarak çalıştırır.

## 

```bash
npx playwright codegen https://www.google.com/
```

Yazılan bağlantıyı bir pencerede açar ve otomasyon için gerekli olan locater parametrelerini gösterir.


## Klasörler
- `tests/` : Test dosyaları burada bulunur.
- `tests-examples/` : Örnek testler.
- `playwright.config.ts` : Playwright yapılandırma dosyası.

## Faydalı Komutlar
- Tüm testleri çalıştır: `npx playwright test`
- UI modunda başlat: `npx playwright test --ui`
- Debug modunda çalıştır: `npx playwright test --debug`

---

## Dosyalar

### /helpers

**Temel Yardımcı Fonksiyonlar:**
- `login.ts` : Her kod başında kullanılan giriş işlemleri için.
- `zoom.ts` : Otomasyonun tıklayacağı elemanlar ekranda görünmesi için ekran boyutunu ayarlamak için.

**Veri Üretim Fonksiyonları:**
- `ePostaUret.ts` : E-posta adresi üretimi için.
- `stringUret.ts` : Rastgele metin değerleri üretmek için.
- `tcknUret.ts` : TC Kimlik Numarası üretimi için.
- `telNoUret.ts` : Telefon numarası üretimi için.
- `vknUret.ts` : Vergi Kimlik Numarası üretimi için.

**İş Modülü Fonksiyonları:**
- `cihazIslemleri.ts` : Cihaz yönetimi işlemleri (ekleme, güncelleme, silme, atama işlemleri) için kapsamlı fonksiyonlar.
- `satisYerminaliIslemleri.ts` : Satış terminali işlemleri (mediator ekleme/güncelleme/silme, parametre işlemleri, doküman ön eki işlemleri) için fonksiyonlar.

**Örnek Dosyalar:**
- `ornek/` : Test sırasında kullanılan örnek dosyalar (JPEG, PDF, PNG formatlarında).


/tests <br <br>>
    /merchant <br>
    - `507-tuzel-mukellef-ekleme.spec.ts` 
    - `507-gercek-mukellef-ekleme.spec.ts` 
    - `509-tuzel-mukellef-ekleme.spec.ts` 
    - `509-gercek-mukellef-ekleme.spec.ts` 
    - `detay-payment-type-ekleme.spec.ts` 
    - `detay-e-belge-ayarları.spec.ts`  

!!! 507/509 mükellef ekleme gerek duyulmadı
!!! payment mediator (Ödeme Aracıları) uzun süreceğinden yapılmadı
!!! bayi ekranındaki grid filter kontrolü için otomasyona gerek duyulmadı
!!! Cihaz yönetimi ekranındaki excel export için otomasyona yapılamadı.
!!! Cihaz yönetimi ekranındaki grid filter kontrolü için otomasyona gerek duyulmadı




## Hazır otomasyon Komutları

çnce proje dizinine gidiniz, sonra komutları çalıştırınız


```bash

ilk 41 test admin login ile yapılmaktadır

admin/merchant
1-  npx playwright test tests/admin-login/merchant/507-tuzel-mukellef-ekleme.spec.ts --headed

2-  npx playwright test tests/admin-login/merchant/507-gercek-mukellef-ekleme.spec.ts --headed

3-  npx playwright test tests/admin-login/merchant/509-tuzel-mukellef-ekleme.spec.ts --headed

4-  npx playwright test tests/admin-login/merchant/509-gercek-mukellef-ekleme.spec.ts --headed

5-  npx playwright test tests/admin-login/merchant/detay-payment-type-ekleme.spec.ts --headed

6-  npx playwright test tests/admin-login/merchant/detay-e-belge-ayarlari.spec.ts --headed

7-  npx playwright test tests/admin-login/merchant/detay-entegrator-ekleme.spec.ts --headed

8-  npx playwright test tests/admin-login/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts --headed

9-  npx playwright test tests/admin-login/merchant/tip-vergi-tipi-ve-yetkili-bayi-degistirme.spec.ts --headed


admin/reseller
    
10- npx playwright test tests/admin-login/reseller/gercek-kisi-bayi-ekleme.spec.ts --headed

11- npx playwright test tests/admin-login/reseller/tuzel-kisi-bayi-ekleme.spec.ts --headed

12- npx playwright test tests/admin-login/reseller/bayi-guncelle.spec.ts --headed

13- npx playwright test tests/admin-login/reseller/detay-iletisim-bilgileri-ekleme-guncelleme.spec.ts --headed

14- npx playwright test tests/admin-login/reseller/detay-kullanici-ekleme-guncelleme.spec.ts --headed



admin/deviceadmin

15- npx playwright test tests/admin-login/device/bayiye-atanmamis-ve-uye-isyerine-atanmamis.spec.ts --headed

16- npx playwright test tests/admin-login/device/yeni-cihaz-ekle.spec.ts --headed

17- npx playwright test tests/admin-login/device/cihaz-guncelle.spec.ts --headed

18- npx playwright test tests/admin-login/device/cihazlari-bayiye-ata-1.spec.ts --headed

19- npx playwright test tests/admin-login/device/cihazlari-bayiye-ata-2.spec.ts --headed

20- npx playwright test tests/admin-login/device/uye-isyeri-olan-cihazlari-bayiye-ata.spec.ts --headed

21- npx playwright test tests/admin-login/device/bayiye-atali-cihazlari-bayiden-geri-al.spec.ts --headed

22- npx playwright test tests/admin-login/device/uye-isyerine-atali-cihazlari-bayiden-geri-al.spec.ts --headed

23- npx playwright test tests/admin-login/device/birden-fazla-cihaza-operasyonel-bayi-ata.spec.ts --headed

24- npx playwright test tests/admin-login/device/tek-cihaz-operasyonel-bayi-atama.spec.ts --headed

25- npx playwright test tests/admin-login/device/uye-isyerine-atanmis-cihazlari-uye-isyerine-ata.spec.ts --headed

26- npx playwright test tests/admin-login/device/cihazlari-507-uye-isyerine-ata.spec.ts --headed

27- npx playwright test tests/admin-login/device/cihazlari-509-uye-isyerine-ata.spec.ts --headed

28- npx playwright test tests/admin-login/device/cihazlari-507-uye-isyerine-ata-e-belge-var.spec.ts --headed

29- npx playwright test tests/admin-login/device/cihazlari-507-uye-isyerine-ata-e-belge-yok.spec.ts --headed



admin/salesTerminal

30- npx playwright test tests/admin-login/sales-terminal/terminal-guncelle.spec.ts --headed

31- npx playwright test tests/admin-login/sales-terminal/detay-mediator-islemleri.spec.ts --headed

32- npx playwright test tests/admin-login/sales-terminal/detay-dokuman-on-eki-islemleri.spec.ts --headed

33- npx playwright test tests/admin-login/sales-terminal/satislarim-filtrele.spec.ts --headed



admin/techpos

34- npx playwright test tests/admin-login/techpos/grup-ata-ve-terminal-guncelle.spec.ts --headed

35- npx playwright test tests/admin-login/techpos/techpos-islemleri-ekrani-filtre.spec.ts --headed

36- npx playwright test tests/admin-login/techpos/techpos-batch-ekrani-filtre.spec.ts --headed

37- npx playwright test tests/admin-login/techpos/batch-ozet-ve-islemler.spec.ts --headed

38- npx playwright test tests/admin-login/techpos/techpos-grup-ekrani-crud.spec.ts --headed

30- npx playwright test tests/admin-login/techpos/techpos-terminalde-tanimli-banka-listesi.spec.ts --headed
  
40- npx playwright test tests/admin-login/techpos/techpos-seri-no.spec.ts --headed
  
41- npx playwright test tests/admin-login/techpos/BKM-techpos-banka-pf-islem-listesi.spec.ts --headed



reseller/merchant

ilk 41 testten sonrası reseller login ile yapılmaktadır

42- npx playwright test tests/reseller-login/merchant/507-tuzel-mukellef-ekleme.spec.ts --headed

43- npx playwright test tests/reseller-login/merchant/507-gercek-mukellef-ekleme.spec.ts --headed

44- npx playwright test tests/reseller-login/merchant/509-tuzel-mukellef-ekleme.spec.ts --headed

45- npx playwright test tests/reseller-login/merchant/509-gercek-mukellef-ekleme.spec.ts --headed

46-npx playwright test tests/reseller-login/merchant/detay-iletisim-bilgisi-ekle-guncelle.spec.ts --headed

47- npx playwright test tests/reseller-login/merchant/detay-kullanici-ekle-guncelle-mail-at.spec.ts --headed

48- npx playwright test tests/reseller-login/merchant/detay-group-user.spec.ts --headed

49- npx playwright test tests/reseller-login/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts --headed

50- npx playwright test tests/reseller-login/merchant/detay-satis-uygulamalari.spec.ts --headed

51- npx playwright test tests/reseller-login/merchant/detay-odeme-tipleri.spec.ts --headed

52- npx playwright test tests/reseller-login/merchant/detay-odeme-aracilari-1.spec.ts --headed

53- npx playwright test tests/reseller-login/merchant/detay-odeme-aracilari-2.spec.ts --headed

54- npx playwright test tests/reseller-login/merchant/detay-entegrator.spec.ts --headed

55- npx playwright test tests/reseller-login/merchant/detay-e-belge-ayarlari.spec.ts --headed

56- npx playwright test tests/reseller-login/merchant/uye-isyeri-guncelle.spec.ts --headed

57- NPX playwright test tests/reseller-login/merchant/odemesi-olan-uye-isyeri-sil.spec.ts --headed

58- npx playwright test tests/reseller-login/device/cihazi-bayiye-ata.spec.ts --headed



reseller/device







    npx playwright codegen https://overpayresellerdemo.overtech.com.tr/Home/Dashboard/Index



```