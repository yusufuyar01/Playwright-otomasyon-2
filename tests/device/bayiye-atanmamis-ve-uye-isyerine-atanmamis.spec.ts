import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('Bayiye Atanmamış ve Üye İşyerine Atanmamış Cihazları Test Etme', async ({ page }) => {

  // Önce sisteme giriş yap
  await login(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Cihaz Yönetimi Menüsünü Bulma =====
  // Cihaz yönetimi bul ve tıkla
  const cihazYonetimi = page.locator('text="Cihaz Yönetimi"'); 
  await cihazYonetimi.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Cihaz Listesi Sayfasına Gitme =====
  // Cihaz İşlemleri menü linkini bul ve tıkla
  const cihazIslemleri = page.getByRole('link', { name: ' Cihaz İşlemleri' });
  await cihazIslemleri.click();
  await page.waitForTimeout(2000);


  // ===== ADIM 3: Filtreleme Seçeneklerini Kontrol Etme =====
  // Bayiye atanmamış cihazları filtrele
  try {
    const bayiyeAtanmamisCheckbox = page.locator('ot-check-box').filter({ hasText: 'Bayiye Atanmamış' });
    await bayiyeAtanmamisCheckbox.click();
    console.log('✅ Sadece Bayiye atanmamış cihazlar filtresi uygulandı');

    // Filtreleme sonuçlarını kontrol et
    await page.waitForTimeout(2000);
    
    const bosMuDizisi: boolean[] = [];

    for (let i = 1; i <= 10; i++) {
        const selector = `tr:nth-child(${i}) > td:nth-child(5)`;
        const cell = page.locator(selector);
        const cellText = await cell.textContent();

        if (cellText === null || cellText.trim() === "") {
            bosMuDizisi.push(true);
        } else {
            bosMuDizisi.push(false);
        }
    }

    if (bosMuDizisi.every(deger => deger === true)) {
        console.log("✅ Filtreleme sonucu ilk 10 satır bayiye atanmamış");
    } else {
        console.log("⚠️ Bazı satırlarda bayi bilgisi mevcut");
    }

    // Bayiye atanmamış cihazları filtrelemeyi kaldır(Saddece üye işyerine atanmamış cihazları filtrelemek için gerekli)
    await bayiyeAtanmamisCheckbox.click();
    await page.waitForTimeout(2000);
    
  } catch (error) {
    console.log('⚠️ Bayiye atanmamış filtresi bulunamadı');
  }
  

  // Üye işyerine atanmamış cihazları filtrele
  try {
    const uyeIsyerineAtanmamisCheckbox = page.locator('ot-check-box').filter({ hasText: 'Üye İşyerine Atanmamış' });
    await uyeIsyerineAtanmamisCheckbox.click();
    console.log('✅ Sadece Üye işyerine atanmamış cihazlar filtresi uygulandı');

    // Filtreleme sonuçlarını kontrol et
    await page.waitForTimeout(2000);
    
    const uyeBosMuDizisi: boolean[] = [];

    for (let i = 1; i <= 10; i++) {
        const selector = `tr:nth-child(${i}) > td:nth-child(8)`; // Üye işyeri bilgisi genellikle 8. sütunda olur
        const cell = page.locator(selector);
        const cellText = await cell.textContent();

        if (cellText === null || cellText.trim() === "") {
            uyeBosMuDizisi.push(true);
        } else {
            uyeBosMuDizisi.push(false);
        }
    }

    if (uyeBosMuDizisi.every(deger => deger === true)) {
        console.log("✅ Filtreleme sonucu ilk 10 satır üye işyerine atanmamış");
    } else {
        console.log("⚠️ Bazı satırlarda üye işyeri bilgisi mevcut");
    }
    
  } catch (error) {
    console.log('⚠️ Üye işyerine atanmamış filtresi bulunamadı');
  }

  // Hem bayiye hem de üye işyerine atanmamış cihazları filtrele
  try {
    // Bayiye atanmamış filtresini uygula(Üye işyerine atanmamış checkboxı zaten seçili)
    const bayiyeAtanmamisCheckbox = page.locator('ot-check-box').filter({ hasText: 'Bayiye Atanmamış' });
    await bayiyeAtanmamisCheckbox.click();
    
    console.log('✅ Bayiye ve üye işyerine atanmamış cihazlar filtresi uygulandı');

    // Filtreleme sonuçlarını kontrol et
    await page.waitForTimeout(2000);
    
    const herIkiFiltreBosMuDizisi: boolean[] = [];

    for (let i = 1; i <= 10; i++) {
        const bayiSelector = `tr:nth-child(${i}) > td:nth-child(5)`; // Bayi bilgisi 5. sütunda
        const uyeSelector = `tr:nth-child(${i}) > td:nth-child(8)`; // Üye işyeri bilgisi 8. sütunda
        
        const bayiCell = page.locator(bayiSelector);
        const uyeCell = page.locator(uyeSelector);
        
        const bayiText = await bayiCell.textContent();
        const uyeText = await uyeCell.textContent();

        // Her iki sütun da boş olmalı
        if ((bayiText === null || bayiText.trim() === "") && (uyeText === null || uyeText.trim() === "")) {
            herIkiFiltreBosMuDizisi.push(true);
        } else {
            herIkiFiltreBosMuDizisi.push(false);
        }
    }

    if (herIkiFiltreBosMuDizisi.every(deger => deger === true)) {
        console.log("✅ Filtreleme sonucu ilk 10 satır hem bayiye hem de üye işyerine atanmamış");
    } else {
        console.log("⚠️ Bazı satırlarda bayi veya üye işyeri bilgisi mevcut");
    }
    
  } catch (error) {
    console.log('⚠️ Her iki filtre birlikte uygulanamadı');
  }
  
  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 