# Docker Setup Guide

This project supports both internal and external MySQL database configurations.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Option 1: Internal MySQL (Default)

Run the application with a containerized MySQL database:

```bash
# Start all services with internal MySQL
docker-compose --profile internal-db up -d

# Run migrations
docker-compose exec app php artisan migrate

# Generate application key (first time only)
docker-compose exec app php artisan key:generate
```

### Option 2: External MySQL

Connect to an external MySQL server (e.g., production database, cloud database):

1. Update your `.env` file with external database credentials:

```env
DB_HOST=your-external-mysql-host
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

2. Start services without internal MySQL:

```bash
# Start services with external database
docker-compose -f docker-compose.yml -f docker-compose.external-db.yml up -d

# Run migrations
docker-compose exec app php artisan migrate
```

## Services

- **app**: Laravel application (PHP-FPM)
- **nginx**: Web server (port 8080 by default)
- **mysql**: MySQL 8.0 (only with `--profile internal-db`)
- **redis**: Redis cache server
- **queue**: Laravel queue worker

## Environment Variables

Configure in your `.env` file:

```env
# Application
APP_PORT=8080

# Database (Internal)
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=mekayalar
DB_USERNAME=root
DB_PASSWORD=secret

# Database (External)
DB_HOST=your-external-host
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
```

## Common Commands

```bash
# Start services
docker-compose --profile internal-db up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f app

# Execute artisan commands
docker-compose exec app php artisan [command]

# Access MySQL (internal only)
docker-compose exec mysql mysql -u root -p

# Clear cache
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan view:clear

# Install composer dependencies
docker-compose exec app composer install

# Install npm dependencies
docker-compose exec app npm install

# Build assets
docker-compose exec app npm run build
```

## Accessing the Application

Once running, access the application at: `http://localhost:8080`

## Troubleshooting

### Permission Issues

```bash
docker-compose exec app chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
docker-compose exec app chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
```

### Database Connection Issues (External)

1. Ensure your external database server allows connections from Docker containers
2. Check firewall rules
3. Verify credentials in `.env` file

### Rebuild Containers

```bash
docker-compose down
docker-compose build --no-cache
docker-compose --profile internal-db up -d
```

## Production Considerations

- Use environment-specific `.env` files
- Set `APP_DEBUG=false` in production
- Configure proper database backups
- Use secrets management for sensitive credentials
- Consider using managed database services for production
