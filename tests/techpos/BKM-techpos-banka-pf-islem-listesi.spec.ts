import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';

test('BKM TechPOS - Banka PF İşlem Listesi', async ({ page }) => {
  
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
    const onbesGunOncesi = new Date();
    onbesGunOncesi.setDate(bugun.getDate() - 15);
    const onbesGunOncesiString = onbesGunOncesi.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    console.log(`📅 15 gün öncesi: ${onbesGunOncesiString}`);

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

    // Techpos yönetimi ve BKM banka PF işlem listesi sayfasına git
    await page.getByText('Techpos Yönetimi').click();
    await page.getByRole('link', { name: 'BKM Banka PF İşlem Listesi' }).click();

    // Tarih filtreleme - başlangıç tarihi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Başlangıç Tarihi' }).getByLabel('Takvimden seç').click();

    // Takvim açıldıktan sonra elementin yüklenmesini bekle
    await page.waitForSelector('[role="gridcell"]', { state: 'visible' });

    // Tarih string'ini oluştur
    const gun = onbesGunOncesi.getDate();
    const ay = onbesGunOncesi.getMonth() + 1;
    
    // Gün adını al
    const gunAdi = gunAdiGetir(onbesGunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi
    const titleText = `${gun} ${ayAdiGetirTam(ay)} ${onbesGunOncesi.getFullYear()} ${gunAdi}`;
    console.log(`🔍 Seçilecek başlangıç tarihi: "${titleText}"`);

    await page.getByTitle(titleText).locator('span').click();
    await page.waitForTimeout(1000);
   
    // Bitiş tarihi seçimi
    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByRole('button', { name: 'Bugün' }).click();

    // Filtrele butonuna tıkla
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(3000);

    // "Kayıt bulunamadı" mesajının görünüp görünmediğini kontrol et
    const kayitBulunamadiElement = page.getByText('Kayıt bulunamadı');
    const isKayitBulunamadiVisible = await kayitBulunamadiElement.isVisible();

    if (isKayitBulunamadiVisible) {
        console.log('❌ Kayıt bulunamadı');
        await page.pause();
    } else {
        console.log('✅ Kayıt bulundu');

        // Grid'deki kayıtları listele
        let i = 2;
        let kayitSayisi = 0;
        
        while (await page.getByRole('gridcell').nth(i).isVisible()) {
            const islemTarihi = await page.getByRole('gridcell').nth(i).textContent();
            const islemTutari = await page.getByRole('gridcell').nth(i+1).textContent();
            const islemTipi = await page.getByRole('gridcell').nth(i+2).textContent();
            const bankaAdi = await page.getByRole('gridcell').nth(i+3).textContent();

            console.log(`➤ İşlem Tarihi: ${islemTarihi} | Tutar: ${islemTutari} | Tip: ${islemTipi} | Banka: ${bankaAdi}`);
            console.log('--------------------------------');

            i = i + 8; // Grid sütun sayısına göre artır
            kayitSayisi++;

            // Maksimum 20 kayıt göster
            if (kayitSayisi >= 20) {
                console.log('📊 Maksimum 20 kayıt gösterildi');
                break;
            }
        }

        console.log(`📊 Toplam ${kayitSayisi} kayıt listelendi`);

        // Grid filtreleme testi
        const ilkIslemTarihi = await page.getByRole('gridcell').nth(2).textContent();
        
        await page.getByRole('button', { name: '🔍' }).click();
        await page.getByRole('textbox', { name: 'İşlem Tarihi Filter' }).click();
        await page.getByRole('textbox', { name: 'İşlem Tarihi Filter' }).fill(ilkIslemTarihi || '');

        if (await page.getByText('Kayıt bulunamadı').isVisible()) {
            console.log('❌ Grid filtre ile kayıt bulunamadı');
            await page.pause();
        } else {
            console.log('✅ Grid filtre ile kayıt bulundu');
        }
    }

    await page.pause();
}); 