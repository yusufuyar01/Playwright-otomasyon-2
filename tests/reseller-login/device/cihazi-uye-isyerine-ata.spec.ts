import { test, expect } from '@playwright/test';
import { login, logout } from '../../../helpers/login';
import { login2, logout2 } from '../../../helpers/login2';
import { zoom } from '../../../helpers/zoom';
import { cihazEkle } from '../../../helpers/cihazIslemleri';

test('Cihazı Bayiye Ata', async ({ page }) => {

  console.log('===>  Cihazı Bayiye Ata <===');

  // 1. Login
  await login(page);

  // 2. Zoom
  await zoom(page);

  // 3. Cihaz ekle
  await page.getByText('Cihaz Yönetimi').click();
  await page.getByRole('link', { name: ' Cihaz İşlemleri' }).click();
  await page.waitForTimeout(1000);

  const cihazSeriNo = await cihazEkle(page);
  console.log('✅ Cihaz başarıyla eklendi : ', cihazSeriNo);

  // 4. Cihazı ana bayiye ata (sipaypf)
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
  

  // 4. Logout
  await logout(page);

  // 5. Login2
  await login2(page);

  // 6. Zoom
  await zoom(page);

  // 7. Eklenen cihazı üye işyerine ata
  await page.getByText('Cihaz Yönetimi').click();
  await page.getByRole('link', { name: ' Cihaz İşlemleri' }).click();
  await page.waitForTimeout(1000);

  await uyeIsyerineAta(cihazSeriNo);

  async function uyeIsyerineAta(cihazSeriNo: string){
    
  await zoom(page);

     // ihazı seç
  try {
    const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
    const cihazSeriNoFirstRow = cihazSeriNoRows.first();
    await cihazSeriNoFirstRow.getByRole('checkbox').check();
    console.log(`✅ ${cihazSeriNo} cihazı seçildi. (Üye işyerine atanacak cihaz)`);
    } catch (error) {
      console.log('❌ ${cihazSeriNo} cihazı seçilemedi:', error);
    } 
    
  
    // işlemler dropdownından üye işyerine ata butonuna tıkla
    await page.getByRole('button', { name: 'İşlemler ' }).click();
    await page.getByRole('button', { name: ' Üye İşyerine Ata' }).click();
  
    await page.waitForTimeout(1000);  
  
    await page.locator('ot-data-entry-template').filter({ hasText: 'VKN/TCKN' }).getByRole('textbox').fill('4548992552');
    await page.getByRole('button', { name: ' Bul' }).click();
    await page.getByRole('dialog').getByText('Erdal Bakkal').waitFor({ state: 'visible', timeout: 4000 });
    if (await page.getByRole('dialog').getByText('Erdal Bakkal').isVisible()) {
      console.log('✅ VKN/TCKN ile Erdal Bakkal bulundu');
    } else {
      console.log('❌ Erdal Bakkal bulunamadı');
    }

    await page.locator('ot-data-entry-template').filter({ hasText: 'Şube' }).locator('span').nth(1).click();
    await page.getByRole('option', { name: 'Central Branch' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'PF' }).locator('span').nth(1).click();
    await page.getByRole('option', { name: 'No PF' }).click();
    await page.locator('ot-data-entry-template').filter({ hasText: 'Tebliğ Tipi' }).locator('span').nth(1).click();
    await page.getByRole('option', { name: '507' }).click();
    await page.locator('ot-dropdown-entry').filter({ hasText: 'Environment' }).click();
    await page.getByRole('option', { name: 'Demo' }).click();
    await page.getByRole('button', { name: 'Ata' }).click();

    await page.waitForTimeout(1000);   

    if (await page.getByRole('heading', { name: 'Başarısız İşlemler' }).isVisible()) {
    console.log('❌ Başarısız işlemler görüntülendi');
    await page.reload();
    await page.waitForTimeout(1000);
    await uyeIsyerineAta(cihazSeriNo);
    return;
    }
    

      await page.waitForTimeout(3000);

    if (  await page.locator('td:nth-child(7)').first().textContent() === 'Erdal Bakkal') {
      console.log('✅ Cihaz üye işyerine atandı');
    } else {
      console.log('❌ Cihaz üye işyerine atanamadı');
    }

}

    await page.waitForTimeout(1000);


      await logout2(page);

      await login(page);
      await zoom(page);

      // Cihazı üye işyerinden geri al

      await page.getByText('Cihaz Yönetimi').click();
      await page.getByRole('link', { name: ' Cihaz İşlemleri' }).click();
      await page.waitForTimeout(1000);

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

        // Cihazı bayiden geri al
        // cihazı seç
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
        } else if (await page.getByRole('button', { name: 'Kabul' }).isVisible()){  
            await page.getByRole('button', { name: 'Kapat' }).click();
            console.log('✅ İstenildiği gibi bayiden geri al işlemi yapılamamalıdır');
        }
  
       await page.waitForTimeout(1000);  

      // cihazı sil
      // Oluşturulan cihazı seç
        try {
            const cihazSeriNoRows = page.getByRole('row').filter({ hasText: cihazSeriNo });
            const cihazSeriNoFirstRow = cihazSeriNoRows.first();
            await cihazSeriNoFirstRow.getByRole('checkbox').check();
            await page.waitForTimeout(1000);
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


  // Test sonunda ekranın kapanmasını engellemek için pause
  await page.pause();
});
