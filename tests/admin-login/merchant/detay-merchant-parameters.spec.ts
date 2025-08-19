import { test } from '@playwright/test';
import { login } from '../../../helpers/login';
import { tcknUret } from '../../../helpers/tcknUret';
import { rastgeleString } from '../../../helpers/stringUret';
import { ePostaUret } from '../../../helpers/ePostaUret';
import { telNoUret } from '../../../helpers/telNoUret';
import { zoom } from '../../../helpers/zoom';

test('Detay Merchant Parameters', async ({ page }) => {

  console.log('===>  Detay Merchant Parameters  <===');

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

   // Yeni üye işyeri ekleme butonunu bul ve tıkla
   const yeniUyeIsyeri = page.locator('text="Yeni Ekle"'); 
   await yeniUyeIsyeri.click();
   await page.waitForTimeout(1000);
 
 
   // ===== ADIM 3: Üye İşyeri Ekleme Formu Doldurulması =====
 
   // Vergi Tipi seçimi
   const taxType = page.locator('ot-data-entry-template').filter({ hasText: 'Vergi Tipi' }).locator('span').first();
   await taxType.click();
 
   // gerçek kullanıcı seç
   const taxTypeOption = page.getByRole('option').getByText('Gerçek');
   await taxTypeOption.click();
 
  
   // ===== ADIM 4: Vergi Dairesi Seçimi =====
   // Kendo searchbar combobox'ına tıkla
   const vergiDairesiCombobox = page.locator('kendo-searchbar').getByRole('combobox');
   await vergiDairesiCombobox.click();
 
 
   // "baş" yaz
   await vergiDairesiCombobox.fill('baş');
   await page.waitForTimeout(500);
 
   // "Başkent Vergi Dairesi" seçeneğine tıkla
   const baskVergiDairesi = page.getByText('Başkent Vergi Dairesi');
   await baskVergiDairesi.click();
 
 
    // TC No üret
    const tckn = await tcknUret(page);
    console.log('Üretilen TC No:', tckn);
  
    // TC No alanına yaz
    const tcknInput = page.locator('ot-alpha-entry').filter({ hasText: 'TCKN'}).getByRole('textbox');
    await tcknInput.fill(tckn);
 
 
    //Gerçek kişi adı ,soyadı ve iş yeri kısa adı
    const ad = ("DENEME" + rastgeleString(5)).toUpperCase();
    const adInput = page.locator('ot-data-entry-template').filter({ hasText: /^Ad$/ }).getByRole('textbox');
    await adInput.fill(ad);
    const soyadInput = page.locator('div').filter({ hasText: /^Soyad$/ }).getByRole('textbox');
    await soyadInput.fill(ad);
    const isyeriKisaAdiInput = page.locator('ot-data-entry-template').filter({ hasText: 'Üye İşyeri Kısa Ad'}).getByRole('textbox');
    await isyeriKisaAdiInput.fill(ad);
 
    // Fatura başlığı alanına yaz
    const faturaBasligi = page.locator('ot-data-entry-template').filter({ hasText: 'Fatura Başlığı'}).getByRole('textbox');
    await faturaBasligi.fill(ad);
 
    // "Sektör" tıkla
    const sektorDropdown = page.getByText('Seçiniz...').first();
    await sektorDropdown.click();
 
    // "DENEME" seçeneğini seç
    const denemeOption = page.getByRole('option', { name: 'DENEME' });
    await denemeOption.click();
 
 
    // "Tip" tıkla
    const tip = page.locator('ot-data-entry-template').filter({ hasText: /^Tip$/ }).getByLabel('Select').first();
    await tip.click();
 
    // "507/Mükellefi" seçeneğini seç
    const mukellefOption = page.getByRole('option', { name: '507-Mükellefi' });
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
 
    // "Entegratör" dropdown'ına tıkla
    const entegratorDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Entegratör' }).locator('span').nth(1);
    await entegratorDropdown.click();
    await page.waitForTimeout(500);
 
  // Pavo Finansal Teknoloji Çözümleri A.Ş." seçeneğini seç
  const pavoFinansalTeknolojiOption = page.getByRole('option', { name: 'Pavo Finansal Teknoloji Çözümleri A.Ş.' });
  await pavoFinansalTeknolojiOption.click(); 
  await page.waitForTimeout(500);
 
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
 
     // Ürün ekleme
     const urunEkle = page.getByRole('button', { name: '+ Yeni' });
     await urunEkle.click();
 
       // Ürün adı alanına yaz
     const urunAdiInput = page.locator('ot-data-entry-template').filter({ hasText: /^Adı$/ }).getByRole('textbox');
     await urunAdiInput.fill('Test Ürünü');
 
      // Vergi Grubu dropdown'ına tıkla
      const vergiGrubuDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Vergi Grubu' }).getByText('Seçiniz...');
      await vergiGrubuDropdown.click();
      await page.waitForTimeout(500);
 
      // "Müstahsil" seçeneğini seç
      const mustahsilOption = page.getByRole('option', { name: 'Müstahsil' });
      await mustahsilOption.click();
      await page.waitForTimeout(500);
 
      // Kısa Kod alanına ad değerini yaz
      const kisaKodInput = page.locator('ot-data-entry-template').filter({ hasText: 'Kısa Kod' }).getByRole('textbox');
      await kisaKodInput.fill(ad);
      await page.waitForTimeout(500);
 
      // Birim dropdown'ına tıkla
      const birimDropdown = page.locator('ot-data-entry-template').filter({ hasText: /^BirimSeçiniz\.\.\.$/ }).locator('span').first();
      await birimDropdown.click();
      await page.waitForTimeout(500);
 
      // "Paket" seçeneğini seç
      const paketOption = page.getByRole('option', { name: 'Paket' });
      await paketOption.click();
      await page.waitForTimeout(500);
 
      // Fiyatı alanına tıkla ve 1000 yaz
      const fiyatInput = page.locator('ot-data-entry-template').filter({ hasText: 'Fiyat' }).getByRole('spinbutton');
      await fiyatInput.click();
      await fiyatInput.fill('1000');
 
      // Başlangıç Tarihi alanına tıkla
      const baslangicTarihi = page.locator('ot-data-entry-template').filter({ hasText: 'Başlangıç Tarihi' }).getByLabel('Takvimden seç');
      await baslangicTarihi.click();
 
      // 11 Ocak 2025 tarihini seç
      const tarih11Ocak = page.getByRole('button', { name: 'Bugün' });
      await tarih11Ocak.click();
 
      // Bitiş Tarihi alanına tıkla
      const bitisTarihi = page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç');
      await bitisTarihi.click();
 
      // 31 Aralık 2025 Çarşamba tarihini seç
      const tarih31Aralik = page.getByRole('button', { name: 'Bugün' });
      await tarih31Aralik.click();
 
      // oluştur butonuna tıkla
      const olusturButton1 = page.getByRole('button', { name: 'Oluştur' }).nth(1);
      await olusturButton1.click();
 
      // üye işyeri admin kullanıcısı (işyeri adı ile aynı değeri verdik)
     const adSoyadInput = page.locator('ot-data-entry-template').filter({ hasText: 'Adı Soyadı'}).getByRole('textbox');
     await adSoyadInput.fill(ad);
 
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
          console.log('✅ Başarılı: Üye İşyeri başarıyla eklendi! (507-Gerçek Mükellef)');
        } else {
          console.log('❌ Başarı mesajı bulunamadı');
        }
      } catch (error) {
        console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
      }
 
      // tamam butonuna tıkla
      const tamamButton = page.getByRole('button', { name: 'Tamam' });
      await tamamButton.click(); 
 
        // sayfayı yenile
       await page.reload();
 
       // Zoom işlemi
       await zoom(page);
 
 
   // ===== ADIM 5: Detay Menü =====
   const firstRowExpand = await page.getByRole('row', { name: 'Expand Details  ' + ad }).getByLabel('Expand Details');
   await firstRowExpand.click();
 
   await page.getByText('Merchant Parameters').click();
   await page.waitForTimeout(1000);
   await page.getByText('✓✕').first().click();
   await page.getByRole('button', { name: 'Kaydet' }).click();
   await page.waitForTimeout(1000);

   try {
    const basariMesaji = page.getByText('Başarılı The Merchant');
    await basariMesaji.waitFor();
    if (basariMesaji) {
        console.log('✅ Başarılı: Üye İşyeri parametreleri başarıyla güncellendi (Harici satış iptalini etkinleştirildi)!');
        await basariMesaji.click();
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }

  await page.waitForTimeout(1000);
 
  await page.getByText('✓').first().click();
  await page.getByText('✓✕').nth(1).click();
  await page.getByRole('button', { name: 'Kaydet' }).click();
  await page.waitForTimeout(1000);

  try {
    const basariMesaji = page.getByText('Başarılı The Merchant');
    await basariMesaji.waitFor();
    if (basariMesaji) {
        console.log('✅ Başarılı: Üye İşyeri parametreleri başarıyla kaydedildi (Harici satış tamamlamayı etkinleştir)!');
        await basariMesaji.click();
    } else {
      console.log('❌ Başarı mesajı bulunamadı');
    }
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }

   



    // ===== ADIM 6: Üye İşyeri Silme =====
    try {
    // İlk DENEME satırını bul ve expand details butonuna tıkla
    const expandButton = page.getByRole('row', { name: new RegExp(ad) }).getByRole('button');
    await expandButton.click();
    
    } catch (error) {
      console.log(`❌ ${ad} ile başlayan üye işyeri bulunamadı:`, error.message);
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


