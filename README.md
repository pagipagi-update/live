# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Bola88 Livestreaming App
Aplikasi web livestreaming frontend yang dibangun dengan React.js, terintegrasi dengan Owncast untuk live video dan fitur chat. Desain mengadopsi tema gelap modern dengan aksen warna biru (#1698CE).

Fitur Utama
Header Dinamis: Teks berjalan dengan pesan selamat datang dan tombol "Kunjungi Situs Utama" di pojok kanan.
Sidebar Navigasi: Navigasi vertikal dengan kategori live stream (Live Sports, Live Esports, Live Slots, Live Togel, Playlist, Home).
Promotional Banner: Area khusus di sidebar untuk banner promosi vertikal.
Homepage: Menampilkan Hero Section utama dan bagian "Live Now" dengan kartu yang dapat diklik untuk setiap kategori.
Halaman Kategori Live: Setiap kategori memiliki halaman khusus yang menampilkan:
Video Live Owncast: Menggunakan <iframe> untuk menampilkan stream video dari server Owncast Anda.
Live Chat: Chatbox interaktif yang terhubung ke WebSocket chat Owncast, memungkinkan pesan real-time.
Stream Info: Menampilkan judul stream, deskripsi, dan jumlah penonton secara dinamis dari Owncast API.
Teknologi yang Digunakan
React.js: Library JavaScript untuk membangun antarmuka pengguna.
React Router DOM: Untuk navigasi antar halaman dalam aplikasi Single Page Application (SPA).
React Icons: Koleksi ikon populer untuk React.
CSS Modules (atau plain CSS): Untuk styling komponen.
Owncast API & WebSocket: Untuk integrasi video live, chat, dan status stream.
Prasyarat
Sebelum memulai, pastikan Anda memiliki hal-hal berikut terinstal di sistem Anda:

Node.js & npm: Download Node.js (npm akan terinstal bersama Node.js).
Git: Download Git.
Server Owncast yang Berjalan: Pastikan Anda memiliki instance Owncast yang sedang berjalan dan dapat diakses (misalnya, di http://localhost:8080 atau URL publik Anda).
Panduan Setup dan Menjalankan Proyek
Ikuti langkah-langkah di bawah ini untuk mendapatkan salinan proyek dan menjalankannya di mesin lokal Anda.

1. Clone Repositori
Buka terminal atau command prompt dan clone repositori proyek dari GitHub:

Bash

git clone https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git
Ganti YOUR_USERNAME dengan username GitHub Anda dan REPOSITORY_NAME dengan nama repositori proyek Anda di GitHub.

2. Navigasi ke Direktori Proyek
Masuk ke folder proyek yang baru saja Anda clone:

Bash

cd REPOSITORY_NAME
Misalnya: cd bola88-livestreaming-app

3. Instal Dependensi
Instal semua paket dependensi yang dibutuhkan oleh proyek:

Bash

npm install
4. Konfigurasi Owncast URL
Aplikasi ini terintegrasi dengan Owncast. Anda perlu mengatur URL dasar Owncast Anda di setiap file halaman live stream.

Buka file-file berikut di editor kode Anda:
src/pages/LiveSportsPage.js
src/pages/LiveEsportsPage.js
src/pages/LiveSlotsPage.js
src/pages/LiveTogelPage.js
Di bagian atas setiap file, cari baris berikut:
JavaScript

const OWNCAST_BASE_URL = 'http://localhost:8080'; // GANTI INI DENGAN URL OWNCAST ANDA!
Ganti 'http://localhost:8080' dengan URL Owncast Anda yang sebenarnya (misalnya, 'https://live.example.com' atau 'http://192.168.1.100:8080').
5. Jalankan Aplikasi
Setelah konfigurasi selesai, Anda bisa menjalankan aplikasi React dalam mode pengembangan:

Bash

npm start
Aplikasi akan terbuka di browser default Anda (biasanya di http://localhost:3000).

Struktur Proyek
livestreaming-app-bola88/
├── public/                 # File statis (HTML, ikon)
├── src/
│   ├── components/         # Komponen React yang dapat digunakan kembali (Header, Sidebar, ChatBox, VideoCard dll.)
│   │   ├── Header.js
│   │   ├── Header.css
│   │   ├── Sidebar.js
│   │   ├── Sidebar.css
│   │   ├── HeroSection.js
│   │   ├── HeroSection.css
│   │   ├── VideoCard.js
│   │   ├── VideoCard.css
│   │   ├── ChatBox.js
│   │   └── ChatBox.css
│   ├── pages/              # Komponen halaman utama (tampilan penuh)
│   │   ├── HomePage.js
│   │   ├── LiveSportsPage.js
│   │   ├── LiveEsportsPage.js
│   │   ├── LiveSlotsPage.js
│   │   ├── LiveTogelPage.js
│   │   └── PageStyles.css  # Styling umum untuk halaman
│   ├── App.js              # Komponen utama aplikasi & konfigurasi React Router
│   ├── App.css             # Styling global untuk layout App
│   ├── index.js            # Titik masuk utama aplikasi React
│   └── index.css           # Styling CSS global (variabel warna, reset CSS)
├── .gitignore              # File dan folder yang diabaikan Git
├── package.json            # Daftar dependensi dan script proyek
├── README.md               # File ini!
└── ...
Kontribusi
Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori, buat branch baru, lakukan perubahan Anda, dan ajukan Pull Request.