// helpers/uyeIsyeriIslemleri.ts
import { Page, expect } from '@playwright/test';
import { rastgeleString } from './stringUret';
import { vknUret } from './vknUret';
import { tcknUret } from './tcknUret';
import { telNoUret } from './telNoUret';
import { ePostaUret } from './ePostaUret';
import { zoom } from './zoom';

// Üye işyeri ekleme fonksiyonu (507 Gerçek Mükellef)
export async function uyeIsyeriEkle507Tuzel(page: Page): Promise<string> {

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


  return isyeriAdi;
}

// Üye işyeri ekleme fonksiyonu (509 Gerçek Mükellef)
export async function uyeIsyeriEkle509Gercek(page: Page): Promise<string> {

    let maxRetries = 3; // Maksimum deneme sayısı
    let retryCount = 0;
    let formFilled = false;
    let ad = "";

    while (retryCount < maxRetries && !formFilled) {
        try {
            
            // Yeni üye işyeri ekleme butonunu bul ve tıkla
            const yeniUyeIsyeri = page.locator('text="Yeni Ekle"'); 
            await yeniUyeIsyeri.click();
            await page.waitForTimeout(1000);

            // ===== ADIM 4: Üye İşyeri Ekleme Formu Doldurulması =====

          
            // "Durum" dropdown' gözüküyor mu kontrol et
            const durumDropdown = page.locator('ot-data-entry-template').filter({ hasText: 'Durum' }).locator('span').first();
            if (await durumDropdown.isVisible()) {
                console.log('✅ Durum dropdown görünüyor - Form yeniden yükleniyor...');
                
                // Sayfayı yenile ve tekrar dene
                await page.reload();
                await page.waitForTimeout(2000);
                
                // Zoom işlemi
                await zoom(page);
                retryCount++;
                await uyeIsyeriEkle509Gercek(page);

            } else {
                formFilled = true; // Form başarıyla yüklendi
            }

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

            // Gerçek kişi adı, soyadı ve iş yeri kısa adı
            ad = ("DENEME" + rastgeleString(5)).toUpperCase();
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

            // E-Posta Adresi alanınlarına yaz
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

            // sayfayı yenile
            await page.reload();

            // Zoom işlemi
            await zoom(page);

            // Form başarıyla dolduruldu, döngüden çık
            break;
        } catch (error) {
            console.log(`❌ Form doldurma sırasında hata oluştu (Deneme ${retryCount + 1}):`, error.message);
            retryCount++;
            
            if (retryCount >= maxRetries) {
                console.log('❌ Maksimum deneme sayısına ulaşıldı. Form doldurulamadı.');
                throw new Error('Form doldurma başarısız');
            }
            
            // Hata durumunda sayfayı yenile ve tekrar dene
            await page.reload();
            await page.waitForTimeout(2000);
            await zoom(page);
        }
    }

    return ad;
}


// Üye işyeri silme fonksiyonu
export async function uyeIsyeriSil(page: Page, isyeriAdi: string): Promise<string> {
    try {
        // İlk DENEME satırını bul ve expand details butonuna tıkla
        const expandButton = page.getByRole('row', { name: 'Expand Details '}).getByRole('button').first();
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

      return isyeriAdi;
}





