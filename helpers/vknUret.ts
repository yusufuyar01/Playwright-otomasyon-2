import { Page, BrowserContext } from '@playwright/test';

// VKN (Vergi Kimlik Numarası) üretme - Web sitesinden
export async function vknUret(page: Page): Promise<string> {
    let newPage: Page | null = null;
    let context: BrowserContext | null = null;
    
    try {
        // Yeni context ve sayfa oluştur (clipboard izni ile)
        context = await page.context().browser()!.newContext({
            permissions: ['clipboard-read', 'clipboard-write']
        });
        newPage = await context.newPage();
        
        // Web sitesine git
        await newPage.goto('https://tcnumarasi.com/verginouret');

        if (await newPage.getByText('SSL handshake failed').isVisible()) {
            await newPage.reload();
          }
        
        // "Vergi No Üret" butonuna tıkla
        await newPage.getByText('VERGİ NO ÜRET').click();
        
        // Kısa bir bekleme süresi (sayfanın yüklenmesi için)
        await newPage.waitForTimeout(1000);
        
        // "Kopyala" butonuna tıkla
        await newPage.getByText('KOPYALA').click();
        
        // Kopyalanan değeri al (clipboard'dan)
        const vkn = await newPage.evaluate(() => {
            return navigator.clipboard.readText();
        });
        
        return vkn;
    } catch (error) {
        console.error('VKN üretme hatası:', error);
        // Hata durumunda rastgele bir VKN döndür
        return rastgeleVknUret();
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

// Yedek fonksiyon - rastgele VKN üretme
function rastgeleVknUret(): string {
    // İlk hane 0 olamaz
    let vkn = Math.floor(Math.random() * 9) + 1;
    
    // Sonraki 8 hane rastgele
    for (let i = 0; i < 8; i++) {
        vkn = vkn * 10 + Math.floor(Math.random() * 10);
    }
    
    // Son hane kontrol hanesi (basit algoritma)
    const sonHane = (vkn % 9);
    vkn = vkn * 10 + sonHane;
    
    console.log('Rastgele VKN yedek fonksiyonla üretiliyor');
    return vkn.toString();
}

