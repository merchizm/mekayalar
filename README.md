# mekayalar.com - Kişisel Web Sitesi

<p align="center">
  <img src="./public/assets/img/mekayalar.svg" width="400" alt="Mekayalar Logo">
</p>

Modern teknolojilerle geliştirdiğim kişisel web sitemi kaynak kodları. Blog yazıları, şiirler, projeler ve kitap önerilerimi paylaştığım tam özellikli bir platform.

## 🚀 Teknolojiler

- **Backend**: Laravel 10.x + PHP 8.1+
- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Database**: MySQL/PostgreSQL
- **Build Tool**: Vite

## ✨ Özellikler

### 🎯 Ana Özellikler
- **Blog Sistemi**: Markdown destekli blog yazılari
- **Şiir Koleksiyonu**: Kişisel şiir arşivi
- **Proje Portfolyosu**: GitHub entegrasyonlu proje vitrini
- **Kitaplık**: Okuma listesi ve öneriler
- **Yer İmleri**: Faydalı bağlantılar koleksiyonu

### 🎨 Kullanıcı Deneyimi
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Dark/Light Mode**: Otomatik tema değişimi
- **Saat Dilimi Desteği**: Dinamik tema geçişi
- **Smooth Animations**: Akıcı geçiş efektleri
- **Touch Optimized**: Mobil dokunmatik deneyim

### 🔧 Yönetim Paneli
- **Admin Dashboard**: Kapsamlı yönetim arayüzü
- **Content Management**: Blog, şiir ve proje yönetimi
- **Media Manager**: Dosya yükleme ve organizasyon
- **Analytics**: Ziyaretçi istatistikleri

## 🛠️ Kurulum

### Gereksinimler

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **npm** veya **yarn**
- **MySQL** >= 5.7 veya **PostgreSQL** >= 12
- **Git**

### Adım Adım Kurulum

1. **Repoyu klonlayın**
```bash
git clone https://github.com/kullanici/mekayalar.git
cd mekayalar
```

2. **PHP bağımlılıklarını yükleyin**
```bash
composer install
```

3. **Node.js bağımlılıklarını yükleyin**
```bash
npm install
# veya
yarn install
```

4. **Environment dosyasını ayarlayın**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Veritabanı ayarlarını yapın**
`.env` dosyasında veritabanı bilgilerini düzenleyin:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mekayalar
DB_USERNAME=root
DB_PASSWORD=
```

6. **Veritabanı migration'larını çalıştırın**
```bash
php artisan migrate
```

7. **Seed verilerini yükleyin** (isteğe bağlı)
```bash
php artisan db:seed
```

8. **Storage linkini oluşturun**
```bash
php artisan storage:link
```

9. **Assets'leri build edin**
```bash
npm run build
# veya development için
npm run dev
```

10. **Sunucuyu başlatın**
```bash
php artisan serve
```

Site artık `http://localhost:8000` adresinde çalışır durumda!

## 🔧 Geliştirme

### Development Sunucu
```bash
# Laravel sunucusu
php artisan serve

# Vite dev server (ayrı terminalde)
npm run dev
```

### Build Komutları
```bash
# Production build
npm run build

# Development build
npm run dev

# Watch mode
npm run watch
```

### Veritabanı İşlemleri
```bash
# Yeni migration
php artisan make:migration create_table_name

# Migration çalıştır
php artisan migrate

# Rollback
php artisan migrate:rollback

# Seeder oluştur
php artisan make:seeder TableSeeder
```

## 📁 Proje Yapısı

```
mekayalar/
├── app/
│   ├── Http/Controllers/       # Controller'lar
│   ├── Models/                 # Eloquent modeller
│   ├── Services/               # Harici servis entegrasyonları
│   └── Livewire/              # Livewire bileşenleri
├── resources/
│   ├── js/
│   │   ├── Components/        # React bileşenleri
│   │   ├── Pages/            # Inertia sayfaları
│   │   └── Layouts/          # Layout bileşenleri
│   ├── css/                  # Stil dosyaları
│   └── views/                # Blade template'leri
├── database/
│   ├── migrations/           # Veritabanı migration'ları
│   └── seeders/             # Seed dosyaları
└── public/
    ├── assets/              # Statik dosyalar
    └── storage/             # Yüklenen dosyalar
```

## 🎨 Kişiselleştirme

### Tema Ayarları
`resources/css/app.css` dosyasında CSS değişkenlerini düzenleyerek tema renklerini değiştirebilirsiniz.

### İçerik Yönetimi
Admin paneli üzerinden tüm içerikleri yönetebilirsiniz:
- Blog yazıları
- Şiirler
- Projeler
- Kitap önerileri
- Yer imleri

## 🚀 Deployment

### Production Hazırlığı
```bash
# Composer optimize
composer install --optimize-autoloader --no-dev

# Config cache
php artisan config:cache

# Route cache
php artisan route:cache

# View cache
php artisan view:cache

# Assets build
npm run build
```

### Server Gereksinimleri
- PHP 8.1+
- Web server (Apache/Nginx)
- SSL sertifikası
- Composer
- Node.js (build için)

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

⭐ Projeyi beğendiyseniz star vermeyi unutmayın!
