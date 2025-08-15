import { test, expect } from '@playwright/test';  
import { login, logout } from '../../../helpers/login';
import { login2, logout2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { tcknUret } from '../../../helpers/tcknUret';
import { rastgeleString } from '../../../helpers/stringUret';
import { ePostaUret } from '../../../helpers/ePostaUret';
import { telNoUret } from '../../../helpers/telNoUret';
import { cihazEkle } from '../../../helpers/cihazIslemleri';
import { uyeIsyeriEkle509Gercek, uyeIsyeriSil } from '../../../helpers/uyeIsyeriIslemleri';

test('Detay Ödeme Aracıları 2 (reseller login)', async ({ page }) => {

  console.log('===>  Detay Ödeme Aracıları 2 (reseller login)  <===');

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

  // // ===== ADIM 3: Yeni Üye İşyeri Ekleme =====
  // Yeni üye işyeri ekleme butonunu bul ve tıkla
  const yeniUyeIsyeri = page.locator('text="Yeni Ekle"'); 
  await yeniUyeIsyeri.click();
  await page.waitForTimeout(1000);


  // ===== ADIM 4: Üye İşyeri Ekleme Formu Doldurulması =====

  // Vergi Tipi seçimi
  const taxType = page.locator('ot-data-entry-template').filter({ hasText: 'Vergi Tipi' }).locator('span').first();
  await taxType.click();

  // gerçek kullanıcı seç
  const taxTypeOption = page.getByRole('option').getByText('Gerçek');
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

 // "509-Mükellefi" seçeneğini seç
 const mukellefOption = page.getByRole('option', { name: '509-Mükellefi', exact: true });
 await mukellefOption.click();


 // "Durum" dropdown'ına tıkla
 const durumDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Durum' }).locator('span').first();
 await durumDropdown.click();

 // "Onaylandı" seçeneğini seç
 const baslangicOption = page.getByRole('option', { name: 'Onaylandı' });
 await baslangicOption.click();


 // "Yetkili Kişi" dropdown'ına tıkla ve sipay pf seç
 const yetkiliKisiDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Yetkili BayiSeçiniz...' }).locator('span').first();
 await yetkiliKisiDropdown.click();
 await page.getByRole('searchbox', { name: 'Filter' }).fill('sipay pf');
 await page.getByRole('option', { name: 'Sipay PF' }).click();


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
       console.log('✅ Başarılı: Üye İşyeri başarıyla eklendi! (509-Gerçek Mükellef)');
     } else {
       console.log('❌ Başarı mesajı bulunamadı');
     }
   } catch (error) {
     console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
   }

  // sayfayı yenile ve adminden çıkış yap
  await page.reload();
  await zoom(page);

  await page.getByText('Cihaz Yönetimi').click();
  await page.getByRole('link', { name: ' Cihaz İşlemleri' }).click();

  const cihazSeriNo = await cihazEkle(page);
  console.log('Cihaz Seri No:', cihazSeriNo);

  // Cihazı bayiye (sipaypf) ata

  // Oluşturmuş olduğumuz cihazı seç
  try {
    const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
    const cihazSeriNoFirstRow = cihazSeriNoRows.first();
    await cihazSeriNoFirstRow.getByRole('checkbox').check();
    console.log(`✅ ${cihazSeriNo} cihazı seçildi. (Ana Bayiye atanacak cihaz)`);
    } catch (error) {
      console.log('❌ ${cihazSeriNo} cihazı seçilemedi:', error);
    } 
    
    
  
  // işlemler dropdownından bayiye ata butonuna tıkla
  await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Bayiye Ata' }).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).click();
  await page.getByRole('combobox').filter({ hasText: /^$/ }).fill('sipay pf');
  await page.getByRole('option', { name: 'Sipay PF', exact: true }).click();
  await page.getByRole('button', { name: 'Ata' }).click();
  
  
  try {
  // Başarısız işlemler başlığının görünür olmasını bekle
  const basarisizIslemler = page.getByRole('heading', { name: 'Başarısız İşlemler' });
  await basarisizIslemler.waitFor({ state: 'visible', timeout: 1000 });
  // { state: 'visible' }
  if (await basarisizIslemler.isVisible()) {
    console.log('❌ Başarısız işlemler görüntülendi');
    
    // Tablo başlıklarını yazdır
    const headers = [
      'Seri Numarası',
      'Cihaz Adı', 
      'Cihaz Modeli',
      'Cihaz Tipi',
      'Marka',
      'Error Message'
    ];
    console.log('-'.repeat(100));
    
    // Tablodaki tüm satırları oku
    const rows = page.locator('.k-grid-content .k-master-row');
    const rowCount = await rows.count();
    
    for (let i = 0; i < rowCount; i++) {
      const row = rows.nth(i);
      const errorMessage = await row.locator('td').nth(5).textContent() || '';
      // Satırı konsola yazdır
      console.log(` ⚠️✅ ${errorMessage} mesajı göründü`);
    }
    
    console.log('='.repeat(100));
  }
  } catch (error) {
  
  }
     await page.waitForTimeout(1000);  

  // ===== ADIM 3: Cihazı oluşturulan üye işyerine ata (509 gerçek) =====
 // Oluşturmuş olduğumuz cihazı seç
 try {
  const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
  const cihazSeriNoFirstRow = cihazSeriNoRows.first();
  await cihazSeriNoFirstRow.getByRole('checkbox').check();
  console.log(`✅ ${cihazSeriNo} cihazı seçildi. (509 Üye işyerine atanacak cihaz)`);
  } catch (error) {
    console.log('❌ ${cihazSeriNo} cihazı seçilemedi:', error);
  } 
  
  // işlemler dropdownından üye işyerine ata butonuna tıkla
  await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Üye İşyerine Ata' }).click();

  await page.waitForTimeout(1000);  

  await page.locator('kendo-searchbar').getByRole('combobox').fill(ad);
  await page.getByRole('option', { name: ad }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Şube' }).getByLabel('Select').click();
  await page.getByRole('option').first().click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'PF' }).getByLabel('Select').click();
  await page.getByRole('option', { name: 'No PF' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Tebliğ Tipi' }).getByLabel('Select').click();
  await page.getByRole('option', { name: '509' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Environment' }).getByLabel('Select').click();
  await page.getByRole('option', { name: 'Demo' }).click();
  await page.getByRole('button', { name: 'Ata' }).click();

  await page.waitForTimeout(1000);

  // adminden çıkış yap
  await logout(page);

  // sipay pf ile giriş yap
  await login2(page);
  await zoom(page);


  // Üye işyeri yönetimi bul ve tıkla
  await uyeIsyeriYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Üye İşyeri Tıklama =====
  // Üye işyeri menü linkini bul ve tıkla (URL ile spesifik olarak hedefle)
  await uyeIsyeri.click();
  await page.waitForTimeout(500);

  // ===== ADIM 4: Detay Menü =====
  console.log(`🎯 Seçilen üye işyeri: ${ad}`);

  try {
    await page.getByRole('row', { name: 'Expand Details  ' + ad }).getByLabel('Expand Details').click();
  } catch (error) {
    console.log(`❌ ${ad} ile başlayan üye işyeri bulunamadı:`, error.message);
  }
  
  
  // ===== ADIM 5: Ödeme Aracıları Ekleme =====
  await page.getByText('Ödeme Aracıları').click();
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Terminal Tipi' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'POS' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').nth(1).click();
  await page.getByRole('option', { name: 'İş Bankası' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('4');
  await page.getByRole('dialog').press('Tab');
  await page.getByText('✓✕').first().click();
  await page.getByText('✓✕').nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(1000);

  // Başarı mesajını kontrol et
  try {
    if (await page.getByText('Başarılı Üye İşyeri Ödeme').isVisible()) {
      await page.getByText('Başarılı Üye İşyeri Ödeme').click();
      console.log('✅ Başarılı: Ödeme Aracısı başarıyla oluşturuldu!');
    } 
  } catch (error) {
    console.log('❌ Başarı mesajı kontrol edilirken hata oluştu:', error.message);
  }
  await page.waitForTimeout(1000);


// ===== ADIM 7: Satış terminalinde kontrol =====
await page.getByText('Satış Terminali').click();
await page.getByRole('link', { name: ' Terminal' }).click();
await page.waitForTimeout(1000);
await page.getByRole('button', { name: '' }).click();
await page.waitForTimeout(1000);
await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).click();
await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).fill(cihazSeriNo);
await page.waitForTimeout(5000);


try{
  const expandDetails = page.getByRole('link', { name: 'Expand Details' });
  await expandDetails.waitFor({ state: 'visible'});
  await expandDetails.click();
} catch (error) {
  console.log('❌ Satış terminali ekranında cihaz bulunamadı :', error.message);
}

try{
  await page.getByRole('gridcell', { name: 'İş Bankası' }).isVisible();
  const isBankasi = await page.getByRole('gridcell', { name: 'İş Bankası' }).textContent();
  if (isBankasi === 'İş Bankası') {
    console.log('✅ Eklenen ödeme aracısı iş bankası Görüntülendi. Test Başarılı!');
  }
} catch (error) {
  console.log('❌ Eklenen ödeme aracısı iş bankası Görüntülenemedi. Test Başarısız! :', error.message);
}

// resellerdan çıkış yap
await logout2(page);

// Admin giriş yap
await login(page);
await zoom(page);

// ===== ADIM 8: Cihazı üye işyerinden geri al =====
await page.getByText('Cihaz Yönetimi').click();
await page.getByRole('link', { name: ' Cihaz İşlemleri' }).click();

// Oluşturulan cihazı seç
 try {
  const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
  const cihazSeriNoFirstRow = cihazSeriNoRows.first();
  await cihazSeriNoFirstRow.getByRole('checkbox').check();
  console.log(`✅ ${cihazSeriNo} cihazı seçildi. (Üye işyerinden geri alınacak cihaz)`);
  } catch (error) {
    console.log('❌ ${cihazSeriNo} cihazı seçilemedi:', error);
  } 
 
   // işlemler dropdownından üye işyerinden geri al butonuna tıkla
   await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Üye İşyerinden Geri Al' }).click();
  await page.getByRole('dialog').locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Diğer' }).click();
  await page.getByRole('button', { name: 'Unassign' }).click();
   
   await page.waitForTimeout(1000);  

// ===== ADIM 9: Cihazı bayiden geri al =====
  // Oluşturulan cihazı seç
  try {
    const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
    const cihazSeriNoFirstRow = cihazSeriNoRows.first();
    await cihazSeriNoFirstRow.getByRole('checkbox').check();
    console.log(`✅ ${cihazSeriNo} cihazı seçildi. (Bayiden geri alınacak cihaz)`);
    } catch (error) {
      console.log('❌ ${cihazSeriNo} cihazı seçilemedi:', error);
    } 
    
    
  
  // işlemler dropdownından bayiden geri al butonuna tıkla
  await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Bayiden Geri Al' }).click();
  await page.waitForTimeout(1000);
  if (await page.getByRole('button', { name: 'Kabul', exact: true }).isVisible()) {
  await page.getByRole('button', { name: 'Kabul', exact: true }).click();
  } 
  
     await page.waitForTimeout(1000);  


// ===== ADIM 10: Cihazı sil =====
// Oluşturulan cihazı seç
try {
  const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
  const cihazSeriNoFirstRow = cihazSeriNoRows.first();
  await cihazSeriNoFirstRow.getByRole('checkbox').check();
  console.log(`✅ ${cihazSeriNo} cihazı seçildi. (Silinecek cihaz)`);
  } catch (error) {
    console.log('❌ ${cihazSeriNo} cihazı seçilemedi:', error);
  } 
  await page.waitForTimeout(1000);
  
  

// işlemler dropdownından sil butonuna tıkla
await page.getByRole('button', { name: 'İşlemler ' }).click();
await page.getByRole('button', { name: ' Sil' }).click();
await page.getByRole('button', { name: 'Evet' }).click();

await page.waitForTimeout(1000);


// ===== ADIM 11: Üye işyeri Silme =====
await page.getByText('Üye İşyeri Yönetimi').click();
await page.waitForTimeout(1000);
await page.getByRole('link', { name: ' Üye İşyeri', exact: true }).click();
await page.waitForTimeout(1000);


try {
  // İlk DENEME satırını bul ve expand details butonuna tıkla
  const expandButton = page.getByRole('row', { name: 'Expand Details  ' + ad}).getByRole('button');
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


  await page.pause();

});
