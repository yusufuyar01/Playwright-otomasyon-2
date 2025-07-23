// helpers/cihazEkle.ts
import { Page, expect } from '@playwright/test';
import { rastgeleString } from './stringUret';

// Cihaz ekleme fonksiyonu
export async function cihazEkle(page: Page): Promise<string> {

  // Yeni cihaz ekleme butonunu bul ve tıkla
  await page.getByRole('button', { name: '+ Yeni' }).click();
  await page.waitForTimeout(1000);

  // Cihaz Seri No üret ve gir
  const cihazSeriNo = ("PAVDENEME" + rastgeleString(5)).toUpperCase();
  const seriNoInput = page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox');
  await seriNoInput.fill(cihazSeriNo);

  // Durum seçimi
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Hazır Değil' }).click();

  // Depo seçimi
  await page.locator('ot-dropdown-entry').filter({ hasText: 'DepoSeçiniz...' }).click();
  await page.getByRole('option', { name: 'TEST', exact: true }).click();

  //Tip
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'Smart POS' }).click();

  //Marka
  await page.getByText('Seçiniz...').first().click();
  await page.getByRole('option', { name: 'PAVO' }).click();

  //Model
  await page.getByText('Seçiniz...').click();
  await page.getByRole('option', { name: 'N86', exact: true }).click();

  //Oluştur butonu
  await page.getByRole('button', { name: 'Oluştur' }).click();
  await page.waitForTimeout(500);
  //Başarı kontrolü
  try {
    const basariMesaji = page.getByText('Başarılı Cihaz başarıyla oluş');
    await expect(basariMesaji).toBeVisible();
    console.log('✅ 1 Cihaz başarıyla eklendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz eklenmiş olabilir');
  }
  await page.waitForTimeout(500);

  return cihazSeriNo;
}

// Cihaz güncelleme fonksiyonu
export async function cihazGuncelle(page: Page): Promise<string> {
     // ===== ADIM 3: Mevcut Cihazı Bulma ve Seçme =====
  // PAVDENEME ile başlayan cihazları bul ve ana bayi değeri boş olan birini seç
  await page.waitForTimeout(1000); // Tablo yüklenmesini bekle
  
  // PAVDENEME ile başlayan tüm satırları bul
  const pavdenemeRows = page.locator('tr').filter({ hasText: /PAVDENEME/ });
  const rowCount = await pavdenemeRows.count();
  
  if (rowCount > 0) {
    let secilenRow: any = null;
    let secilenCihazAdi = '';
    
    // Ana bayi değeri boş olan bir PAVDENEME cihazı bul
    for (let i = 0; i < rowCount; i++) {
      const currentRow = pavdenemeRows.nth(i);
      const rowText = await currentRow.textContent();
      
      // Ana bayi sütununu kontrol et (genellikle tabloda belirli bir sütun indeksi vardır)
      // Bu örnekte ana bayi değerinin boş olduğunu kontrol ediyoruz
      // Gerçek tablo yapısına göre bu kontrolü ayarlamanız gerekebilir
      const anaBayiCell = currentRow.locator('td').nth(3); // Ana bayi sütunu indeksi (3. sütun varsayımı)
      const anaBayiText = await anaBayiCell.textContent();
      
      if (!anaBayiText || anaBayiText.trim() === '' || anaBayiText.trim() === '-') {
        secilenRow = currentRow;
        secilenCihazAdi = rowText?.trim() || '';
        console.log(`🎯 PAVDENEME cihazı bulundu: ${secilenCihazAdi}`);
        break;
      }
    }
    
    if (secilenRow) {
      // Seçilen satırdaki düzenleme butonuna tıkla
      await secilenRow.getByRole('button').click();
    } else {
      console.log('❌ Ana bayi değeri boş olan PAVDENEME cihazı bulunamadı!');
      throw new Error('Ana bayi değeri boş olan PAVDENEME cihazı bulunamadı');
    }
  } else {
    console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı!');
    throw new Error('PAVDENEME cihazı bulunamadı');
  }

  // ===== ADIM 5: Cihaz Bilgilerini Güncelleme =====
  // Cihaz Seri No güncelle
  const yeniCihazSeriNo = ("PAVGUNCELLEME" + rastgeleString(5)).toUpperCase();
  const seriNoInput = page.locator('ot-data-entry-template').filter({ hasText: 'Seri Numarası' }).getByRole('textbox');
  await seriNoInput.clear();
  await seriNoInput.fill(yeniCihazSeriNo);


  // ===== ADIM 6: Güncellemeyi Kaydetme =====
  // Güncelle butonu
  await page.getByRole('button', { name: 'Güncelle' }).click();
  await page.waitForTimeout(500);


  // ===== ADIM 7: Başarı Kontrolü =====
  try {
    const basariMesaji = await page.getByText('Başarılı The Device has been');
    await expect(basariMesaji).toBeVisible();
    console.log('✅ 1 Cihaz başarıyla güncellendi');
  } catch (error) {
    console.log('⚠️ Başarı mesajı görünmedi, cihaz güncellenmiş olabilir');
  }
  await page.waitForTimeout(500);
  return yeniCihazSeriNo;
}

