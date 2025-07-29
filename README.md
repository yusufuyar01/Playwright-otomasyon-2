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

/helpers

- `login.ts` : Her kod başında kullanılan giriş için.
- `zoom.ts` : Otomasyonun tıklayacağı elemanlar ekranda görünmesi gerekir. Ekranın boyutunu ayarlayabilmek için.
- `ePostaUret.ts` :E-posta üretimi için.
- `stringUret.ts` :Metin değerleri üretmek için.
- `tcknUret.ts` :Tcno üretimi için.
- `telNoUret.ts` :Telefon numarası üretimi için.
- `vknUret.ts` :Vergi No üretimi için.


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

/merchant
1-  npx playwright test tests/merchant/507-tuzel-mukellef-ekleme.spec.ts --headed

2-  npx playwright test tests/merchant/507-gercek-mukellef-ekleme.spec.ts --headed

3-  npx playwright test tests/merchant/509-tuzel-mukellef-ekleme.spec.ts --headed

4-  npx playwright test tests/merchant/509-gercek-mukellef-ekleme.spec.ts --headed

5-  npx playwright test tests/merchant/detay-payment-type-ekleme.spec.ts --headed

6-  npx playwright test tests/merchant/detay-e-belge-ayarlari.spec.ts --headed

7-  npx playwright test tests/merchant/detay-entegrator-ekleme.spec.ts --headed

8-  npx playwright test tests/merchant/detay-belge-ekleme-guncelleme-goruntuleme-silme.spec.ts --headed

9-  npx playwright test tests/merchant/tip-vergi-tipi-ve-yetkili-bayi-degistirme.spec.ts --headed


/reseller
    
10- npx playwright test tests/reseller/gercek-kisi-bayi-ekleme.spec.ts --headed

11- npx playwright test tests/reseller/tuzel-kisi-bayi-ekleme.spec.ts --headed

12- npx playwright test tests/reseller/bayi-guncelle.spec.ts --headed

13- npx playwright test tests/reseller/detay-iletisim-bilgileri-ekleme-guncelleme.spec.ts --headed

14- npx playwright test tests/reseller/detay-kullanici-ekleme-guncelleme.spec.ts --headed



/device

15- npx playwright test tests/device/bayiye-atanmamis-ve-uye-isyerine-atanmamis.spec.ts --headed

16- npx playwright test tests/device/yeni-cihaz-ekle.spec.ts --headed

17- npx playwright test tests/device/cihaz-guncelle.spec.ts --headed

18- npx playwright test tests/device/cihazlari-bayiye-ata-1.spec.ts --headed

19- npx playwright test tests/device/cihazlari-bayiye-ata-2.spec.ts --headed

20- npx playwright test tests/device/uye-isyeri-olan-cihazlari-bayiye-ata.spec.ts --headed

21- npx playwright test tests/device/bayiye-atali-cihazlari-bayiden-geri-al.spec.ts --headed

22- npx playwright test tests/device/uye-isyerine-atali-cihazlari-bayiden-geri-al.spec.ts --headed

23- npx playwright test tests/device/birden-fazla-cihaza-operasyonel-bayi-ata.spec.ts --headed

24- npx playwright test tests/device/tek-cihaz-operasyonel-bayi-atama.spec.ts --headed

25- npx playwright test tests/device/uye-isyerine-atanmis-cihazlari-uye-isyerine-ata.spec.ts --headed

26- npx playwright test tests/device/cihazlari-507-uye-isyerine-ata.spec.ts --headed

27- npx playwright test tests/device/cihazlari-509-uye-isyerine-ata.spec.ts --headed

28- npx playwright test tests/device/cihazlari-507-uye-isyerine-ata-e-belge-var.spec.ts --headed

29- npx playwright test tests/device/cihazlari-507-uye-isyerine-ata-e-belge-yok.spec.ts --headed



/techpos
30-

/salesTerminal

- npx playwright test tests/sales-terminal/terminal-guncelle.spec.ts --headed

- npx playwright test tests/sales-terminal/detay-mediator-islemleri.spec.ts --headed

- npx playwright test tests/sales-terminal/detay-dokuman-on-eki-islemleri.spec.ts --headed

- npx playwright test tests/sales-terminal/satislarim-filtrele.spec.ts --headed

    npx playwright codegen https://overpayresellerdemo.overtech.com.tr/Home/Dashboard/Index


```