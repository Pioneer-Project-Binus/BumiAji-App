FROM php:8.4-cli

# Install dependencies
RUN apt-get update && \
    apt-get install -y curl git unzip

# Install PHP extensions needed by Laravel
RUN docker-php-ext-install pdo pdo_mysql && docker-php-source delete

# Install Node.js dan npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@latest

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer

# Set working directory
WORKDIR /app

# Copy dependency files lebih dulu untuk memanfaatkan cache
COPY composer.json composer.lock ./ 
COPY package.json package-lock.json ./ 

# Install PHP dan Node dependencies
RUN composer install --no-scripts --no-autoloader
RUN npm install

# Baru copy semua source code
COPY . .

# Generate optimized autoloader
RUN composer dump-autoload --optimize

# Expose ports untuk Laravel dan Vite
EXPOSE 8000
EXPOSE 3000

# Jalankan dengan composer run dev
CMD ["composer", "run", "dev"]