import { test, expect } from '@playwright/test';
import { login } from '../../../helpers/login';
import { zoom } from '../../../helpers/zoom';
import { rastgeleString } from '../../../helpers/stringUret';
import { dokumanOnEkiEkle, dokumanOnEkiGuncelle, dokumanOnEkiSil, terminaliGetir } from '../../../helpers/satisYerminaliIslemleri';

test('Doküman Ön Eki İşlemleri - Ekleme, Güncelleme ve Silme', async ({ page }) => {

    console.log('===>  Doküman Ön Eki İşlemleri - Ekleme, Güncelleme ve Silme  <===');

    // Önce sisteme giriş yap
    await login(page);

    // Zoom işlemi
    await zoom(page);

    // Terminal listesini getir
    await terminaliGetir(page);

    // Detay butonuna tıkla
    await page.getByRole('link', { name: 'Expand Details' }).click();

    // Doküman Ön Eki sekmesine git
    await page.getByText('Terminal Doküman Ön Eki').click();

    // Yeni doküman ön eki ekle
    await dokumanOnEkiEkle(page);

    // Doküman ön eki güncelle
    await dokumanOnEkiGuncelle(page);
    
   
    // Doküman ön eki sil
    await dokumanOnEkiSil(page);
    
    await page.pause();

}); 