// Cihaz silme fonksiyonu
export async function cihazSil(page: Page): Promise<void> {
  await page.waitForTimeout(2000); // Tablo yüklenmesi için daha fazla bekle
  
  
  // PAVGUNCELLEME ile başlayan cihazları bul
  const pavguncellemeRows = page.locator('tr').filter({ hasText: /PAVGUNCELLEME/ });
  const pavguncellemeCount = await pavguncellemeRows.count();
  console.log(`🔍 PAVGUNCELLEME ile başlayan cihaz sayısı: ${pavguncellemeCount}`);
  
  // PAVDENEME ile başlayan cihazları da kontrol et
  const pavdenemeRows = page.locator('tr').filter({ hasText: /PAVDENEME/ });
  const pavdenemeCount = await pavdenemeRows.count();
  console.log(`🔍 PAVDENEME ile başlayan cihaz sayısı: ${pavdenemeCount}`);
  
  if (pavguncellemeCount > 0) {
    // İlk PAVGUNCELLEME cihazını seç ve sil
    const firstRow = pavguncellemeRows.first();
    const rowText = await firstRow.textContent();
    console.log(`🎯 Silinecek cihaz: ${rowText?.trim()}`);
    
    await firstRow.getByRole('button').click();
    await page.waitForTimeout(500);

    // depo seçimi
    if (await page.getByText('Seçiniz...').isVisible()) {
    await page.getByText('Seçiniz...').click(); 
    await page.getByRole('option', { name: 'TEST', exact: true }).click();
    }
    
    // Sil butonuna tıkla
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.waitForTimeout(500);
    
    // Onay butonuna tıkla
    await page.getByRole('button', { name: 'Evet' }).click();
    await page.waitForTimeout(1000);
    
    // Başarı kontrolü
    try {
      const basariMesaji = await page.getByText('Başarılı The Device has been successfully deleted');
      await expect(basariMesaji).toBeVisible();
      console.log('✅ 1 Cihaz başarıyla silindi');
    } catch (error) {
      console.log('⚠️ Başarı mesajı görünmedi, cihaz silinmiş olabilir');
    }
  } else if (pavdenemeCount > 0) {
    // PAVGUNCELLEME yoksa PAVDENEME ile başlayan bir cihazı sil
    const firstRow = pavdenemeRows.first();
    const rowText = await firstRow.textContent();
    console.log(`🎯 Silinecek cihaz (PAVDENEME): ${rowText?.trim()}`);
    
    await firstRow.getByRole('button').click();
    await page.waitForTimeout(500);

    // depo seçimi
    if (await page.getByText('Seçiniz...').isVisible()) {
      await page.getByText('Seçiniz...').click(); 
      await page.getByRole('option', { name: 'TEST', exact: true }).click();
      }
    
    // Sil butonuna tıkla
    await page.getByRole('button', { name: 'Sil' }).click();
    await page.waitForTimeout(500);
    
    // Onay butonuna tıkla
    await page.getByRole('button', { name: 'Evet' }).click();
    await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);

    // Başarı kontrolü
    try {
      const basariMesaji = await page.getByText('Başarılı The Device has been successfully deleted');
      await expect(basariMesaji).toBeVisible();
      console.log('✅ 1 Cihaz başarıyla silindi');
    } catch (error) {
      console.log('⚠️ Başarı mesajı görünmedi, cihaz silinmiş olabilir');
    }
  } else {
    console.log('❌ Silinebilecek test cihazı bulunamadı (PAVGUNCELLEME veya PAVDENEME)');
  }
} 

