# 🌙 Dreamy Tales — Animated Bedtime Stories

464 gentle, animated bedtime stories with read-aloud narration, plus a Learning
Time section (colors, shapes, letters, numbers, words and math from playgroup
to grade two), made for little dreamers.

## Run it on your computer

Requires Node.js 18+.

```bash
git clone -b claude/animated-bedtime-stories-hmdmk6 https://github.com/fawaadsaleem/bolt-app.git
cd bolt-app
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Deploy to a VPS (e.g. stories.fawaadsaleem.com)

The app builds to plain static files — no server-side code needed.

**1. On the VPS, build the app:**

```bash
git clone -b claude/animated-bedtime-stories-hmdmk6 https://github.com/fawaadsaleem/bolt-app.git
cd bolt-app
npm install
npm run build
sudo mkdir -p /var/www/stories
sudo cp -r dist/* /var/www/stories/
```

(If the VPS doesn't have Node 18+, run the build on your own machine instead and
copy the `dist/` folder up with `scp -r dist/* user@your-vps:/var/www/stories/`.)

**2. Add an nginx site** (`/etc/nginx/sites-available/stories`):

```nginx
server {
    listen 80;
    server_name stories.fawaadsaleem.com;
    root /var/www/stories;
    index index.html;

    # SPA routing: /story/42 etc. must fall back to index.html
    location / {
        try_files $uri /index.html;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/stories /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**3. Point DNS:** add an `A` record for `stories` → your VPS IP at your domain registrar.

**4. Free HTTPS:**

```bash
sudo certbot --nginx -d stories.fawaadsaleem.com
```

> Note: the read-aloud voice (Web Speech API) requires HTTPS on most browsers,
> so don't skip step 4.

**Updating later:** `cd bolt-app && git pull && npm run build && sudo cp -r dist/* /var/www/stories/`
