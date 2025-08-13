import { Page, BrowserContext } from '@playwright/test';
import { login2 } from './login2';

// VKN (TC Numarası) üretme - Web sitesinden
export async function tcknUret(page: Page): Promise<string> {
    let newPage: Page | null = null;
    let context: BrowserContext | null = null;
    
    try {
        // Yeni context ve sayfa oluştur (clipboard izni ile)
        context = await page.context().browser()!.newContext({
            permissions: ['clipboard-read', 'clipboard-write']
        });
        newPage = await context.newPage();
        
        // Web sitesine git
        await newPage.goto('https://tcnumarasi.com/tcuret');

        if (await newPage.getByText('SSL handshake failed').isVisible()) {
            console.log('❌ SSL handshake failed. Sayfa yeniden yükleniyor...');
            await newPage.reload();
          }

        // "TC No Üret" butonuna tıkla
        await newPage.getByText('TC NO ÜRET', { exact: true }).click();
        
        // Kısa bir bekleme süresi (sayfanın yüklenmesi için)
        await newPage.waitForTimeout(1000);
        
        // "Kopyala" butonuna tıkla
        await newPage.getByText('KOPYALA').click();
        
        // Kopyalanan değeri al (clipboard'dan)
        const tckn = await newPage.evaluate(() => {
            return navigator.clipboard.readText();
        });
        
        return tckn;
    } catch (error) {
        console.error('TC No üretme hatası:', error);
        // Hata durumunda rastgele bir TC No döndür
        return rastgeleTcknUret();
    } finally {
        // Yeni oluşturulan sayfa ve context'i kapat
        if (newPage) {
            await newPage.close();
        }
        if (context) {
            await context.close();
        }
    }
}

// Yedek fonksiyon - rastgele TC No üretme
function rastgeleTcknUret(): string {
    // İlk hane 0 olamaz
    let tckn = Math.floor(Math.random() * 9) + 1;
    
    // Sonraki 8 hane rastgele
    for (let i = 0; i < 8; i++) {
        tckn = tckn * 10 + Math.floor(Math.random() * 10);
    }
    
    // Son hane kontrol hanesi (basit algoritma)
    const sonHane = (tckn % 9);
    tckn = tckn * 10 + sonHane;
    
    console.log('Rastgele TC No yedek fonksiyonla üretiliyor');
    return tckn.toString();
} 