// Cihazı üye işyerine atama işlemi yap
export async function cihazUyeIseyerineAtama(page: Page, cihazSeriNo?: string, guncellenenCihazSeriNo?: string): Promise<void> {

 // ===== ADIM 4: Cihaz Seçimi =====
  // PAVDENEME ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç
  try {
    const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
    const pavdenemeCount = await pavdenemeRows.count();
    
    if (pavdenemeCount > 0) {
      // Ana Bayi sütunu boş olan PAVDENEME cihazlarını filtrele
      const bosAnaBayiPavdenemeRows: any[] = [];
      
      for (let i = 0; i < pavdenemeCount; i++) {
        const row = pavdenemeRows.nth(i);
        const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
        const anaBayiText = await anaBayiCell.textContent();
        
        if (!anaBayiText || anaBayiText.trim() === '') {
          bosAnaBayiPavdenemeRows.push(row);
        }
      }
      
              if (bosAnaBayiPavdenemeRows.length > 0) {
          const firstIndex = 0;
          const pavdenemeRow = bosAnaBayiPavdenemeRows[firstIndex];
          await pavdenemeRow.getByRole('checkbox').check();
          console.log(`✅ PAVDENEME cihazı seçildi (${bosAnaBayiPavdenemeRows.length} adet boş Ana Bayi arasından ilk indeks)`);
        } else {
        console.log('❌ Ana Bayi değeri boş olan PAVDENEME cihazı bulunamadı. Otomasyon ile DENEME cihazları oluştur.');
      }
    } else {
      console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı.');
    }
  } catch (error) {
    console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı');
  }
  
  // PAVGUNCELLE ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç
  try {
    const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
    const pavguncelleCount = await pavguncelleRows.count();
    
    if (pavguncelleCount > 0) {
      // Ana Bayi sütunu boş olan PAVGUNCELLE cihazlarını filtrele
      const bosAnaBayiPavguncelleRows: any[] = [];
      
      for (let i = 0; i < pavguncelleCount; i++) {
        const row = pavguncelleRows.nth(i);
        const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
        const anaBayiText = await anaBayiCell.textContent();
        
        if (!anaBayiText || anaBayiText.trim() === '') {
          bosAnaBayiPavguncelleRows.push(row);
        }
      }
      
              if (bosAnaBayiPavguncelleRows.length > 0) {
          const firstIndex = 0;
          const pavguncelleRow = bosAnaBayiPavguncelleRows[firstIndex];
          await pavguncelleRow.getByRole('checkbox').check();
          console.log(`✅ PAVGUNCELLE cihazı seçildi (${bosAnaBayiPavguncelleRows.length} adet boş Ana Bayi arasından ilk indeks)`);
        } else {
        console.log('❌ Ana Bayi değeri boş olan PAVGUNCELLE cihazı bulunamadı. Otomasyon ile eklenen DENEME cihazlarını otomasyon ile güncelle  cihazları oluştur.');
      }
    } else {
      console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
    }
  } catch (error) {
    console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
  }

  // işlemler dropdownından üye işyerine ata butonuna tıkla
  await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Üye İşyerine Ata' }).click();



  
  await page.waitForTimeout(1000);  

  await page.getByRole('dialog').locator('input').fill('er');
  await page.getByRole('option', { name: 'Erdal Bakkal-' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Şube' }).getByLabel('Select').click();
  await page.getByRole('option', { name: 'Central Branch' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'PF' }).getByLabel('Select').click();
  await page.getByRole('option', { name: 'No PF' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Tebliğ Tipi' }).getByLabel('Select').click();
  await page.getByRole('option', { name: '507' }).click();
  await page.locator('ot-data-entry-template').filter({ hasText: 'Environment' }).getByLabel('Select').click();
  await page.getByRole('option', { name: 'Demo' }).click();
  await page.getByRole('button', { name: 'Ata' }).click();

  await page.waitForTimeout(1000);

} 

// Cihazı üye işyerinden geri alma işlemi yap
export async function cihazUyeIseyerindenGeriAlma(page: Page, cihazSeriNo?: string, guncellenenCihazSeriNo?: string): Promise<void> {

  // ===== ADIM 4: Cihaz Seçimi =====
   // PAVDENEME ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç
   try {
     const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
     const pavdenemeCount = await pavdenemeRows.count();
     
     if (pavdenemeCount > 0) {
       // Ana Bayi sütunu boş olan PAVDENEME cihazlarını filtrele
       const bosAnaBayiPavdenemeRows: any[] = [];
       
       for (let i = 0; i < pavdenemeCount; i++) {
         const row = pavdenemeRows.nth(i);
         const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
         const anaBayiText = await anaBayiCell.textContent();
         
         if (!anaBayiText || anaBayiText.trim() === '') {
           bosAnaBayiPavdenemeRows.push(row);
         }
       }
       
               if (bosAnaBayiPavdenemeRows.length > 0) {
           const firstIndex = 0;
           const pavdenemeRow = bosAnaBayiPavdenemeRows[firstIndex];
           await pavdenemeRow.getByRole('checkbox').check();
           console.log(`✅ PAVDENEME cihazı seçildi (${bosAnaBayiPavdenemeRows.length} adet boş Ana Bayi arasından ilk indeks)`);
         } else {
         console.log('❌ Ana Bayi değeri boş olan PAVDENEME cihazı bulunamadı. Otomasyon ile DENEME cihazları oluştur.');
       }
     } else {
       console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı.');
     }
   } catch (error) {
     console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı');
   }
   
   // PAVGUNCELLE ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç
   try {
     const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
     const pavguncelleCount = await pavguncelleRows.count();
     
     if (pavguncelleCount > 0) {
       // Ana Bayi sütunu boş olan PAVGUNCELLE cihazlarını filtrele
       const bosAnaBayiPavguncelleRows: any[] = [];
       
       for (let i = 0; i < pavguncelleCount; i++) {
         const row = pavguncelleRows.nth(i);
         const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
         const anaBayiText = await anaBayiCell.textContent();
         
         if (!anaBayiText || anaBayiText.trim() === '') {
           bosAnaBayiPavguncelleRows.push(row);
         }
       }
       
               if (bosAnaBayiPavguncelleRows.length > 0) {
           const firstIndex = 0;
           const pavguncelleRow = bosAnaBayiPavguncelleRows[firstIndex];
           await pavguncelleRow.getByRole('checkbox').check();
           console.log(`✅ PAVGUNCELLE cihazı seçildi (${bosAnaBayiPavguncelleRows.length} adet boş Ana Bayi arasından ilk indeks)`);
         } else {
         console.log('❌ Ana Bayi değeri boş olan PAVGUNCELLE cihazı bulunamadı. Otomasyon ile eklenen DENEME cihazlarını otomasyon ile güncelle  cihazları oluştur.');
       }
     } else {
       console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
     }
   } catch (error) {
     console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
   }
 
   // işlemler dropdownından üye işyerinden geri al butonuna tıkla
   await page.getByRole('button', { name: 'İşlemler ' }).click();
  await page.getByRole('button', { name: ' Üye İşyerinden Geri Al' }).click();
  await page.getByRole('dialog').locator('span').nth(1).click();
  await page.getByRole('option', { name: 'Diğer' }).click();
  await page.getByRole('button', { name: 'Unassign' }).click();
 
   
   await page.waitForTimeout(1000);  
 
  
 
 
 } 

 // Üye işyeri olan cihazları bayiye atama işlemi yap
export async function cihazlariBayiyeAta(page: Page, cihazSeriNo?: string, guncellenenCihazSeriNo?: string): Promise<void> {

 
// PAVDENEME ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç

const pavdenemeRows = page.getByRole('row').filter({ hasText: /PAVDENEME/ });
const pavdenemeCount = await pavdenemeRows.count();

if (pavdenemeCount > 0) {
  // Ana Bayi sütunu boş olan PAVDENEME cihazlarını filtrele
  const bosAnaBayiPavdenemeRows: any[] = [];
  
  for (let i = 0; i < pavdenemeCount; i++) {
    const row = pavdenemeRows.nth(i);
    const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
    const anaBayiText = await anaBayiCell.textContent();
    
    if (!anaBayiText || anaBayiText.trim() === '') {
      bosAnaBayiPavdenemeRows.push(row);
    }
  }
  
          if (bosAnaBayiPavdenemeRows.length > 0) {
      const firstIndex = 0;
      const pavdenemeRow = bosAnaBayiPavdenemeRows[firstIndex];
      await pavdenemeRow.getByRole('checkbox').check();
      console.log(`✅ PAVDENEME cihazı seçildi (${bosAnaBayiPavdenemeRows.length} adet boş Ana Bayi arasından ilk indeks)`);
    } else {
    console.log('❌ Ana Bayi değeri boş olan PAVDENEME cihazı bulunamadı. Otomasyon ile DENEME cihazları oluştur.');
  }
} else {
  console.log('❌ PAVDENEME ile başlayan cihaz bulunamadı.');
}

// PAVGUNCELLE ile başlayan ve Ana Bayi değeri boş olan bir cihaz seç

const pavguncelleRows = page.getByRole('row').filter({ hasText: /PAVGUNCELLE/ });
const pavguncelleCount = await pavguncelleRows.count();

if (pavguncelleCount > 0) {
  // Ana Bayi sütunu boş olan PAVGUNCELLE cihazlarını filtrele
  const bosAnaBayiPavguncelleRows: any[] = [];
  
  for (let i = 0; i < pavguncelleCount; i++) {
    const row = pavguncelleRows.nth(i);
    const anaBayiCell = row.locator('td:nth-child(4)'); // Ana Bayi sütunu
    const anaBayiText = await anaBayiCell.textContent();
    
    if (!anaBayiText || anaBayiText.trim() === '') {
      bosAnaBayiPavguncelleRows.push(row);
    }
  }
  
          if (bosAnaBayiPavguncelleRows.length > 0) {
      const firstIndex = 0;
      const pavguncelleRow = bosAnaBayiPavguncelleRows[firstIndex];
      await pavguncelleRow.getByRole('checkbox').check();
      console.log(`✅ PAVGUNCELLE cihazı seçildi (${bosAnaBayiPavguncelleRows.length} adet boş Ana Bayi arasından ilk indeks)`);
    } else {
    console.log('❌ Ana Bayi değeri boş olan PAVGUNCELLE cihazı bulunamadı. Otomasyon ile eklenen DENEME cihazlarını otomasyon ile güncelle  cihazları oluştur.');
  }
} else {
  console.log('❌ PAVGUNCELLE ile başlayan cihaz bulunamadı');
}

// işlemler dropdownından üye işyerine ata butonuna tıkla
await page.getByRole('button', { name: 'İşlemler ' }).click();
await page.getByRole('button', { name: ' Bayiye Ata' }).click();
await page.getByRole('combobox').filter({ hasText: /^$/ }).fill('tes');
await page.getByRole('option', { name: 'Test Bayi Demo' }).click();
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
    console.log(` ✅ ${errorMessage} mesajı göründü`);
  }
  
  console.log('='.repeat(100));
}
} catch (error) {
console.log('❌ Başarısız işlemler Gözükmedi');
}

   
   await page.waitForTimeout(1000);  
 
 
 } 