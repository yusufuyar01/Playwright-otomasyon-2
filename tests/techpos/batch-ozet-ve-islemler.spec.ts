import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS - Batch Ekranı Filtre', async ({ page }) => {
  
    // Bugünün tarihini konsola yazdır
    const bugun = new Date();
    const tarihString = bugun.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 Bugünün tarihi: ${tarihString}`);

    // 20 gün öncesinin tarihini konsola yazdır
    const yirmiGunOncesi = new Date();
    yirmiGunOncesi.setDate(bugun.getDate() - 25);
    const yirmiGunOncesiString = yirmiGunOncesi.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 20 gün öncesi: ${yirmiGunOncesiString}`);

    // Ay numarasını ay adına çeviren fonksiyon
    const ayAdiGetirTam = (ayNumarasi: number): string => {
        const aylar = [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        return aylar[ayNumarasi - 1];
    };
    
    // Gün numarasını gün adına çeviren fonksiyon
    const gunAdiGetir = (gunNumarasi: number): string => {
        const gunler = [
            'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 
            'Perşembe', 'Cuma', 'Cumartesi'
        ];
        return gunler[gunNumarasi];
    };  

    await login(page);
    
    await zoom(page);

    // Techpos yönetimi ve batch sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: 'Techpos Batch' }).click();

    // Tarih filtreleme - başlangıç tarihi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Oluşturulma Tarihi' }).getByLabel('Takvimden seç').click();

    // Takvim açıldıktan sonra elementin yüklenmesini bekle
    await page.waitForSelector('[role="gridcell"]', { state: 'visible' });

    // Tarih string'ini daha basit formatta oluştur (sadece gün)
    const gun = yirmiGunOncesi.getDate();
    const ay = yirmiGunOncesi.getMonth() + 1;
    
    // Gün adını al
    const gunAdi = gunAdiGetir(yirmiGunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi
    const titleText = `${gun} ${ayAdiGetirTam(ay)} ${yirmiGunOncesi.getFullYear()} ${gunAdi}`;
    console.log(`🔍 Seçilecek başlangıç tarihi: "${titleText}"`);

    await page.getByTitle(titleText).locator('span').click();
    await page.waitForTimeout(1000);
   
    // Bitiş tarihi seçimi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByRole('button', { name: 'Bugün' }).click();



    // Filtrele butonuna tıkla
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(4000);

    // "Kayıt bulunamadı" mesajının görünüp görünmediğini kontrol et
    const kayitBulunamadiElement = page.getByText('Kayıt bulunamadı');
    const isKayitBulunamadiVisible = await kayitBulunamadiElement.isVisible();

    // "Seçilecek maksimum gün aralığı:" mesajının görünüp görünmediğini kontrol et
    const gunUyarisi = page.getByText('Seçilecek maksimum gün aralığı:');
    const isGunUyarisiVisible = await gunUyarisi.isVisible();

    if (isGunUyarisiVisible) {
        console.log('❌ Seçilecek maksimum gün aralığı: 30');
        await page.pause();
        return;
    }
    else if (isKayitBulunamadiVisible) {
        console.log('❌ Kayıt bulunamadı');
        await page.pause();
        return;
    }

    // 11. sütundaki ilk 15 satırı kontrol et ve dolu değer olan satırın numarasını bul
    console.log('🔍 İlk 15 satır kontrol ediliyor...');
    
    let doluSatirNumarasi = -1;
    
    for (let i = 1; i <= 15; i++) {
        try {
            // 11. sütundaki i. satırı seç
            const cell = page.locator(`tr:nth-child(${i}) > td:nth-child(11)`);
            
            // Hücrenin görünür olup olmadığını kontrol et
            const isVisible = await cell.isVisible();
            
            if (isVisible) {
                const cellText = await cell.textContent();
                
                // Hücrenin boş olup olmadığını kontrol et
                if (cellText && cellText.trim() !== '') {
                    doluSatirNumarasi = i;
                    console.log(`✅ ${i}. satırda "${cellText.trim()}" kapatılma tarihli batch bulundu.`);
                    break;
                }
            } else {
                console.log(`⚠️ ${i}. satır görünür değil`);
            }
        } catch (error) {
            console.log(`❌ ${i}. satır kontrol edilirken hata: ${error}`);
        }
    }
    
    if (doluSatirNumarasi !== -1) {
        console.log(`🎯 Seçilen batchin satırı numarası : ${doluSatirNumarasi}`);
    } else {
        console.log('❌ İlk 15 satırda dolu değer bulunamadı');
    }


    // Tesbit edilen satırın detay menüsüne tıklama
    if (doluSatirNumarasi == 1) {
        await page.locator('.k-hierarchy-cell.k-table-td').first().click();
    }
    else if (doluSatirNumarasi == 2) {
        await page.locator('.k-master-row.k-alt > .k-hierarchy-cell').first().click();
    }else{
        await page.locator(`tr:nth-child(${doluSatirNumarasi}) > .k-hierarchy-cell`).click();
    }

    // Özet tablosundaki belirli hücrenin değerini oku
    try {
        const ozetBulunamadi = page.getByText('Kayıt bulunamadı');
        
        // elementin görünür olup olmadığını kontrol et
        const isVisible = await ozetBulunamadi.isVisible();
        
        if (isVisible) {
            console.log('❌ Seçilen batchin Özet tablosunda kayıt bulunamadı');
        } else {
            console.log(`📊 Seçilen batchin Özet tablosunda kayıt var`);
        }
    } catch (error) {
        console.log(`❌ Hücre okuma hatası: ${error}`);
    }
    
    await page.pause();
}); 