# API Test Klasörü

Bu klasör, Playwright ile API testleri yapmak için gerekli dosyaları içerir.

## Dosya Yapısı

- `global-setup.ts` - Tek seferlik authentication yapar
- `api-helpers.ts` - API testleri için yardımcı fonksiyonlar
- `api-auth.spec.ts` - Authentication testleri örneği
- `README.md` - Bu dosya

## Nasıl Çalışır?

### 1. Global Setup (Tek Seferlik Authentication)
- Test öncesinde 1 kez login olur
- Token/cookie/session bilgisini saklar
- Tüm testler bu oturum bilgisiyle çalışır

### 2. Avantajları
- Testler çok daha hızlıdır
- Gereksiz login istekleri atılmaz
- Token yönetimi otomatiktir

## Kullanım

### Test Çalıştırma
```bash
# Tüm API testlerini çalıştır
npx playwright test tests/api-test/

# Sadece authentication testlerini çalıştır
npx playwright test tests/api-test/api-auth.spec.ts
```

### Global Setup Çalıştırma
```bash
# Global setup'ı manuel çalıştır
npx playwright test --global-setup tests/api-test/global-setup.ts
```

## Özelleştirme

### 1. Endpoint Değiştirme
`global-setup.ts` dosyasında login endpoint'ini değiştirin:
```typescript
// Gerçek projede login endpoint'inizi kullanın
const response = await reqContext.post('YOUR_LOGIN_ENDPOINT', {
  data: { 
    username: 'your_username', 
    password: 'your_password' 
  }
});

// Token'ı response'dan alın
const body = await response.json();
process.env.API_TOKEN = body.token;
```

### 2. Base URL Değiştirme
`api-helpers.ts` dosyasında base URL'i değiştirin:
```typescript
export const apiHelper = new APIHelper('YOUR_BASE_URL');
// Örnek: export const apiHelper = new APIHelper('https://api.yourcompany.com');
```

### 3. Authentication Header Değiştirme
`api-helpers.ts` dosyasında header formatını değiştirin:
```typescript
'Authorization': `Bearer ${this.authToken}` // veya 'Token ${this.authToken}'
```

## Environment Variables

Global setup'tan sonra şu environment variable'lar kullanılabilir:
- `API_TOKEN` - Authentication token'ı

## Storage State

Authentication sonrası `auth-storage-state.json` dosyası oluşturulur. Bu dosya cookie ve session bilgilerini içerir.

## Notlar

- Global setup sadece 1 kez çalışır
- Token geçersiz olduğunda global setup'ı tekrar çalıştırın
- Gerçek projede endpoint'leri ve credential'ları güncelleyin
- Test verilerini production'da kullanmayın
