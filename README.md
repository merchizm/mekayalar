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

## 🛠️ Kurulum

### Gereksinimler

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 18.0
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
