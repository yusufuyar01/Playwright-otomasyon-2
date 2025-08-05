import { test, expect } from '@playwright/test';
import { login } from '../../helpers/login';
import { zoom } from '../../helpers/zoom';
import { rastgeleString } from '../../helpers/stringUret';
import { mediatorEkle, mediatorGuncelle, mediatorSil, parametreEkle, parametreGuncelle, parametreSil, terminaliGetir } from '../../helpers/satisYerminaliIslemleri';

test('Mediator İşlemleri - Ekleme, Güncelleme ve Silme', async ({ page }) => {

    console.log('===>  Mediator İşlemleri - Ekleme, Güncelleme ve Silme  <===');

    // Önce sisteme giriş yap
    await login(page);

    // Zoom işlemi
    await zoom(page);

    // Terminal listesini getir
    await terminaliGetir(page);

    //detay butonuna tıkla
    await page.getByRole('link', { name: 'Expand Details' }).click();

    // Ödeme Aracısı ekle
    await mediatorEkle(page);

    // Ödeme Aracısı güncelle
    await mediatorGuncelle(page);

    // Parametre ekle
    await parametreEkle(page);
    // Parametre güncelle
    await parametreGuncelle(page);
    // Parametre sil
    await parametreSil(page);   

    // Ödeme Aracısı sil
    await mediatorSil(page);



 

    await page.pause();

}); 