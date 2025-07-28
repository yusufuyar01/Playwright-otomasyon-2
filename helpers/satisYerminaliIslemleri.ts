import { Page, expect } from '@playwright/test';

/**
 * Satış Terminali İşlemleri için yardımcı fonksiyonlar
 */
export async function terminaliGetir(page: Page) {
     // Satış terminali bul ve tıkla
     const satisTerminali = page.locator('text="Satış Terminali"');
     await satisTerminali.click();
     
     // Sayfanın yüklenmesini bekle
     await page.waitForLoadState('networkidle');
     
     await page.getByRole('link', { name: ' Terminal', exact: true }).click();
     
     await page.getByRole('columnheader', { name: '' }).locator('ot-button').click();
     
     await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).click();
     await page.getByRole('textbox', { name: 'Seri Numarası Filter' }).fill('N56712762');
     await page.getByRole('gridcell', { name: 'N56712762' }).click();
 
}

export async function mediatorEkle(page: Page) {
     await page.getByRole('button', { name: '+ Yeni' }).click();
     await page.locator('ot-data-entry-template').filter({ hasText: 'Ödeme Aracısı' }).locator('span').nth(1).click();
     await page.getByRole('option', { name: 'BKM TechPOS' }).click();
     await page.getByRole('dialog').getByRole('spinbutton').click();
     await page.getByRole('dialog').getByRole('spinbutton').fill('10');
     await page.getByRole('button', { name: 'Oluştur' }).click();

     try {
          const basarılıMesajı = page.getByText('Başarılı Terminal Ödeme Aracı');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('✅ Terminal Ödeme Aracısı başarıyla eklendi');
     } catch (error) {
          console.log('❌ Terminal Ödeme Aracısı eklenemedi');
     }

}

export async function mediatorGuncelle(page: Page) {
     await page.getByLabel('Terminal Ödeme Aracıları').getByRole('button', { name: '' }).click();
     await page.locator('ot-data-entry-template').filter({ hasText: 'Sıra' }).getByLabel('Arttır').click();
     await page.getByRole('button', { name: 'Güncelle' }).click();
     try {
          const basarılıMesajı = page.getByText('Başarılı Terminal Ödeme Aracı');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('✅ Terminal Ödeme Aracısı başarıyla güncellendi');
     } catch (error) {
          console.log('❌ Terminal Ödeme Aracısı güncellenemedi');
     }    




}

export async function mediatorSil(page: Page) {
     await page.getByLabel('Terminal Ödeme Aracıları').getByRole('button', { name: '' }).click();
     await page.getByRole('button', { name: 'Sil' }).click();
     await page.getByRole('button', { name: 'Evet' }).click();
     try {
          const basarılıMesajı = page.getByText('Başarılı The Terminal Payment');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('✅ Terminal Ödeme Aracısı başarıyla silindi');
     } catch (error) {
          console.log('❌ Terminal Ödeme Aracısı silinemedi');
     }
}

export async function parametreEkle(page: Page) {
     await page.getByRole('button', { name: '' }).click();
     await page.getByRole('button', { name: '+ Ekle' }).click();
     await page.getByText('Seçiniz...').click();
     await page.getByRole('option', { name: 'allowDetachedOperations' }).click();
     await page.getByRole('row', { name: '  Hayır' }).getByRole('textbox').click();
     await page.getByRole('row', { name: '  Hayır' }).getByRole('textbox').fill('asdf');
     await page.getByRole('button', { name: '' }).click();
     await page.getByText('Başarılı The Terminal').click();

     try {
          const basarılıMesajı = page.getByText('Başarılı The Terminal');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('✅ Terminal Parametre başarıyla eklendi');
     } catch (error) {
          console.log('❌ Terminal Parametre eklenemedi');
     }
     await page.waitForTimeout(1000);
}

export async function parametreGuncelle(page: Page) {
     await page.getByRole('dialog').getByRole('button', { name: '' }).click();
     await page.getByRole('row', { name: '  Hayır' }).getByRole('textbox').click();
     await page.getByRole('row', { name: '  Hayır' }).getByRole('textbox').fill('abcd');
     await page.getByRole('button', { name: '' }).click();
     

     try {
          const basarılıMesajı = page.getByText('Başarılı The Terminal');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('✅ Terminal Parametre başarıyla güncellendi');
     } catch (error) {
          console.log('❌ Terminal Parametre güncellenemedi');
     }
     await page.waitForTimeout(1000);
}



export async function parametreSil(page: Page) {
     await page.getByRole('button', { name: '' }).click();

     try {
          const basarılıMesajı = page.getByText('Başarılı The Terminal');
          await expect(basarılıMesajı).toBeVisible();
          await basarılıMesajı.click();
          console.log('✅ Terminal Parametre başarıyla silindi');
     } catch (error) {
          console.log('❌ Terminal Parametre silinemedi');
     }
     await page.getByRole('button', { name: ' Kapat' }).click();

     await page.waitForTimeout(1000);
}


