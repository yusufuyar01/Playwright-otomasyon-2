import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { rastgeleString } from '../../helpers/stringUret';
import { zoom } from '../../helpers/zoom';

test('Detay E-Belge Ayarları', async ({ page }) => {

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

  // ===== ADIM 3: Detay Menü =====
  // Detay menüye tıkla (ilk 10 satırdan rastgele seç)
  const randomRowNumber = Math.floor(Math.random() * 10) + 2;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber}`);
  const firstRowExpand = page.locator(`tr:nth-child(${randomRowNumber}) > .k-hierarchy-cell`);

  // bu satır özellikle bir detay satırını incelemek için konulmuştur. hemen yukarıdaki 3 satırı yorum satırına alarak kullanabilirsiniz.
  // const firstRowExpand = page.locator('tr:nth-child(4) > .k-hierarchy-cell');
  await firstRowExpand.click();

  // "E-Belge" tıklama 
  const eBelgeAyarlari = page.getByText('E-Belge Ayarları');
  await eBelgeAyarlari.click();

  // "Yeni" butonu
  const yeniButton = page.getByRole('button', { name: '+ Yeni' });
  await yeniButton.click();


  // ===== ADIM 4: E-Belge Ekleme =====
  try {
    // Entegratör eklenmemişse çıkan hatayı bekle (3 saniye timeout)
    const entegratorHatasi = page.getByText('Üye işyeri için entegratör');
    await entegratorHatasi.waitFor({ timeout: 2000 });
    console.log('❌ Üye işyeri için entegratör bulunamadı!');
  } catch (error) {
    console.log('✅ Entegratör mesajı görünmedi, E-Belge Ayarları devam ediyor...');
    
    // Entegratör seçimi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Entegratör' }).getByLabel('Select').click();
    
    // Dropdown'da çıkan ilk elemana tıkla
    const firstOption1 = await page.getByRole('option').first();
    await firstOption1.click();

    // Belge Türü seçimi
    // Belge Türü sütunundaki tüm hücreleri al
    const secilmisBelgeTurleriLocator = await page.getByRole('gridcell');
    const secilmisTumMetinler = await secilmisBelgeTurleriLocator.allTextContents();

    // Örn: ['E-Fatura', 'E-MM', 'E-Arşiv'] gibi bir liste olacak
    const secilmisSet = new Set(secilmisTumMetinler);

    // Dropdown'u aç
    await page.locator('ot-data-entry-template').filter({ hasText: 'Belge Türü' }).locator('span').nth(1).click();

    // Tüm seçenekleri al
    const tumSecenekler = await page.getByRole('option').all();

    // Henüz seçilmemiş ilk seçeneği bul ve tıkla
    let belgeTuruSecildi = false;
    for (const option of tumSecenekler) {
        const optionText = await option.textContent();
        if (optionText && !secilmisSet.has(optionText.trim())) {
            await option.click();
            console.log(`✅ Seçilen Belge Türü: ${optionText.trim()}`);
            belgeTuruSecildi = true;
            break;
        }
    }
    
    // Eğer seçilebilir belge türü bulunamadıysa
    if (!belgeTuruSecildi) {
        console.log(' ❌ Belge Türü E-Belge Ayarı zaten kayıtlı');
        return; // Testi sonlandır
    }

    // Seri Numarası alanına rastgele metin yaz
    const eBelgeAdi = rastgeleString(3).toUpperCase();
    const seriNumaraInput = page.getByRole('dialog').locator('input[type="text"]');
    await seriNumaraInput.fill(eBelgeAdi);

    // Gönderici Takma Adı alanına rastgele metin yaz
    const gondericiTakmaAdi = rastgeleString(15);
    const gondericiTakmaAdiInput = page.locator('textarea');
    await gondericiTakmaAdiInput.fill(gondericiTakmaAdi);

    // Oluştur butonuna tıkla
    await page.getByRole('button', { name: 'Oluştur' }).click();

    // Pop-up mesajını kontrol et
    try {
      const popupMessage = page.getByText('Başarılı Üye İşyeri E-Belge');
      await popupMessage.waitFor({ timeout: 3000 });
      console.log('✅ Üye İşyeri E-Belge Ayarları başarıyla oluşturuldu');
    } catch (error) {
      // Başarı mesajı görünmediyse, "E-Belge Ayarı Zaten Kayıtlı" mesajını kontrol et
      try {
        const zatenKayitliMessage = page.getByText('E-Belge Ayarı Zaten Kayıtlı Bu e-belge ayarı zaten mevcut.');
        await zatenKayitliMessage.waitFor({ timeout: 3000 });
        console.log('e-BELGE AYARI ZATEN KAYITLI');
      } catch (secondError) {
        console.log('⚠️ Başarı mesajı görünmedi, işlem tamamlanamadı olabilir.');
      }
    }
    
  }

   await page.pause();

}); 