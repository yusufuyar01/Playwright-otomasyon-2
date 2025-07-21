/**
 * Rastgele string üretme fonksiyonları
 */

/**
 * Belirtilen uzunlukta rastgele string üretir
 * @param length String uzunluğu
 * @returns Rastgele string
 */
export function rastgeleString(length: number = 10): string {
    const karakterler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let sonuc = '';
    
    for (let i = 0; i < length; i++) {
        sonuc += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
    }
    
    return sonuc;
}

/**
 * Sadece harflerden oluşan rastgele string üretir
 * @param length String uzunluğu
 * @returns Rastgele harf stringi
 */
export function rastgeleHarfString(length: number = 10): string {
    const harfler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let sonuc = '';
    
    for (let i = 0; i < length; i++) {
        sonuc += harfler.charAt(Math.floor(Math.random() * harfler.length));
    }
    
    return sonuc;
}

/**
 * Sadece rakamlardan oluşan rastgele string üretir
 * @param length String uzunluğu
 * @returns Rastgele rakam stringi
 */
export function rastgeleRakamString(length: number = 10): string {
    const rakamlar = '0123456789';
    let sonuc = '';
    
    for (let i = 0; i < length; i++) {
        sonuc += rakamlar.charAt(Math.floor(Math.random() * rakamlar.length));
    }
    
    return sonuc;
}

/**
 * Alfanumerik karakterler ve özel karakterler içeren rastgele string üretir
 * @param length String uzunluğu
 * @returns Rastgele karma string
 */
export function rastgeleKarmaString(length: number = 10): string {
    const karakterler = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    let sonuc = '';
    
    for (let i = 0; i < length; i++) {
        sonuc += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
    }
    
    return sonuc;
}

/**
 * Belirtilen karakter setinden rastgele string üretir
 * @param karakterler Kullanılacak karakter seti
 * @param length String uzunluğu
 * @returns Rastgele string
 */
export function ozelKarakterliString(karakterler: string, length: number = 10): string {
    let sonuc = '';
    
    for (let i = 0; i < length; i++) {
        sonuc += karakterler.charAt(Math.floor(Math.random() * karakterler.length));
    }
    
    return sonuc;
} 