Vibe 6W — PWA support files

Place these files next to your index.html (GitHub Pages root):
- manifest.webmanifest
- sw.js
- icon-192.png
- icon-512.png

In index.html <head>, add:
<link rel="manifest" href="manifest.webmanifest">

At the bottom of index.html, register the service worker:
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js'));
}
</script>