/**
 * Rastgele e-posta adresi üreten fonksiyon
 * @returns Rastgele oluşturulmuş gmail e-posta adresi
 */
export function ePostaUret(): string {
    // E-posta adresinde kullanılabilecek karakterler
    const karakterler = 'abcdefghijklmnopqrstuvwxyz0123456789';
    
    // Rastgele uzunluk (5-15 karakter arası)
    const uzunluk = Math.floor(Math.random() * 11) + 5;
    
    let rastgeleString = '';
    
    // Rastgele karakterlerden string oluştur
    for (let i = 0; i < uzunluk; i++) {
        const rastgeleIndex = Math.floor(Math.random() * karakterler.length);
        rastgeleString += karakterler[rastgeleIndex];
    }
    
    // Gmail domain'ini ekle ve döndür
    return `${rastgeleString}@gmail.com`;
}

/**
 * Belirli uzunlukta e-posta adresi üreten fonksiyon
 * @param uzunluk E-posta adresinin uzunluğu (domain hariç)
 * @returns Belirtilen uzunlukta gmail e-posta adresi
 */
export function ePostaUretUzunluk(uzunluk: number): string {
    if (uzunluk < 1) {
        throw new Error('E-posta uzunluğu en az 1 karakter olmalıdır.');
    }
    
    const karakterler = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let rastgeleString = '';
    
    for (let i = 0; i < uzunluk; i++) {
        const rastgeleIndex = Math.floor(Math.random() * karakterler.length);
        rastgeleString += karakterler[rastgeleIndex];
    }
    
    return `${rastgeleString}@gmail.com`;
} 