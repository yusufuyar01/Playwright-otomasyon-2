import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { vknUret } from '../../helpers/vknUret';
import { rastgeleString } from '../../helpers/stringUret';
import { ePostaUret } from '../../helpers/ePostaUret';
import { telNoUret } from '../../helpers/telNoUret';
import { zoom } from '../../helpers/zoom';


test('Deneme', async ({ page }) => {

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


  // // Popup mesajlarını yakalamak için gelişmiş sistem
  // console.log('🔍 Popup mesajı aranıyor...');
  
  // try {
  //   // Farklı popup türlerini kontrol et
  //   const popupSelectors = [
  //     '.swal2-popup',
  //     '.modal',
  //     '[role="dialog"]',
  //     '.toast',
  //     '.notification',
  //     '.alert'
  //   ];

  //   let popupBulundu = false;
    
  //   // Her popup türünü kontrol et
  //   for (const selector of popupSelectors) {
  //     try {
  //       const popup = page.locator(selector);
  //       const gorunurMu = await popup.isVisible({ timeout: 1000 });
  //       if (gorunurMu) {
  //         console.log(`🔍 Popup tespit edildi: ${selector}`);
  //         popupBulundu = true;
          
  //                    // Popup içeriğini oku
  //          const popupText = await popup.textContent();
  //          if (popupText) {
  //            console.log('📋 Popup İçeriği:', popupText.trim());
  //          }
           
  //          // Başarı mesajlarını kontrol et
  //          const basariKelimeleri = ['başarılı', 'başarıyla', 'success', 'tamamlandı'];
  //          const icerikKucuk = popupText ? popupText.toLowerCase() : '';
          
  //         if (basariKelimeleri.some(kelime => icerikKucuk.includes(kelime))) {
  //           console.log('✅ Başarılı: Ödeme Aracısı başarıyla eklendi!');
  //         } else {
  //           // Hata mesajlarını kontrol et
  //           const hataKelimeleri = ['hata', 'error', 'uyarı', 'warning', 'mevcut', 'zaten'];
  //           if (hataKelimeleri.some(kelime => icerikKucuk.includes(kelime))) {
  //             console.log('❌ Hata/uyarı mesajı tespit edildi');
  //           } else {
  //             console.log('❓ Belirsiz popup mesajı');
  //           }
  //         }
          
  //         // Popup'ı kapat
  //         const kapatButton = popup.locator('.swal2-confirm, .swal2-cancel, .btn-close, [aria-label="Close"], .close');
  //         const kapatVarMi = await kapatButton.isVisible();
  //         if (kapatVarMi) {
  //           await kapatButton.click();
  //           await page.waitForTimeout(500);
  //         }
          
  //         break;
  //       }
  //     } catch (e) {
  //       continue;
  //     }
  //   }

  //   if (!popupBulundu) {
  //     console.log('❓ Popup tespit edilemedi, sayfa mesajları kontrol ediliyor...');
      
  //     // Sayfada herhangi bir mesaj var mı kontrol et
  //     const sayfaMesajSelectors = [
  //       '.alert',
  //       '.message', 
  //       '.notification',
  //       '.toast',
  //       '[role="alert"]',
  //       '.error',
  //       '.success',
  //       '.warning'
  //     ];
      
  //     for (const selector of sayfaMesajSelectors) {
  //       try {
  //         const mesajlar = await page.locator(selector).all();
  //         if (mesajlar.length > 0) {
  //           for (const mesaj of mesajlar) {
  //             const mesajText = await mesaj.textContent();
  //             if (mesajText && mesajText.trim()) {
  //               console.log(`📋 Sayfa Mesajı (${selector}):`, mesajText.trim());
  //             }
  //           }
  //         }
  //       } catch (e) {
  //         continue;
  //       }
  //     }
      
  //     // Son çare: tüm sayfada "başarılı" veya "hata" kelimelerini ara
  //     const sayfaIcerigi = await page.textContent('body');
  //     if (sayfaIcerigi) {
  //       const icerikKucuk = sayfaIcerigi.toLowerCase();
  //       if (icerikKucuk.includes('başarılı') || icerikKucuk.includes('başarıyla')) {
  //         console.log('✅ Sayfa içeriğinde başarı mesajı bulundu');
  //       } else if (icerikKucuk.includes('hata') || icerikKucuk.includes('error')) {
  //         console.log('❌ Sayfa içeriğinde hata mesajı bulundu');
  //       }
  //     }
  //   }

  // } catch (error) {
  //   console.log('❌ Popup mesajı yakalanırken hata oluştu:', error.message);
  // }

  // // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

}); 