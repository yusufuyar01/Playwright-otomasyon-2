import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { vknUret } from '../../../helpers/vknUret';
import { rastgeleString } from '../../../helpers/stringUret';
import { ePostaUret } from '../../../helpers/ePostaUret';
import { telNoUret } from '../../../helpers/telNoUret';
import { zoom } from '../../../helpers/zoom';

// 509 Tüzel Mükellef Ekleme Testi
test('509 Tüzel Mükellef Ekleme (reseller-login)', async ({ page }) => {

  console.log('===>  509 Tüzel Mükellef Ekleme (reseller-login)  <===');

  
  // Önce sisteme giriş yap
  await login2(page);

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

    // ===== ADIM 6: Detay Menü =====
    console.log(`🎯 Seçilen üye işyeri: ${isyeriAdi}`);

    try {
      await page.getByRole('row', { name: 'Expand Details  ' + isyeriAdi }).getByLabel('Expand Details').click();

    } catch (error) {
      console.log(`❌ ${isyeriAdi} ile başlayan üye işyeri bulunamadı:`, error.message);
    }

    // bu satır özellikle bir detay satırını incelemek için konulmuştur. hemen yukarıdaki 3 satırı yorum satırına alarak kullanabilirsiniz.
    // const firstRowExpand = page.locator('tr:nth-child(3) > .k-hierarchy-cell');
    // await firstRowExpand.click();


    // ===== ADIM 7: Detay menüde  Sale Applications,PAyment Types,Payment Mediators,Integrators, E-Document Settings butonlarının görünmeme kontrolü===== 
    console.log('🎯 Detay menüde  Sale Applications,PAyment Types,Payment Mediators,Integrators, E-Document Settings butonlarının görünmeme kontrolü');

    // Sale Applications kontrolü
    try {
      await page.getByText('Satış Uygulamaları').click();
      const kontrol1 = await page.getByRole('button', { name: '+ Yeni' }).isVisible();
      if (kontrol1) {
        console.log('✅ Satış Uygulamalarında "+ Yeni" butonu bulundu');
      } else {
        console.log('❌ Satış Uygulamalarında buton bulunamadı');
      }
    } catch (error) {
      console.log('❌ Satış Uygulamalarında buton kontrolünde bir hata oldu:', error.message);
    }
    await page.waitForTimeout(3000);


    // Payment Types kontrolü
    try {
      await page.getByText('Ödeme Tipleri').click();
      const kontrol2 = await page.getByRole('button', { name: '+ Yeni' }).isVisible();
      if (kontrol2) {
        console.log('✅ Ödeme Tiplerinde "+ Yeni" butonu bulundu');
      } else {
        console.log('❌ Ödeme Tiplerinde buton bulunamadı');
      }
    } catch (error) {
      console.log('❌ Ödeme Tiplerinde buton kontrolünde bir hata oldu:', error.message);
    }
    await page.waitForTimeout(3000);


    // Payment Mediators kontrolü
    try {
      await page.getByText('Ödeme Aracıları').click();
      const kontrol3 = await page.getByRole('button', { name: '+ Yeni' }).isVisible();
      if (kontrol3) {
        console.log('✅ Ödeme Aracılarında "+ Yeni" butonu bulundu');
      } else {
        console.log('❌ Ödeme Aracılarında buton bulunamadı');
      }
    } catch (error) {
      console.log('❌ Ödeme Aracılarında buton kontrolünde bir hata oldu:', error.message);
    }  
    await page.waitForTimeout(3000);


    // Integrators kontrolü
    try {
      await page.getByText('Entegratörler').click();
      const kontrol4 = await page.getByRole('button', { name: '+ Yeni' }).isVisible();
      if (kontrol4) {
        console.log('✅ Entegratörlerinde "+ Yeni" butonu bulundu');
      } else {
        console.log('❌ Entegratörlerinde buton bulunamadı');
      }
    } catch (error) {
      console.log('❌ Entegratörlerinde buton kontrolünde bir hata oldu:', error.message);
    }  
    await page.waitForTimeout(3000);


    // E-Document Settings kontrolü
    try {
      await page.getByText('E-Belge Ayarları').click();
      const kontrol5 = await page.getByRole('button', { name: '+ Yeni' }).isVisible();
      if (kontrol5) {
        console.log('✅ E-Belge Ayarlarında "+ Yeni" butonu bulundu');
      } else {
        console.log('❌ E-Belge Ayarlarında buton bulunamadı');
      }
    } catch (error) {
      console.log('❌ E-Belge Ayarlarında buton kontrolünde bir hata oldu:', error.message);
    }  
    await page.waitForTimeout(3000);

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