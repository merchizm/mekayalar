# Dokploy Deployment Guide

This guide explains how to deploy the Mekayalar Laravel application to Dokploy with an external MySQL database.

## Prerequisites

- Dokploy instance running and accessible
- External MySQL database (version 8.0+)
- Database credentials

## Configuration Steps

### 1. Prepare Your External MySQL Database

Create a database and user for the application:

```sql
CREATE DATABASE mekayalar CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'mekayalar_user'@'%' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON mekayalar.* TO 'mekayalar_user'@'%';
FLUSH PRIVILEGES;
```

### 2. Configure Environment Variables in Dokploy

Set the following environment variables in your Dokploy project:

#### Application Settings
```env
APP_NAME="Mekayalar"
APP_ENV=production
APP_KEY=base64:your-app-key-here
APP_DEBUG=false
APP_URL=https://yourdomain.com

# Port configuration
APP_PORT=8080
```

#### Database Configuration
```env
DB_CONNECTION=mysql
DB_HOST=your-mysql-host.com
DB_PORT=3306
DB_DATABASE=mekayalar
DB_USERNAME=mekayalar_user
DB_PASSWORD=your_secure_password
```

#### Redis Configuration
```env
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
```

#### Cache & Session
```env
CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

### 3. Deploy to Dokploy

#### Option A: Using Dokploy UI

1. Create a new project in Dokploy
2. Select "Docker Compose" as deployment method
3. Point to your repository
4. Configure to use both compose files:
   - Main: `docker-compose.yml`
   - Override: `docker-compose.external-db.yml`
5. Add environment variables from step 2
6. Deploy

#### Option B: Using Docker Compose Command

If deploying manually or via CLI:

```bash
# Navigate to your project directory
cd /path/to/mekayalar

# Deploy with external database configuration
docker-compose -f docker-compose.yml -f docker-compose.external-db.yml up -d
```

### 4. Run Initial Setup

After deployment, run the following commands inside the app container:

```bash
# Enter the app container
docker exec -it <app-container-name> bash

# Run migrations
php artisan migrate --force

# Clear and cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
php artisan storage:link

# Generate sitemap (if needed)
php artisan sitemap:generate
```

## Architecture Overview

### Services

The application uses the following services:

1. **app**: PHP-FPM container running Laravel
   - Health check: PHP-FPM status
   - Depends on: Redis (external MySQL)

2. **nginx**: Web server
   - Health check: HTTP request to localhost
   - Depends on: app
   - Exposed port: 8080 (configurable via APP_PORT)

3. **redis**: Cache and queue backend
   - Health check: Redis ping
   - No external dependencies

4. **queue**: Laravel queue worker
   - Health check: Queue work --once command
   - Depends on: app, redis

5. **mysql**: Internal MySQL (DISABLED for Dokploy)
   - Only used for local development
   - Explicitly disabled via profile in external-db config

### Health Checks

All services include health checks for proper orchestration:

- **app**: Checks PHP-FPM availability
- **nginx**: HTTP request to ensure web server is responding
- **redis**: Redis ping command
- **queue**: Runs a queue job to verify functionality

### Dependency Management

The configuration uses conditional dependencies:

- `mysql` dependency is marked as `required: false`
- External DB override removes MySQL dependency entirely
- Health check conditions ensure proper startup order

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. **Verify database credentials**:
   ```bash
   docker exec -it <app-container-name> php artisan tinker
   DB::connection()->getPdo();
   ```

2. **Check if external MySQL is accessible**:
   ```bash
   docker exec -it <app-container-name> ping your-mysql-host.com
   ```

3. **Verify MySQL user permissions**:
   ```sql
   SHOW GRANTS FOR 'mekayalar_user'@'%';
   ```

### Container Health Check Failures

If health checks are failing:

```bash
# Check app health
docker exec <app-container-name> php-fpm-healthcheck

# Check nginx health
docker exec <nginx-container-name> wget --quiet --tries=1 --spider http://localhost/

# Check redis health
docker exec <redis-container-name> redis-cli ping

# View service logs
docker logs <container-name>
```

### Permission Issues

If you encounter permission errors:

```bash
# Fix storage and cache permissions
docker exec <app-container-name> chown -R www-data:www-data /var/www/html/storage
docker exec <app-container-name> chown -R www-data:www-data /var/www/html/bootstrap/cache
docker exec <app-container-name> chmod -R 775 /var/www/html/storage
docker exec <app-container-name> chmod -R 775 /var/www/html/bootstrap/cache
```

## Performance Optimization

### Recommended MySQL Configuration

For optimal performance, configure your external MySQL with:

```ini
[mysqld]
# Connection settings
max_connections = 150
max_allowed_packet = 64M

# Buffer settings
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M

# Character set
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
```

### Laravel Optimization

The Dockerfile includes production optimizations:

- Composer autoloader optimization: `--optimize-autoloader`
- No dev dependencies: `--no-dev`
- Cached configuration, routes, and views

### Redis Configuration

For production, consider:

- Setting a `maxmemory` limit
- Configuring an eviction policy
- Enabling persistence if needed

## Security Considerations

### Environment Variables

- Never commit `.env` file to repository
- Use Dokploy's environment variable management
- Rotate `APP_KEY` and database passwords regularly

### Database Access

- Restrict MySQL user to specific host if possible
- Use strong passwords
- Consider SSL/TLS for database connections

### Application Security

- Set `APP_DEBUG=false` in production
- Configure proper CORS settings
- Set up CSRF protection
- Use HTTPS (configure via Dokploy reverse proxy)

## Monitoring

### Service Health

Monitor service health via:

```bash
# Check all services
docker ps

# Check health status
docker inspect <container-name> | grep -A 10 Health
```

### Application Logs

```bash
# Laravel logs
docker exec <app-container-name> tail -f storage/logs/laravel.log

# Nginx access logs
docker logs <nginx-container-name>

# Queue worker logs
docker logs <queue-container-name>
```

## Scaling Considerations

### Horizontal Scaling

To scale the application:

1. **Queue Workers**: Scale the queue service
   ```bash
   docker-compose up -d --scale queue=3
   ```

2. **Load Balancing**: Use Dokploy's built-in load balancing for app/nginx

3. **Database**: Ensure external MySQL can handle increased connections

### Vertical Scaling

Adjust container resources in Dokploy:

- Increase PHP-FPM workers (edit Dockerfile)
- Allocate more memory to Redis
- Optimize database queries and indexes

## Backup Strategy

### Database Backups

Set up automated backups for your external MySQL:

```bash
# Manual backup
mysqldump -h your-mysql-host.com -u mekayalar_user -p mekayalar > backup.sql

# Restore
mysql -h your-mysql-host.com -u mekayalar_user -p mekayalar < backup.sql
```

### Application Files

Backup user-uploaded files from storage:

```bash
# Backup storage
docker cp <app-container-name>:/var/www/html/storage/app ./storage-backup

# Restore
docker cp ./storage-backup <app-container-name>:/var/www/html/storage/app
```

## Support

For issues specific to:
- **Dokploy**: Check [Dokploy Documentation](https://dokploy.com/docs)
- **Laravel**: Check [Laravel Documentation](https://laravel.com/docs)
- **This Application**: Create an issue in the repository
