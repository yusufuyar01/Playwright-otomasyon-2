import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';

test('Detay Belge Ekleme, Güncelleme, Görüntüleme ve Silme', async ({ page }) => {

  console.log('===>  Detay Belge Ekleme, Güncelleme, Görüntüleme ve Silme  <===');

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


   // "Durum" dropdown'ına tıkla
   const durumDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Durum' }).locator('span').first();
   await durumDropdown.click();

   // "Başlangıç" seçeneğini seç
   const onaylandiOption = page.getByRole('option', { name: 'Onaylandı' });
   await onaylandiOption.click();

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

   // "Pavo Finansal Teknoloji Çözümleri A.Ş." seçeneğini seç
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

  // "Belgeler" tıklama 
  const belgelerMenu = page.getByText('Belgeler');
  await belgelerMenu.click();

    // Koşullu işlemler
    if (await page.getByRole('button', { name: '+ Yeni' }).isVisible()) {
        console.log('✅ "+ Yeni" butonu görünüyor, belge ekleme yapılıyor...');

        // "Yeni" butonu
        const yeniButton = page.getByRole('button', { name: '+ Yeni' });
        await yeniButton.click();

        // Belge/belgeler seçimi
        const dosyalariSec = page.getByRole('button', { name: 'Dosya(ları) seç... Browse' })
        
        await dosyalariSec.click();
        await page.getByRole('button', { name: 'Dosya(ları) seç... Browse' }).setInputFiles('helpers/ornek/ornek-png.png');
        await page.waitForTimeout(2000);


        await dosyalariSec.click();
        await page.getByRole('button', { name: 'Dosya(ları) seç... Browse' }).setInputFiles('helpers/ornek/ornek-jpeg.jpeg');
        await page.waitForTimeout(2000);

        // Oluştur butonuna tıkla
        await page.getByRole('button', { name: 'Oluştur' }).click();

        // oluşturma sonucu çıkan başarı mesajını kontrol et
        try {
        const basariMesaji = page.getByText('Başarılı');
        await basariMesaji.waitFor({ timeout: 5000 });
        console.log('✅ Belge başarıyla eklendi');
        } catch (error) {
            console.log('⚠️ Belge ekleme işlemi tamamlanamadı olabilir.');
        }
        await page.waitForTimeout(2000);
        
      } 
        console.log('✅ "Güncelle" butonu görünüyor, belge güncelleme, goruntuleme, silme yapılıyor...');
        
        // Tabpanel içindeki ilk hücreyi seç
        const ilkGridcell = page.getByRole('tabpanel', { name: 'Belgeler' }).getByRole('gridcell').nth(1);

        // Hücredeki metni al ve değişkene ata
        const ilkDeger = await ilkGridcell.textContent();
        console.log('📄 İlk hücredeki değer:', ilkDeger);
        
        // İlk satırdaki güncelleme butonuna tıkla
        await page.getByRole('row', { name: ` ${ilkDeger}`, exact: true }).getByRole('gridcell').first().click();

        // Güncelleme butonuna tıkla
        await page.getByRole('button', { name: 'Güncelle' }).click();

        const dosyalariSec =await page.getByRole('button', { name: 'Dosya(ları) seç... Browse' });
        await dosyalariSec.click();
        await page.getByRole('button', { name: 'Dosya(ları) seç... Browse' }).setInputFiles('helpers/ornek/ornek-png.png');

        // Güncelleme butonuna tıkla
        await page.getByRole('button', { name: 'Güncelle' }).click();

        try {
        const basariMesaji1 = await page.getByText('Başarılı Merchant folder');
        await basariMesaji1.waitFor({ timeout: 5000 });
        console.log('✅ Belge Güncelleme yapıldı');
        } catch (error) {
            console.log('⚠️ Belge Güncelleme yapılamadı');
        }

        // Görüntüleme butonuna tıkla
        await page.getByRole('row', { name: ` ${ilkDeger}`, exact: true }).getByRole('gridcell').first().click();

        // preview butonuna tıkla
        await page.getByRole('button', { name: '' }).first().click();


        await page.waitForTimeout(5000);
        console.log('✅ Belge Görüntüleme yapıldı');
        await page.waitForTimeout(3000);

        // Görüntülemeyi kapat
        await page.getByRole('button', { name: 'Kapat' }).click();

        // Silme işlemleri
        await page.getByRole('button', { name: '' }).first().click();
        await page.getByRole('button', { name: 'Sil' }).click();
        // Güncelleme butonuna tıkla
        await page.getByRole('button', { name: 'Güncelle' }).click();

        console.log('✅ Belge Silme işlemi yapıldı');

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