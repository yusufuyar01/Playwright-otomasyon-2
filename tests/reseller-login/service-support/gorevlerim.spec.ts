import { test, expect } from '@playwright/test';
import { login2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';

test('Görevlerim (Service Support - Reseller Login)', async ({ page }) => {

  console.log('===>  Görevlerim (Service Support - Reseller Login)  <===');

  console.log('===>  Satışlarım Filtreleme İşlemleri  <===');

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
  yirmiGunOncesi.setDate(bugun.getDate() - 30);
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

  // Önce sisteme giriş yap
  await login2(page);

  // Zoom işlemi
  await zoom(page);

  // ===== ADIM 1: Dashboard'da Service Support Menüsünü Bulma =====
  // Service Support menüsünü bul ve tıkla
  const serviceSupport = page.locator('text="Servis Destek"'); 
  await serviceSupport.click();
  await page.waitForTimeout(1000);

  // ===== ADIM 2: Çağrılarım Menüsüne Gitme =====
  await page.getByRole('link', { name: ' Çağrılarım' }).click();
  await page.waitForTimeout(1000);

  // ===== ADIM 3: Filtreleme yap =====
    // Tarih filtreleme - başlangıç tarihi
    await page.locator('#datepicker-1').click();
    await page.waitForTimeout(1000);
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.waitForTimeout(1000);


    // Tarih string'ini oluştur
    const gun = yirmiGunOncesi.getDate();
    const ay = yirmiGunOncesi.getMonth() + 1;
    const yıl = yirmiGunOncesi.getFullYear();
    
    // Gün adını al
    await page.waitForTimeout(1000);

   // Tarih seçimi - GG.AA.YYYY formatında (numara olarak)
   console.log(`🔍  30 Gün Öncesi Seçildi`);
   const tarih = gun.toString() + ay.toString() + yıl.toString();
   if (gun.toString() !== '31') {
   const gunStr = ['3','4','5','6','7','8','9'].includes(gun.toString()) ? '0' + gun.toString() : gun.toString();
   const tarih = gunStr + ay.toString() + yıl.toString();
   }
   
   if (['1','3','5','7','8','10','12'].includes(ay.toString())) {
    await page.locator('#datepicker-1').click();
    for (let i = 0; i < yıl.toString().length; i++) {
    await page.locator('#datepicker-1').press(yıl.toString()[i]);
    await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }
    await page.locator('#datepicker-1').press('ArrowLeft');
    for (let i = 0; i < ay.toString().length; i++) {
        await page.locator('#datepicker-1').press(ay.toString()[i]);
        await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }
    await page.locator('#datepicker-1').press('ArrowLeft');
    await page.locator('#datepicker-1').press('ArrowLeft');
    for (let i = 0; i < gun.toString().length; i++) {
        await page.locator('#datepicker-1').press(gun.toString()[i]);
        await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }
   } else {
       // Tarih string'ini karakterlerine ayır ve her birini ayrı ayrı bas
   for (let i = 0; i < tarih.length; i++) {
    await page.locator('#datepicker-1').press(tarih[i]);
    await page.waitForTimeout(300); // Her karakter arasında kısa bekleme
    }   
    }
    
    // Gün adını al
    const gunAdi = gunAdiGetir(yirmiGunOncesi.getDay());
    await page.waitForTimeout(1000);

    // Tarih seçimi
    const titleText = `${gun} ${ayAdiGetirTam(ay)} ${yirmiGunOncesi.getFullYear()} ${gunAdi}`;
    console.log(`🔍 Seçilecek başlangıç tarihi: "${titleText}"`);

    // await page.getByTitle(titleText).locator('span').click();
    await page.waitForTimeout(1000);
   
    await page.locator('ot-data-entry-template').filter({ hasText: 'Bitiş Tarihi' }).getByLabel('Takvimden seç').click();
    await page.getByRole('button', { name: 'Bugün' }).click();
    await page.getByRole('button', { name: 'Filtrele' }).click();
    await page.waitForTimeout(4000);


    if (await page.getByText('Kayıt bulunamadı').isVisible()) {
    console.log('❌ Kayıt bulunamadı');
    await page.pause();
    } else {
    console.log('✅ Kayıtlar bulundu');
    }

  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();

});
