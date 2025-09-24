## local (laptop pribadi)

docker build -t fuadgrimaldi/fullstack-web-kecamatan:latest .
docker push fuadgrimaldi/fullstack-web-kecamatan:latest

## konfigurasi nginx

sudo nano /etc/nginx/sites-available/my-project

```bash
server {
    server_name kawilangrancakalong.fuadonetwo.my.id;

    location /uploads/ {
       alias /home/Fuadgrimaldi/SIKSumedang/uploads/;
       expires 0;
       add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api/ {
        proxy_pass http://localhost:3002/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Next.js static file
    location /_next/ {
        proxy_pass http://localhost:3002/_next/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}

```

sudo ln -s /etc/nginx/sites-available/my-project /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

git clone https://github.com/FuadGrimaldi/SIKSumedang.git
ls -la
sudo chmod 755 /home/Fuadgrimaldi
sudo chmod 755 /home/Fuadgrimaldi/SIKSumedang (drwxrwxr-x -> drwxr-xr-x)
cd SIKSumedang
nano .env
sudo chown -R www-data:www-data /home/Fuadgrimaldi/SIKSumedang/uploads
sudo chmod -R 755 /home/Fuadgrimaldi/SIKSumedang/uploads
sudo docker-compose up -d
sudo systemctl reload nginx

cek
sudo docker exec -it fullstack-web-kecamatan sh
