const http = require('http');

const urls = [
  '/',
  '/script.js',
  '/digital%20assest/Logo.png',
  '/digital%20assest/homepagesolar.jpg',
  '/digital%20assest/homepagesolarjpg.jpg',
  '/digital%20assest/Technician_installing_solar_panel_2K_202609091019.jpeg',
  '/digital%20assest/excide%20Heavy%20duty%20battery%20product_display_2K_202609091018.jpeg',
  '/digital%20assest/Luminous%20Battery%20pack_2K_202609091017.jpeg',
  '/digital%20assest/homepagesolarjpg/ezgif-frame-001.jpg',
  '/digital%20assest/homepagesolarjpg/ezgif-frame-240.jpg',
  '/digital%20assest/homepagesolar.mp4',
  '/digital%20assest/homepagesolar.webm',
  '/robots.txt',
  '/sitemap.xml'
];

async function run() {
  let allOk = true;
  for (const u of urls) {
    await new Promise(resolve => {
      http.get('http://localhost:3000' + u, res => {
        const ok = res.statusCode === 200 || res.statusCode === 206;
        if (!ok) allOk = false;
        console.log(`${ok ? '✓ OK' : '✗ FAIL'} [${res.statusCode}] (${res.headers['content-type']}) ${u}`);
        resolve();
      }).on('error', err => {
        allOk = false;
        console.log(`✗ ERR: ${err.message} -> ${u}`);
        resolve();
      });
    });
  }
  console.log(`\nResult: ${allOk ? 'ALL ASSETS ACCESSIBLE' : 'SOME ASSETS FAILED'}`);
}

run();
