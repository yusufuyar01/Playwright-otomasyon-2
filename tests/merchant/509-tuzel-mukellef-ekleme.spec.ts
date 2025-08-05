import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';

// 509 Tüzel Mükellef Ekleme Testi
test('509 Tüzel Mükellef Ekleme Testleri', async ({ page }) => {

  console.log('===>  509 Tüzel Mükellef Ekleme  <===');

  
  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);


  // ===== ADIM 1: Dashboard'da Üye İşyeri Yönetimi Menüsünü Bulma =====
  // Üye işyeri yönetimi bul ve tıkla
  const uyeIsyeriYonetimi = page.locator('text="Üye İşyeri Yönetimi"'); 
  await uyeIsyeriYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Üye İşyeri Tıklama =====
  // Üye işyeri menü linkini bul ve tıkla (URL ile spesifik olarak hedefle)
  const uyeIsyeri = page.locator('a[href="/Merchant/Merchant/Index"]'); 
  await uyeIsyeri.click();
  await page.waitForTimeout(500);


  // ===== ADIM 3: Yeni Üye İşyeri Ekleme =====
  // Yeni üye işyeri ekleme butonunu bul ve tıkla
  const yeniUyeIsyeri = page.locator('text="Yeni Ekle"'); 
  await yeniUyeIsyeri.click();
  await page.waitForTimeout(1000);


  // ===== ADIM 4: Üye İşyeri Ekleme Formu Doldurulması =====

  // Vergi Tipi seçimi
  const taxType = page.locator('ot-data-entry-template').filter({ hasText: 'Vergi Tipi' }).locator('span').first();
  await taxType.click();

  // Varsayılan zaten tüzelde fakat gerçek için de tıklanıyor. Bu yüzden göstermek istedim.
  const taxTypeOption = page.getByRole('option').getByText('Tüzel');
  await taxTypeOption.click();

 
  // ===== ADIM 5: Vergi Dairesi Seçimi =====
  // Kendo searchbar combobox'ına tıkla
  const vergiDairesiCombobox = page.locator('kendo-searchbar').getByRole('combobox');
  await vergiDairesiCombobox.click();


  // "baş" yaz
  await vergiDairesiCombobox.fill('baş');
  await page.waitForTimeout(500);

  // "Başkent Vergi Dairesi" seçeneğine tıkla
  const baskVergiDairesi = page.getByText('Başkent Vergi Dairesi');
  await baskVergiDairesi.click();


   // VKN üret
   const vkn = await vknUret(page);
   console.log('Üretilen VKN:', vkn);
 
   // VKN alanına yaz
   const vknInput = page.locator('ot-data-entry-template').filter({ hasText: 'VKN'}).getByRole('textbox');
   await vknInput.fill(vkn);


   // Üye iş yeri adı , üye iş yeri kısa ad doldurulması
   const isyeriAdi = ("DENEME" + rastgeleString(5)).toUpperCase();
   const isyeriAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Üye İşyeri Ad'}).getByRole('textbox');
   await isyeriAdiInput.fill(isyeriAdi);
   const isyeriKisaAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Üye İşyeri Kısa Ad'}).getByRole('textbox');
   await isyeriKisaAdiInput.fill(isyeriAdi);


   // "Sektör" tıkla
   const sektorDropdown = page.getByText('Seçiniz...').first();
   await sektorDropdown.click();

   // "DENEME" seçeneğini seç
   const denemeOption = page.getByRole('option', { name: 'DENEME' });
   await denemeOption.click();


   // "Tip" tıkla
   const tip = page.locator('ot-data-entry-template').filter({ hasText: /^Tip$/ }).getByLabel('Select').first();
   await tip.click();

   // "509-Mükellefi" seçeneğini seç
   const mukellefOption = page.getByRole('option', { name: '509-Mükellefi', exact: true });
   await mukellefOption.click();


   // "Durum" dropdown'ına tıkla
   const durumDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Durum' }).locator('span').first();
   await durumDropdown.click();

   // "Başlangıç" seçeneğini seç
   const baslangicOption = page.getByRole('option', { name: 'Başlangıç' });
   await baslangicOption.click();

   // "Tercih Edilen Dil" dropdown'ına tıkla
   const tercihEdilenDil = page.locator('ot-data-entry-template').filter({ hasText: 'Tercih Edilen Dil' }).locator('span').nth(1);
   await tercihEdilenDil.click();

   // "Türkçe" seçeneğini seç
   const turkceOption = page.getByRole('option', { name: 'Türkçe' });
   await turkceOption.click();

   // "Şehir" dropdown'ına tıkla
   const sehirDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Şehir' }).locator('span').first();
   await sehirDropdown.click();

   // "ADANA" seçeneğini seç
   const adanaOption = page.getByRole('option', { name: 'ADANA' });
   await adanaOption.click();

    // "İlçe" dropdown'ına tıkla
   const ilceDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'İlçe' }).locator('span').first();
   await ilceDropdown.click();

   // "Kozan" seçeneğini seç
   const kozanOption = page.getByRole('option', { name: 'KOZAN' });
   await kozanOption.click();
   
    // "Mahalle" dropdown'ına tıkla
    const mahalleDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Mahalle' }).locator('span').first();
    await mahalleDropdown.click();
 
    // "Akkaya Mahallesi" seçeneğini seç
    const akkayaOption = page.getByRole('option', { name: 'AKKAYA MAH.' });
    await akkayaOption.click();

    // "Adres" alanına yaz
    const adresInput = page.locator('ot-address-contact-entry').getByRole('textbox');
    await adresInput.fill('Adres'); 

    //E-Posta Adresi alanınlarına yaz
    const uretilenEposta = ePostaUret();
    console.log('Üretilen E-posta:', uretilenEposta);
    
    
    // E-Posta Adresi alanlarına yaz
    const ePostaInput1 = page.locator('ot-panel').filter({ hasText: 'Üye İşyeri Bilgisi' }).getByPlaceholder('ornek@ornek.com');
    await ePostaInput1.fill(uretilenEposta);


    // Telefon Numarası Üret
    const uretilenTelNo = telNoUret();
    console.log('Üretilen Telefon Numarası:', uretilenTelNo);
    
    // Telefon Numarası alanını yaz
    const telNoInput1 = page.locator('ot-data-entry-template').filter({ hasText: 'Fatura Cep Telefonu' }).getByRole('textbox');
    await telNoInput1.fill(uretilenTelNo);


    // Çevrim Dışı İşlem Limiti alanına 1000 yaz
    const cevrimDisiIşlemLimiti = page.locator('ot-data-entry-template').filter({ hasText: 'Çevrim Dışı İşlem Limiti' }).getByRole('spinbutton');
    await cevrimDisiIşlemLimiti.fill('1000');

    // Çevrim Dışı Satış Limiti alanına 1000 yaz
    const cevrimDisiSatisLimiti = page.locator('ot-data-entry-template').filter({ hasText: 'Çevrim Dışı Satış Limiti' }).getByRole('spinbutton');
    await cevrimDisiSatisLimiti.fill('1000');

    // Çevrim Dışı Gün Limiti alanına 1000 yaz
    const cevrimDisiGunLimiti = page.locator('ot-data-entry-template').filter({ hasText: 'Çevrim Dışı Gün Limiti' }).getByRole('spinbutton');
    await cevrimDisiGunLimiti.fill('1000');
    

     // üye işyeri admin kullanıcısı (işyeri adı ile aynı değeri verdik)
    const adSoyadInput = page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı'}).getByRole('textbox');
    await adSoyadInput.fill(isyeriAdi);

    // E-Posta Adresi alanına yaz
    const ePostaInput2 = page.locator('ot-panel').filter({ hasText: 'Üye İşyeri Admin Kullanıcısı' }).getByPlaceholder('ornek@ornek.com');
    await ePostaInput2.fill(uretilenEposta);

    // Telefon Numarası alanına yaz
    const telNoInput2 = page.locator('ot-data-entry-template').filter({ hasText: 'Telefon Numarası' }).getByRole('textbox');
    await telNoInput2.fill(uretilenTelNo);


         // Oluştur butonuna tıkla
     const olusturButton2 = page.getByRole('button', { name: 'Oluştur' }).first();
     await olusturButton2.click();

     // Başarı mesajını kontrol et
     try {
       const basariMesaji = page.locator('.swal2-success-ring');
       await basariMesaji.waitFor();
       if (basariMesaji) {
         console.log('✅ Başarılı: Üye İşyeri başarıyla eklendi! (509-Tüzel Mükellef)');
       } else {
         console.log('❌ Başarı mesajı bulunamadı');
       }
     } catch (error) {
       console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
     }

     await page.reload();

     // Zoom işlemi
     await zoom(page);

     // ===== ADIM 6: Üye İşyeri Silme =====
     try {

        // İlk DENEME satırını bul ve expand details butonuna tıkla
        const expandButton = page.getByRole('row', { name: new RegExp(isyeriAdi) }).getByRole('button');
        await expandButton.click();

    } catch (error) {
      console.log(`❌ ${isyeriAdi} ile başlayan üye işyeri bulunamadı:`, error.message);
    }

    // Sil butonuna tıkla
    await page.getByRole('button', { name: 'Sil' }).click();

    await page.getByRole('button', { name: 'Evet' }).click();


    // Başarı mesajını kontrol et
      try {
        const basariMesaji = page.getByText('Başarılı Üye İşyeri başarıyla silindi.');
        await basariMesaji.waitFor();
        if (basariMesaji) {
          console.log('✅ Başarılı: Üye İşyeri başarıyla silindi!');
        } else {
          console.log('❌ Başarı mesajı bulunamadı');
        }
      } catch (error) {
        console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
      }

     // Test sonunda ekranın kapanmasını engellemek için pause
    await page.pause();

}); 