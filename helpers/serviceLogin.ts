// helpers/login2.ts
import { Page } from '@playwright/test';

export async function serviceLogin(page: Page): Promise<void> {
  
  // ===== ADIM 1: Sayfaya Gitme =====
  // OverPay Reseller Dashboard sayfasına yönlendirme
  await page.goto('https://overpayresellerdemo.overtech.com.tr/login');
  
  // Sayfanın yüklenmesini bekle
  await page.waitForLoadState('networkidle');
  
  // ===== ADIM 2: Kullanıcı Adı ve Şifre Girişi =====
  // Kullanıcı adı alanını bul ve doldur
  const usernameInput = page.locator('input[type="text"], input[name="username"], input[id="username"], #UserName');
  await usernameInput.fill('servisdestek.level1'); // Gerçek kullanıcı adınızı buraya yazın
  
  const passwordInput = page.locator('input[type="password"], input[name="password"], input[id="password"], #Password');
  await passwordInput.fill('1234'); // Gerçek şifrenizi buraya yazın
  

  // ===== ADIM 3: Giriş Butonuna Tıklama =====
  // Giriş butonunu bul ve tıkla
  const loginButton = page.locator('button[type="submit"], input[type="submit"],  #loginButton');
  await loginButton.click();


  // ===== ADIM 4: Test Sonucu =====
  // Test tamamlandı, 7 saniye bekle ve browser'ı kapat
  await page.waitForTimeout(3000);
  console.log('Servis Destek (Level 1) ile giriş yapıldı');


}

export async function serviceLogout(page: Page): Promise<void> {

  await page.getByText('S', { exact: true }).first().hover();
  await page.getByText('Çıkış').click();
  console.log('Servis Destek (Level 1) ile çıkış yapıldı');
  await page.waitForTimeout(1000);
}