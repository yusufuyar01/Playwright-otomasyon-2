import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { vknUret } from '../../../helpers/vknUret';
import { rastgeleString } from '../../../helpers/stringUret';
import { ePostaUret } from '../../../helpers/ePostaUret';
import { telNoUret } from '../../../helpers/telNoUret';

test('Detay iletişim bilgisi ekleme ve güncelleme (reseller-login)', async ({ page }) => {

  console.log('===>  Detay iletişim bilgisi ekleme ve güncelleme (reseller-login)  <===');

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


  // ===== ADIM 3: Yeni üye işyeri Ekleme =====
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

   // "507/Mükellefi" seçeneğini seç
   const mukellefOption = page.getByRole('option', { name: '507-Mükellefi' });
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

     // Kısa Kod alanına isyeriAdi değerini yaz
     const kisaKodInput = page.locator('ot-data-entry-template').filter({ hasText: 'Kısa Kod' }).getByRole('textbox');
     await kisaKodInput.fill(isyeriAdi);
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
         console.log('✅ Başarılı: Üye İşyeri başarıyla eklendi! (507-Tüzel Mükellef)');
       } else {
         console.log('❌ Başarı mesajı bulunamadı');
       }
     } catch (error) {
       console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
     }

     await page.waitForTimeout(3000);

     //Tamam butonuna basılması
     const tamamButton = page.getByRole('button', { name: 'Tamam' });
     await tamamButton.click();

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

// yeni butonuna tıkla
await page.getByRole('button', { name: '+ Yeni' }).click();

// Ana iletişim seç
await page.getByText('Adres Tipi seçiniz...').click();


// 3 elemanlı veri kümesi
const dataSet = ['Adres', 'Telefon', 'Web'];

// Veri kümesinden rastgele seç
const randomIndex = Math.floor(Math.random() * dataSet.length);
const selectedOption = dataSet[randomIndex];
console.log(`🎯 Ana iletişim seçilen: ${selectedOption}`);

// Seçilen Seçeneğe Tıkla
if (selectedOption) {
  await page.getByRole('option', { name: selectedOption }).click();
} else {
  console.log('❌ Seçenek metni bulunamadı');
  return;
}
await page.waitForTimeout(1000);

  if (selectedOption == 'Adres') {
      // Adrese özel işlemler
      // Alt kontak tipi
      await page.locator('ot-data-entry-template').filter({ hasText: 'Alt Kontak Tipi' }).locator('span').nth(1).click();
      await page.getByRole('option', { name: 'Posta Adresi' }).click();

      // Ülke
      await page.locator('ot-data-entry-template').filter({ hasText: 'Ülke' }).locator('span').nth(1).click();
      await page.getByRole('searchbox', { name: 'Filter' }).fill('tü');
      await page.getByRole('option', { name: 'Türkiye' }).click();

      // şehir
      await page.locator('ot-data-entry-template').filter({ hasText: 'Şehir' }).locator('span').nth(1).click();
      await page.getByRole('option', { name: 'ADANA' }).click();

      // ilçe
      await page.locator('ot-data-entry-template').filter({ hasText: 'İlçe/Semt/Bölge' }).locator('span').nth(1).click();
      await page.getByRole('option', { name: 'KOZAN' }).click();

      // mahalle
      await page.locator('ot-data-entry-template').filter({ hasText: 'Mahalle' }).locator('span').nth(1).click();
      await page.getByRole('option', { name: 'AKKAYA MAH.' }).click();

      // Adres metni
      const adresMetni = rastgeleString(10);
      await page.getByRole('textbox').fill(adresMetni);

  } else if (selectedOption == 'Telefon') {
      // Telefon özel işlemler
       // Alt kontak tipi
       await page.locator('ot-phone-contact-entry span').nth(1).click();
       await page.getByRole('option', { name: 'Telefon', exact: true }).click();
      
       // telefon No
       const telefonNo = telNoUret();
       await page.getByRole('textbox').fill(telefonNo);

  } else if (selectedOption == 'Web') {
      // Web özel işlemler
      // Alt kontak tipi
      await page.locator('ot-web-contact-entry span').nth(1).click();
      await page.getByRole('option', { name: 'Web Sitesi' }).click();

      // adres
      const adres = rastgeleString(10);
      await page.locator('ot-data-entry-template').filter({ hasText: 'Adres' }).getByRole('textbox').fill(adres);

  } else {
    console.log('Bilinmeyen adres tipi:', selectedOption);
  }

  // Oluştur butonuna tıkla
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(1000);

  try {
    const basariMesaji = page.getByText('Başarılı Üye İşyeri İletişim');
    await basariMesaji.click();
    await basariMesaji.waitFor({ timeout: 5000 });
    console.log('✅ Başarılı: İletişim bilgisi başarıyla eklendi!');
  } catch (error) {
    console.log('❌ İletişim bilgisi ekleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }


  // ===== ADIM 5: Güncelleme İşlemi =====
    // const firstRowExpand = page.getByRole('row', { name: /Expand Details/ }).getByRole('button').nth(randomRowNumber);
    
    // eklenen iletişim bilgisi listenin en üstüne geldiğinden 0 indexli güncelle butonuna tıkla
    const iletisimSatiri = page.getByRole('row', { name: '' }).getByRole('button').nth(1);
                       
    await iletisimSatiri.click();
    await page.waitForTimeout(1000);

    if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Ana İletişimAdres' }).isVisible()) {
      // Adrese güncelleme özel işlemler
      // Adres metni
      const adresMetni = rastgeleString(10);
      await page.locator('ot-data-entry-template').filter({ hasText: 'Adres' }).getByRole('textbox').fill(adresMetni);
      console.log('Yeni adres:', adresMetni);

  } else if (await page.locator('ot-data-entry-template').filter({ hasText: 'Ana İletişimTelefon' }).isVisible()) {
      // Telefon güncelleme özel işlemler
      // telefon no
       const telefonNo = telNoUret();
       await page.getByRole('textbox').fill(telefonNo);
       console.log('Yeni telefon:', telefonNo);

  } else if (await page.locator('ot-dropdown-entry').filter({ hasText: 'Ana İletişimWeb' }).isVisible()) {
      // Web güncelleme özel işlemler
      // adres
      const adres = rastgeleString(10);
      await page.locator('ot-data-entry-template').filter({ hasText: 'Adres' }).getByRole('textbox').fill(adres);
      console.log('Yeni web adresi:', adres);
  } 


    // güncelle butonuna tıkla
    await page.getByRole('button', { name: 'Güncelle' }).click();
    await page.waitForTimeout(1000);


    try {
      const basariMesaji = page.getByText('Başarılı Üye İşyeri İletişim');
      await basariMesaji.click();
      await basariMesaji.waitFor({ timeout: 5000 });
      console.log('✅ Başarılı: İletişim bilgisi başarıyla güncellendi!');
    } catch (error) {
      console.log('❌ İletişim bilgisi güncelleme başarı mesajı kontrol edilirken hata oluştu:', error.message);
    }
  

      // ===== ADIM 7: Üye İşyeri Silme =====
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
  
  await page.pause();

}); 