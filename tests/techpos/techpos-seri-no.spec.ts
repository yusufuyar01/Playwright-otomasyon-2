import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('TechPOS - Seri No Grid Filtre', async ({ page }) => {
  
 // Bugünün tarihini konsola yazdır
    const bugun = new Date();
    const tarihString = bugun.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 Bugünün tarihi: ${tarihString}`);

    // 15 gün öncesinin tarihini konsola yazdır
    const altmısırgunOncesi = new Date();
    altmısırgunOncesi.setDate(bugun.getDate() - 60);
    const altmısırgunOncesiString = altmısırgunOncesi.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 60 gün öncesi: ${altmısırgunOncesiString}`);

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
    await page.getByRole('link', { name: ' Seri Numara Doğrulama' }).click();

    // Başlangıç ve Bitiş Tarihi

    await page.locator('#datepicker-1').click();
    await page.waitForTimeout(1000);
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.waitForTimeout(1000);
    

    // Tarih string'ini oluştur
    const gun = altmısırgunOncesi.getDate();
    const ay = altmısırgunOncesi.getMonth() + 1;
    
    // Gün adını al
    const gunAdi = gunAdiGetir(altmısırgunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi - GG.AA.YYYY formatında (numara olarak)
    console.log(`🔍  2 Ay Çncesi Seçildi`);

    
    await page.locator('#datepicker-1').fill(ay.toString());
    await page.locator('#datepicker-1').fill(altmısırgunOncesi.getFullYear().toString());



    await page.waitForTimeout(1000);
   



    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByTitle('1 Ağustos 2025 Cuma').locator('span').click();

    // Filtrele butonu
    await page.getByRole('button', { name: 'Filtrele' }).click();

    await page.waitForTimeout(1000);

    if (await page.getByText('Kayıt bulunamadı').isVisible()) {
        console.log(' ❌ Kayıt bulunamadı');
        await page.pause();
    } else {
        console.log(' ✅ Kayıtlar bulundu');

        

        const seriNo = await page.getByRole('gridcell').nth(4).textContent();

        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).click();
        await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).fill(seriNo);

        await page.waitForTimeout(1000);


        if (await page.getByText('Kayıt bulunamadı').isVisible()) {
            console.log(' ❌ Kayıt bulunamadı');
            await page.pause();
        } else {
            console.log(' ✅ Grid filtre ile Kayıt bulundu');
    
            let i = 18;
            while (await page.getByRole('gridcell').nth(i).isVisible()) {
            const olusturulmaTarihi = await page.getByRole('gridcell').nth(i).textContent();
            const seriNo = await page.getByRole('gridcell').nth(i+2).textContent();
    
            console.log('➤ Oluşturulma tarihi', olusturulmaTarihi, ' olan ve Seri Numarası', seriNo, ' olan cihaz bulundu');
    
            console.log('--------------------------------');
    
            i = i + 16;
    
            }
        }   
    }

    


    await page.pause();
}); 