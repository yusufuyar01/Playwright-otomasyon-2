import { Page } from '@playwright/test';

/**
 * Rastgele Türkiye telefon numarası üret
 * @returns Rastgele oluşturulmuş Türkiye telefon numarası
 */
export function telNoUret(): string {
    // Türkiye telefon numarası formatı: +90 5XX XXX XX XX
    const mobilKodlar = ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];
    const rastgeleKod = mobilKodlar[Math.floor(Math.random() * mobilKodlar.length)];
    
    // 7 haneli rastgele numara üret
    const rastgeleNumara = Math.floor(Math.random() * 9000000) + 1000000;
    
    return `+90 ${rastgeleKod} ${rastgeleNumara.toString().slice(0, 3)} ${rastgeleNumara.toString().slice(3, 5)} ${rastgeleNumara.toString().slice(5, 7)}`;
}

/**
 * Ülke seçici combobox'a tıkla ve Türkiye'yi seç
 * @param page Playwright Page nesnesi
 */
export async function turkiyeSec(page: Page): Promise<void> {
    // Combobox'a tıkla
    await page.getByRole('combobox').click();
    
    // Türkiye (+90) seçeneğini seç
    await page.getByText('Türkiye (+90)').click();
} 