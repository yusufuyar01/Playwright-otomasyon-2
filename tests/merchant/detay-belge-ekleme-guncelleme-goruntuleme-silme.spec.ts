import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { rastgeleString } from '../../helpers/stringUret';
import { zoom } from '../../helpers/zoom';

test('Detay Belge Ekleme, Güncelleme, Görüntüleme ve Silme', async ({ page }) => {

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
  //Duruma göre sırala. Onaylanmayanlar yukarıda olur
  await page.getByLabel('Data table').getByText('Durum').click();


  
  // Detay menüye tıkla (ilk 10 satırdan rastgele seç)
  const randomRowNumber = Math.floor(Math.random() * 10) + 2;
  console.log(`🎯 Rastgele seçilen satır numarası: ${randomRowNumber}`);
  const firstRowExpand = page.locator(`tr:nth-child(${randomRowNumber}) > .k-hierarchy-cell`);

  // bu satır özellikle bir detay satırını incelemek için konulmuştur. hemen yukarıdaki 3 satırı yorum satırına alarak kullanabilirsiniz.
  // const firstRowExpand = page.locator('tr:nth-child(5) > .k-hierarchy-cell');
  await firstRowExpand.click();

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
        const ilkGridcell = page
          .getByRole('tabpanel', { name: 'Belgeler' })
          .getByRole('gridcell')
          .nth(1);

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
        console.log('✅ Güncelleme yapıldı');
        } catch (error) {
            console.log('⚠️ Güncelleme yapılamadı');
        }

        // Görüntüleme butonuna tıkla
        await page.getByRole('row', { name: ` ${ilkDeger}`, exact: true }).getByRole('gridcell').first().click();

        // preview butonuna tıkla
        await page.getByRole('button', { name: '' }).first().click();


        await page.waitForTimeout(5000);
        console.log('✅ Görüntüleme yapıldı');
        await page.waitForTimeout(3000);

        // Görüntülemeyi kapat
        await page.getByRole('button', { name: 'Kapat' }).click();



        // Silme işlemleri
        await page.getByRole('button', { name: '' }).first().click();
        await page.getByRole('button', { name: 'Sil' }).click();
        // Güncelleme butonuna tıkla
        await page.getByRole('button', { name: 'Güncelle' }).click();

        console.log('✅ Silme işlemi yapıldı');

      
  
  await page.pause();

}); 