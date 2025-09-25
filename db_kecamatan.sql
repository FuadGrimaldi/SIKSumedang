-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Waktu pembuatan: 24 Sep 2025 pada 07.27
-- Versi server: 8.4.6
-- Versi PHP: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_kecamatan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `acara`
--

CREATE TABLE `acara` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `judul` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lokasi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `waktu` datetime(3) NOT NULL,
  `poster` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `penyelenggara` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_acara` enum('published','draft') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `acara`
--

INSERT INTO `acara` (`id`, `user_id`, `kecamatan_id`, `judul`, `slug`, `deskripsi`, `lokasi`, `waktu`, `poster`, `penyelenggara`, `status_acara`, `created_at`, `updated_at`) VALUES
(1, 2, 48, 'Hajat Buruan atau Hajat Lembur: Syukuran dan Tolak Bala di Pekarangan Rancakalong', 'hajat-buruan-atau-hajat-lembur-syukuran-dan-tolak-bala-di-pekarangan-rancakalong', '<p>Hajat Buruan adalah tradisi turun-temurun masyarakat Desa Rancakalong yang berarti syukuran di halaman rumah. Ritual ini dilaksanakan secara komunal, melibatkan keluarga besar dan tetangga sekitar. Prosesi dimulai dengan penyusunan sesajen sebagai simbol tolak bala. Sesajen biasanya terdiri dari ketupat, nasi putih, daun palias, darandang (olahan singkong khas Sunda), bawang merah, bawang putih, cabai merah, hingga nanas—masing-masing melambangkan doa keselamatan, ketahanan hidup, dan perlindungan.</p><p><br></p><p>Tradisi ini umumnya digelar pada awal bulan Safar, yang dipercaya sebagai masa turunnya marabahaya. Selain itu, Hajat Buruan juga dilakukan khusus bagi bayi yang lahir pada bulan Safar, karena diyakini lebih rentan secara spiritual. Melalui ritual ini, masyarakat memohon perlindungan agar bayi tumbuh sehat, dijauhkan dari hal buruk, serta keluarga diberkahi keselamatan.</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-05-07 13:20:00.000', '/uploads/acara/1758644250383-128309681.jpg', 'Kecamatan Rancakalong', 'published', '2025-09-17 13:21:38.000', '2025-09-23 16:17:30.384'),
(2, 2, 48, 'Bubur Suro', 'bubur-suro', '<h3><strong>Bubur Suro</strong></h3><p><br></p><p>Di Desa Rancakalong, makanan bukan sekadar santapan, melainkan juga simbol budaya dan spiritual dalam berbagai ritus. Salah satunya adalah Bubur Suro, yang secara khusus disajikan mulai 10 Muharram. Menurut masyarakat, hal ini berkaitan dengan kedudukan Muharram sebagai bulan suci dalam Islam, serta kisah Nabi Nuh A.S.. Dikisahkan, saat banjir besar dan persediaan makanan menipis, sisa bahan pangan di kapal dikumpulkan lalu dimasak menjadi bubur campuran, yang kemudian diyakini sebagai asal-usul Bubur Suro.</p><p><br></p><p>Selain versi tersebut, ada pula cerita lisan bahwa tradisi Bubur Suro di Rancakalong bermula pada tahun 1908 M. Kala itu, para wali menghadapi kesulitan pangan. Setelah beberapa kali musyawarah, disepakati setiap orang mencari bahan apa saja, lalu pada 9 Suro mereka berkumpul dan mencampurkan hasil temuan menjadi bubur. Bubur itu dimasak dalam jumlah besar dan dibagikan kepada warga.</p><p><br></p><p>Karena dibuat dari banyak jenis bahan—umbi-umbian, kacang-kacangan, hingga buah-buahan—Bubur Suro dikenal sebagai “bubur seribu bahan”. Jika jumlah bahan kurang, masyarakat menambahkan cau sewu (pisang khusus) sebagai pelengkap. Pada masa lalu, bubur ini bahkan dianggap sebagai pengganti makanan pokok karena kandungan gizinya cukup untuk memenuhi kebutuhan harian di tengah keterbatasan beras.</p><p><br></p><p>Proses pembuatan Bubur Suro dilakukan dengan gotong royong. Sehari sebelumnya, bahan dikumpulkan di satu rumah, lalu dipersiapkan dengan cara dikupas, diparut, ditumbuk, atau direbus. Keesokan harinya, semua bahan dimasak bersama dalam wajan besar yang bisa mencapai tujuh buah. Tradisi ini biasanya diiringi alunan musik Tarawangsa, menambah suasana sakral sekaligus kebersamaan warga.</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-07-06 00:01:00.000', '/uploads/acara/1758643730080-958092570.png', 'Warga Rancakalong', 'published', '2025-09-17 13:23:25.000', '2025-09-23 16:08:50.082'),
(3, 2, 48, 'Hajat Golong: Ritus Sakral dan Simbol Jiwa di Rancakalong', 'hajat-golong-ritus-sakral-dan-simbol-jiwa-di-rancakalong', '<p>Hajat Golong adalah tradisi masyarakat Desa Rancakalong yang dilaksanakan setiap 7–10 Safar. Nama ritual ini diambil dari makanan wajib bernama Golong, yaitu beras yang digulung dengan daun pisang (mirip leupeut). Golong dipersiapkan sehari sebelumnya dengan cara menjemur daun pisang, lalu diisi beras, garam, dan kacang merah.</p><p><br></p><p>Salah satu jenisnya adalah Golong Cacah Jiwa, di mana setiap orang mendapat satu golong. Posisi tulang daun pisang di tengah gulungan melambangkan raga manusia, sedangkan beras di dalamnya melambangkan jiwa. Jumlah golong yang dibuat biasanya menyesuaikan dengan jumlah anggota keluarga, sehingga secara profan juga berfungsi layaknya sensus penduduk.</p><p><br></p><p>Dalam prosesi Hajat Golong terdapat beberapa elemen penting, seperti Kupat Salamet (kelapa, beras, garam yang dibungkus daun bambu) yang ditempatkan di tengah rumah, goah (lumbung), serta dipersembahkan ke arah barat, timur, dan Mata Air Sindanghurip. Ada pula leupeut hanjuang yang diikat lima lilitan, melambangkan panca indera manusia sekaligus hubungan manusia dengan Tuhan dan roh leluhur.</p><p><br></p><p>Hajat Golong mengenal dua jenis golong: golong ritual, yang digunakan sebagai syarat upacara, dan golong konsumsi, yang dimakan bersama. Lebih dari sekadar makanan, golong menjadi simbol ikatan jiwa manusia dengan nilai ilahiah sekaligus wujud kebersamaan dan syukur masyarakat Rancakalong.</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-08-01 13:24:00.000', '/uploads/acara/1758644471636-674628076.png', 'Kecamatan Rancakalong', 'published', '2025-09-17 13:24:59.000', '2025-09-23 16:21:11.638'),
(4, 2, 48, 'Reak Buhun: Warisan Leluhur yang Masih Hidup di Rancakalong', 'reak-buhun-warisan-leluhur-yang-masih-hidup-di-rancakalong', '<p>Seni Reak Buhun telah ada sejak ratusan tahun lalu di Dusun Pasir, Desa Rancakalong, dan menjadi warisan leluhur yang masih dijaga hingga kini. Kata <em>reak</em> berasal dari ungkapan <em>“rame di eak-eak”</em> yang menggambarkan keramaian saat pertunjukan berlangsung. Seni ini memadukan kuda, musik renggong, tabuhan dogdog, dan ekspresi bunyi khas masyarakat setempat.</p><p><br></p><p>Menurut Bah Aris, pimpinan Reak Buhun yang sudah memimpin selama 32 tahun, tradisi ini diwariskan secara turun-temurun dari ayah dan kakeknya. Hingga kini, ia tetap mempertahankan pakem asli Reak Buhun dengan hanya menggunakan empat dogdog, tanpa tambahan alat modern. Dua di antaranya masih tersisa dan berusia lebih dari 127 tahun. Selain kelompok Bah Aris, terdapat kelompok lain di bagian timur Rancakalong yang dipimpin Mang Ana Suwing dan Mang Yeyet.</p><p><br></p><p>Pertunjukan Reak Buhun awalnya selalu dilengkapi dengan beluk (vokal tradisional). Namun kini beluk mulai ditinggalkan karena ketiadaan penerus, digantikan oleh sinden atau terompet. Struktur pertunjukan terdiri dari 12 alat dan properti, yakni empat dogdog, enam angklung, dua barongan, dan dua kuda lumping. Unsur utama disebut “Opat Kalima Pancer”, dimulai dari Talintik hingga Badublag, yang masing-masing memiliki makna tersendiri.</p><p><br></p><p>Reak Buhun memiliki sejumlah pakem dan pantangan: pemain wajib menghormati adat, tidak boleh sombong, tampil tanpa alas kaki sebagai simbol menyatu dengan alam, melakukan <em>sasadu</em> (permisi) sebelum tampil, serta menghindari gerakan joget. Tabuhan pembuka disebut <em>rincik golempang kembang kidung panggeuing</em>, sebagai penghormatan kepada karuhun. Dengan pakem ini, Reak Buhun bukan sekadar hiburan, melainkan seni sakral yang mencerminkan nilai leluhur Rancakalong.</p>', 'Rancakalong', '2025-05-13 14:28:00.000', '/uploads/acara/1758645147574-135493966.jpg', 'Kecamatan Rancakalong', 'published', '2025-09-17 14:28:49.000', '2025-09-23 16:32:27.576'),
(5, 2, 48, 'Shalawat Mulud dan Seni Terbang: Warisan Islami di Rancakalong', 'shalawat-mulud-dan-seni-terbang-warisan-islami-di-rancakalong', '<p>Tradisi lisan atau sasakala menjadi bagian penting dalam kebudayaan Desa Rancakalong, termasuk dalam lahirnya kesenian Shalawat Mulud dan Terbang. Kedua kesenian ini erat kaitannya dengan Islam, yang dianut masyarakat Rancakalong sebagai Islam sejati tanpa terikat pada organisasi keagamaan tertentu.</p><p><br></p><p>Menurut penuturan Abah Dariyat (Abah Yeyet), Ketua Lembaga Adat PMD, kisah asal-usul Shalawat Mulud berawal dari peristiwa kelahiran Nabi Muhammad SAW. Saat itu, inang beliau memukul wadah air kembang sambil melantunkan syair pujian yang dikenal sebagai Al-Barzanji.</p><p><br></p><p>Masuknya kesenian ini ke Rancakalong diyakini terjadi pada abad ke-14 hingga ke-15, seiring runtuhnya Kerajaan Pajajaran. Sunan Gunung Djati bersama Sembilan Wali Sunda (Wali Puhun) memperkenalkan Islam ke Rancakalong. Bersama mereka hadir pula Prabu Kian Santang (Syekh Godog) dari Garut, yang pernah menimba ilmu di Mekkah selama empat tahun. Dari sanalah kesenian Shalawat Mulud dan Terbangan dipercaya berasal, bahkan diyakini langsung dibawa dari Mekkah.</p><p><br></p><p>Alat musik terbang yang digunakan memiliki nama khusus seperti Si Getuk, Si Mawur, Si Bongker, Si Guyur, dan Si Baeud, diwariskan turun-temurun. Abah Yeyet sendiri mewarisi tradisi ini dari buyutnya, Mama Wirja, seorang sesepuh Rancakalong</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-09-08 23:36:00.000', '/uploads/acara/1758644826711-301866502.jpg', 'Kecamatan Rancakalong', 'published', '2025-09-21 06:34:45.958', '2025-09-23 16:27:06.712'),
(6, 2, 48, 'Tarawangsa, Simfoni Tradisi dan Spiritualitas', 'tarawangsa-simfoni-tradisi-dan-spiritualitas', '<p>Tarawangsa adalah ikon budaya Desa Rancakalong yang telah dikenal hingga mancanegara. Kesenian ini terdiri dari jentreng (mirip kacapi) dan tarawangsa/ek-ek (mirip rebab). Menurut Pupung Sumpena, tarawangsa lahir di Rancakalong pada abad ke-15, dibawa oleh Sunan Kalijaga, Sunan Rohmat, Sunan Bonang, dan Sunan Gunung Jati dalam misi penyebaran Islam. Penyebaran agama dilakukan lewat pendekatan budaya bersama sepuluh tokoh Rancakalong yang dikenal sebagai Wali Puhun.</p><p><br></p><p>Secara filosofis, 2 dawai tarawangsa melambangkan dua kalimat syahadat, sedangkan 7 dawai jentreng melambangkan tujuh alam kehidupan. Jika digabungkan menjadi angka 9, melambangkan kesempurnaan dan Wali Songo.</p><p><br></p><p>Dahulu, tarawangsa digunakan sebagai media dakwah Islam dan syukuran pertanian, berakulturasi dengan kepercayaan masyarakat agraris tentang Sri Pohaci.</p><p><br></p><h4>Sesajian Tarawangsa</h4><ul><li>Asak-asakan: makanan matang, melambangkan hidup harus dipikirkan matang.</li><li>Atah-atahan: makanan mentah, mengingatkan agar manusia tidak meniru sifat hewan.</li><li>Bungbuahan: buah-buahan, simbol bahwa kebaikan/keburukan akan berbuah sesuai yang ditanam.</li><li>Beubeutian: umbi-umbian, ajakan untuk rendah hati dan tidak riya.</li><li>Hahampangan: makanan ringan, melambangkan hidup sebaiknya dijalani dengan ringan.</li></ul><p><br></p><p>Sesajen ini bukan untuk makhluk gaib, tetapi sebagai simbol refleksi diri. Kini, tarawangsa berkembang menjadi kesenian hiburan yang tetap menjaga akar tradisi, bahkan tampil di kancah internasional.</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-05-13 02:50:00.000', '/uploads/acara/1758645392301-59329078.jpg', 'Kecamatan Rancakalong', 'published', '2025-09-21 06:47:57.287', '2025-09-23 16:36:32.302'),
(7, 2, 48, 'Réngkong, Simbol Kebersamaan Petani Rancakalong', 'rngkong-simbol-kebersamaan-petani-rancakalong', '<p>Sebagai daerah agraris yang dikelilingi pegunungan, masyarakat Desa Rancakalong melahirkan kesenian Réngkong, yakni seni arak-arakan padi dengan irama khas bambu. Menurut Abah Rukmana, pengembang seni Réngkong, kesenian ini lahir dari dua latar belakang: sebagai ritual syukuran panen untuk menghormati Nyi Pohaci, sekaligus sebagai hiburan pascapanen guna menghilangkan penat dan mempererat solidaritas warga.</p><p>Alat musik Réngkong terbuat dari bambu gombong sepanjang 1–1,5 meter, diberi lubang sonari di kedua ujungnya, lalu dipasang tali ijuk untuk menggantung padi. Saat dipikul dan digoyangkan, bilah bambu akan bertumbukan menghasilkan bunyi khas <em>reng-reng-kong</em> yang menjadi identitasnya.</p><p><br></p><p>Réngkong dimainkan secara berkelompok, para petani berjalan beriringan sambil menggoyangkan tubuh mengikuti ritme. Bunyi dentingan bambu berpadu dengan alat musik pengiring seperti dog-dog, menciptakan suasana meriah penuh kebersamaan.</p><p><br></p><p>Kini, kesenian Réngkong masih dijaga oleh kelompok seni di Rancakalong yang aktif tampil di festival budaya dan upacara adat Ngalkasa, menjadi simbol syukur sekaligus identitas budaya lokal.</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-05-13 02:01:00.000', '/uploads/acara/1758645599652-92634347.jpg', 'Kecamatan Rancakalong', 'published', '2025-09-21 06:59:05.581', '2025-09-23 16:39:59.653'),
(8, 3, 49, 'aqw adadada asdsa', 'asd', 'adadasd', 'cikeusi', '2025-09-21 15:55:52.000', '/assets/default/image-not-available.png', 'ads', 'published', '2025-09-21 15:56:16.000', '2025-09-21 15:56:18.000'),
(13, 2, 48, 'Rebo Wekasan: Tradisi Tolak Bala di Akhir Safar', 'rebo-wekasan-tradisi-tolak-bala-di-akhir-safar', '<p>Rebo Wekasan adalah tradisi keagamaan yang dilaksanakan setiap Rabu terakhir bulan Safar menurut kalender Hijriah, dan diwariskan turun-temurun oleh para sepuh. Masyarakat Rancakalong, khususnya di Dusun Pasir, meyakini tradisi ini sebagai ikhtiar spiritual untuk menolak marabahaya yang diyakini turun pada bulan Safar.</p><p><br></p><p>Prosesi dimulai setelah salat subuh berjamaah di masjid. Jamaah membaca surat Yasin sebanyak tujuh kali sebagai bentuk tawasul memohon perlindungan dari <em>sarebu balai</em> (seribu bala), lalu dilanjutkan dengan salat sunnah dhuha Safar dua rakaat yang dipimpin ustadz atau ajengan setempat.</p><p><br></p><p>Selain itu, masyarakat membawa air untuk didoakan serta menyiapkan makanan seperti nasi uduk, ikan teri, dan telur yang dibagikan dalam bentuk berkat. Sajian pelengkap berupa kopi pahit, kopi manis, dan susu juga dihadirkan. Semua ini dilakukan sebagai wujud syukur, sedekah, dan permohonan keselamatan.</p>', 'https://maps.app.goo.gl/AvS4KkrVKgYCWGGM9', '2025-09-13 13:57:00.000', '/uploads/acara/1758645839724-285867848.jpg', 'Kecamatan Rancakalong', 'published', '2025-09-23 06:57:54.731', '2025-09-23 16:43:59.725'),
(15, 2, 48, 'Pekan Wisata Budaya Geo Theater Rancakalong 2025', 'pekan-wisata-budaya-geo-theater-rancakalong-2025', '<p class=\"ql-align-justify\"><strong>Rancakalong, Sumedang</strong> – Gelaran istimewa bertajuk Pekan Wisata Budaya Geo Theater Rancakalong 2025 siap digelar sebagai transformasi dari kegiatan <em>Kemah Budaya</em> yang sebelumnya telah menjadi agenda rutin. Acara ini diprakarsai oleh Kelompok Tani Hutan (KTH) Benteng Muda Mandiri, sebuah komunitas berbasis budaya yang berkomitmen menjaga kelestarian alam sekaligus merawat tradisi leluhur.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Melalui program ini, masyarakat diajak untuk kembali dekat dengan kearifan lokal, menjelajahi kekayaan seni, serta menikmati keindahan alam Rancakalong yang menawan.</p><p class=\"ql-align-justify\"><strong>📅 Jadwal Acara</strong></p><ul><li class=\"ql-align-justify\">Pembukaan: 28 Oktober 2025</li><li class=\"ql-align-justify\">Penutupan: 2 November 2025</li><li class=\"ql-align-justify\">Lokasi: Kawasan Gedung Geo Theater Rancakalong, Kabupaten Sumedang, Jawa Barat</li></ul><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>✨ Rangkaian Kegiatan</strong></p><p class=\"ql-align-justify\"> Pekan wisata budaya ini akan dipenuhi dengan berbagai aktivitas seru dan edukatif, antara lain:</p><ul><li class=\"ql-align-justify\">Lomba-lomba berbasis seni dan budaya</li><li class=\"ql-align-justify\">Pertunjukan seni tradisional dan modern</li><li class=\"ql-align-justify\">Aneka kuliner khas Nusantara</li><li class=\"ql-align-justify\">Area <em>camping ground</em> untuk pengunjung</li><li class=\"ql-align-justify\">Partisipasi UMKM lokal dengan produk kreatif</li></ul><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><strong>🎉 Undangan Terbuka</strong></p><p class=\"ql-align-justify\"> Kami mengundang seluruh lapisan masyarakat – mulai dari tingkat lokal, regional, nasional, hingga internasional – untuk turut serta. Anda bisa hadir sebagai peserta lomba, penampil seni, pelaku UMKM, maupun pengunjung yang ingin sekadar menikmati suasana.</p>', 'https://maps.app.goo.gl/rgwXXQwvAVx2k4N87', '2025-09-28 11:45:00.000', '/uploads/acara/1758689230957-960326719.jpg', 'Kelompok Tani Hutan (KTH)', 'published', '2025-09-24 04:47:10.961', '2025-09-24 04:47:10.961');

-- --------------------------------------------------------

--
-- Struktur dari tabel `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `desa_id` int NOT NULL,
  `kategori_id` int NOT NULL,
  `sub_kategori_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `featured_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `waktu_kegiatan` datetime(3) NOT NULL,
  `lokasi_kegiatan` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('published','draft') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `articles`
--

INSERT INTO `articles` (`id`, `user_id`, `kecamatan_id`, `desa_id`, `kategori_id`, `sub_kategori_id`, `title`, `slug`, `content`, `featured_image`, `waktu_kegiatan`, `lokasi_kegiatan`, `status`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 2, 48, 7, 1, 7, 'Tol Cisumdawu Ruas Cimalaka–Dawuan di Sumedang Gratis Setelah Diresmikan Presiden Jokowi', 'tol-cisumdawu-ruas-cimalakadawuan-di-sumedang-gratis-setelah-diresmikan-presiden-jokowi', '<p class=\"ql-align-justify\"><strong>Sumedang</strong> – Presiden Republik Indonesia, Joko Widodo, meresmikan jalan Tol Cisumdawu pada Selasa (11/7/2023) di kawasan terowongan kembar Rancakalong, Kabupaten Sumedang.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Setelah peresmian, Tol Cisumdawu Seksi 4–6 yang menghubungkan Cimalaka–Dawuan dapat digunakan masyarakat secara gratis tanpa dipungut biaya selama 2–3 minggu, sesuai prosedur operasional standar (SOP).</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Menteri PUPR, Basuki Hadimuljono, menjelaskan pemberlakuan gratis pasca-peresmian merupakan ketentuan SOP. \"Setelah diresmikan, harus gratis 2–3 pekan, tapi nanti akan disesuaikan,\" ujarnya.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Sementara itu, Seksi 1–3 Tol Cisumdawu, yang menghubungkan Cileunyi–Cimalaka, telah diberlakukan tarif. Beberapa pengguna jalan menilai tarifnya mahal, namun Menteri Basuki menegaskan justru tarif Tol Cisumdawu relatif lebih murah, yaitu Rp12.500 per kilometer, karena sebagian biaya pembangunan ditopang oleh APBN, sehingga menekan biaya investasi.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Tol Cisumdawu diharapkan dapat meningkatkan konektivitas dan mendukung pertumbuhan ekonomi di wilayah Sumedang dan sekitarnya, termasuk mendukung operasional Bandara Kertajati yang akan beroperasi maksimal pada Oktober 2023.</p>', '/uploads/articles/1758694967576-187849848.jpg', '2023-07-11 12:48:00.000', 'Rancakalong, Sumendang', 'published', '1970-01-01 00:00:00.000', '2025-09-17 12:48:26.000', '2025-09-24 06:22:47.578'),
(2, 2, 48, 7, 1, 7, 'Warga Rancakalong Berpose di Jalan Mulus Setelah Perbaikan, Kasur di Aspal Jadi Spot Foto', 'warga-rancakalong-berpose-di-jalan-mulus-setelah-perbaikan-kasur-di-aspal-jadi-spot-foto', '<p class=\"ql-align-justify\"><strong>Sumedang</strong> – Kondisi ruas jalan Rancakalong–Sabagi di Desa Rancakalong dan Desa Pamekaran, Kecamatan Rancakalong, kini mulus setelah sebelumnya rusak parah. Warga pun memanfaatkan momen ini untuk berpose di jalan, bahkan menggelar kasur di atas aspal seolah baru bangun tidur.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Foto-foto warga yang berbaring di jalan mulus tersebut viral di media sosial, dibandingkan dengan kondisi sebelumnya ketika jalan berlubang dan penuh kubangan air saat hujan atau berdebu saat kemarau.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Kepala Desa Rancakalong, Wawan Suwandi, menyampaikan rasa terima kasih kepada Pemerintah Kabupaten Sumedang atas perbaikan jalan yang kini mendukung mobilitas dan perekonomian warga. “Dulu jalan rusak, sekarang kondisinya sudah bagus,” ujarnya.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Kepala Bidang Bina Marga Dinas Pekerjaan Umum dan Tata Ruang (PUTR) Kabupaten Sumedang, Deni S. Sugandhi, menjelaskan perbaikan ruas jalan ini dilakukan dalam dua tahun anggaran, 2022 dan 2023. Pada 2022, perbaikan dilakukan dari Sabagi, Desa Ciherang, Kecamatan Sumedang Selatan, hingga Desa Pamekaran, Kecamatan Rancakalong. Tahun 2023, perbaikan menyasar jalan rusak sepanjang 600 meter hingga pertigaan dekat Terminal Rancakalong.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Selain itu, ruas Jalan Cibungur–Pamarisen yang menghubungkan Rancakalong dengan Sumedang Utara juga diperbaiki. Secara keseluruhan, perbaikan jalan kabupaten sepanjang 774,368 kilometer terus dilakukan setiap tahun, sehingga di akhir 2023 kondisi jalan kabupaten dengan kategori mantap diperkirakan mencapai 87,96 persen.</p>', '/uploads/articles/1758694758763-737903774.jpg', '2023-12-14 12:50:00.000', 'Rancakalong, Sumendang', 'published', '1970-01-01 00:00:00.000', '2025-09-17 12:50:52.000', '2025-09-24 06:19:18.766'),
(3, 2, 48, 7, 1, 7, 'Jaringan Irigasi Jebol di Margamukti, Akses Jalan Sumedang-Rancakalong Terganggu', 'jaringan-irigasi-jebol-di-margamukti-akses-jalan-sumedang-rancakalong-terganggu', '<p class=\"ql-align-justify\"><strong>Sumedang</strong> – Sebuah jaringan irigasi di Desa Margamukti, Kecamatan Sumedang Utara, Kabupaten Sumedang, jebol akibat hujan deras pada Senin (5/2/2024) sore.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Kejadian ini menyebabkan akses jalan yang menghubungkan Kecamatan Sumedang Utara dengan Rancakalong terganggu, sehingga kendaraan tidak bisa melintas di jalur tersebut.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Pemdes Margamukti mengimbau warga yang hendak bepergian dari Sumedang menuju Rancakalong untuk menggunakan jalur alternatif melalui Padasuka.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Kepala Pelaksana BPBD Sumedang, Atang Sutarno, mengatakan bahwa petugas telah dikerahkan ke lokasi untuk melakukan pengecekan serta penanganan. Ia menambahkan, kondisi ini membuat jalur penghubung antar-kecamatan sementara tidak bisa dilewati kendaraan.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Petugas di lapangan terus memantau situasi dan berupaya memperbaiki kerusakan jaringan irigasi agar akses jalan kembali normal secepatnya.</p>', '/uploads/articles/1758694585312-192403263.jpg', '2024-02-05 12:51:00.000', 'Rancakalong, Sumendang', 'published', '1970-01-01 00:00:00.000', '2025-09-17 12:51:55.000', '2025-09-24 06:16:25.315'),
(4, 2, 48, 7, 8, 13, 'PENGUMUMAN : Hasil Akhir Seleksi PPPK Tenaga Guru Tahap II', 'pengumuman--hasil-akhir-seleksi-pppk-tenaga-guru-tahap-ii', '<p><strong>Hasil Akhir Seleksi PPPK Tenaga Guru Tahap II</strong></p><p>Lingkungan Pemerintah Daerah Kabupaten Sumedang</p><p>Tahun Anggaran 2024</p><p>Selamat kepada seluruh pelamar yang dinyatakan lulus! 👏</p><p><br></p><p><strong>Tahapan Selanjutnya:</strong></p><p>Melengkapi dokumen untuk <strong>usul penetapan Nomor Induk (NI) PPPK</strong>.</p><p>🗓️ <strong>Periode:</strong> 1 – 31 Juli 2025</p><p>📍 <strong>Lokasi Pengisian Dokumen:</strong> <a href=\"https://sscasn.bkn.go.id/\" rel=\"noopener noreferrer\" target=\"_blank\">https://sscasn.bkn.go.id/</a></p><p>Pastikan mengikuti jadwal yang telah ditetapkan agar proses penetapan berjalan lancar.</p><p><br></p><p>— <strong>BKPSDM Kabupaten Sumedang</strong></p>', '/assets/default/image-not-available.png', '2025-06-29 15:01:00.000', 'BKPSDM Kabupaten Sumedang', 'published', '1970-01-01 00:00:00.000', '2025-09-17 15:01:55.000', '2025-09-24 06:27:38.459'),
(5, 2, 48, 7, 1, 7, 'BPBD Sumedang: Tujuh Titik Longsor Terjadi di Rancakalong, Akses Jalan Terputus', 'bpbd-sumedang-tujuh-titik-longsor-terjadi-di-rancakalong-akses-jalan-terputus', '<p class=\"ql-align-justify\">Sumedang, TribunJabar.id – Badan Penanggulangan Bencana Daerah (BPBD) Kabupaten Sumedang mencatat tujuh lokasi longsor di Kecamatan Rancakalong, akibat hujan deras yang mengguyur wilayah tersebut pada Senin (5/2/2024) sore.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Insiden ini menyebabkan akses jalan penghubung Sumedang–Subang tertutup, terutama longsor besar yang terjadi di Desa Sukamaju. Kepala Seksi Pencegahan dan Kesiapsiagaan BPBD Sumedang, Adang, memastikan tidak ada korban jiwa dalam peristiwa tersebut. “Longsor memang mengganggu aktivitas warga, namun alhamdulillah tidak menelan korban jiwa,” ujarnya.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Hingga pukul 19.00 WIB, jalan provinsi yang menghubungkan Sumedang dengan Subang masih belum bisa dilalui kendaraan karena material longsor masih dalam proses penyingkiran oleh petugas gabungan.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">BPBD juga mengimbau masyarakat untuk menggunakan jalur alternatif. Dari Subang menuju Sumedang, kendaraan disarankan melewati wilayah Cisempak dan Tanjungmedar. Sementara dari arah Bandung, pengendara dapat melewati jalur Pamulihan, Sumedang. Petugas terus bekerja untuk membersihkan material longsor agar akses jalan kembali normal.</p>', '/uploads/articles/1758694380246-945580687.jpg', '2024-02-05 19:50:00.000', 'Rancakalong, Sumendang', 'published', '1970-01-01 00:00:00.000', '2025-09-17 19:51:14.000', '2025-09-24 06:13:00.248'),
(7, 2, 48, 7, 6, 9, 'Koromong Sumedang: Gamelan Warisan Raja untuk Menyuburkan Sawah', 'koromong-sumedang-gamelan-warisan-raja-untuk-menyuburkan-sawah', '<p class=\"ql-align-justify\">Di Sumedang, ada kesenian tradisional bernama Koromong yang meski kurang dikenal, memiliki sejarah penting. Kesenian ini terbatas di Rancakalong dan Darmaraja, dan berfungsi berbeda di masing-masing wilayah.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Koromong adalah gamelan warisan raja-raja Sumedang, dibawa dari Prabu Aji Putih, raja pertama Keraton Sumedang Larang. Alat musik ini hanya boleh dimainkan oleh keturunan raja dan dipercaya memiliki kekuatan spiritual.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Di Rancakalong, Koromong diperkenalkan Eyang Santing setelah melakukan pertapaan 40 hari 40 malam untuk menyelamatkan pertanian dari paceklik. Ia belajar memainkan gamelan ini dan menabuhnya dengan harapan sawah kembali subur. Tradisi itu masih dipertahankan hingga sekarang, terutama saat musim tanam.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Sementara di Darmaraja, Koromong berfungsi sebagai musik penyambut tamu penting, mengingat wilayah ini dulunya ibu kota kerajaan. Sebelum dimainkan, gamelan selalu dimandikan untuk menyucikannya agar membawa keberkahan bagi yang hadir.</p>', '/uploads/articles/1758693820154-45579095.jpg', '2025-09-24 00:03:00.000', 'https://maps.app.goo.gl/WwDND8kv63riH1w96', 'published', '1970-01-01 00:00:00.000', '2025-09-18 00:03:44.000', '2025-09-24 06:03:40.157'),
(8, 2, 48, 10, 2, 2, 'Villa Kalangenandi Rancakalong: Destinasi Liburan Tenang di Tengah Alam', 'villa-kalangenandi-rancakalong-destinasi-liburan-tenang-di-tengah-alam', '<p class=\"ql-align-justify\">Terletak di kawasan Rancakalong yang asri, Villa Kalangenandi menawarkan pengalaman liburan yang damai dan jauh dari hiruk-pikuk kota. Dengan pemandangan alam yang menawan, villa ini menjadi pilihan tepat bagi keluarga, pasangan, atau kelompok yang ingin menikmati suasana pedesaan yang sejuk.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Setiap unit villa dilengkapi dengan fasilitas modern, mulai dari kamar tidur nyaman, ruang tamu yang luas, hingga area dapur lengkap. Tersedia juga taman dan gazebo untuk bersantai atau mengadakan acara kecil di tengah suasana alam.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Keunggulan lain dari Villa Kalangenandi adalah lokasinya yang strategis. Hanya beberapa menit dari pusat Rancakalong, pengunjung dapat dengan mudah mengakses pasar lokal, restoran, dan berbagai objek wisata sekitar. Aktivitas seperti trekking, bersepeda, atau sekadar menikmati matahari terbenam dapat dilakukan langsung dari area villa.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Dengan pelayanan ramah dan suasana yang menenangkan, Villa Kalangenandi Rancakalong menjadi pilihan sempurna bagi siapa pun yang mencari kombinasi kenyamanan modern dan keindahan alam.</p>', '/uploads/articles/1758693635631-841085941.png', '2025-09-24 17:04:00.000', 'https://maps.app.goo.gl/J1wC9C7QPdA9Hss29', 'published', '1970-01-01 00:00:00.000', '2025-09-18 00:03:51.000', '2025-09-24 06:00:35.639'),
(9, 2, 48, 7, 5, 4, 'Pemuda Tani Putra Mandiri Rancakalong Sukses Kembangkan Usaha Kerajinan Bambu', 'pemuda-tani-putra-mandiri-rancakalong-sukses-kembangkan-usaha-kerajinan-bambu', '<p class=\"ql-align-justify\"><strong>Rancakalong, Sumedang</strong> – Kreativitas pemuda desa kembali membuahkan hasil positif. Kelompok Pemuda Tani Putra Mandiri Rancakalong berhasil mengembangkan usaha kerajinan bambu yang kini menjadi salah satu ikon baru di wilayah Rancakalong.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Dengan memanfaatkan potensi alam berupa bambu yang melimpah, para pemuda ini mengolahnya menjadi berbagai produk bernilai jual tinggi, seperti anyaman, perabot rumah tangga, hingga produk dekorasi yang diminati pasar lokal maupun luar daerah.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Ketua kelompok, menuturkan bahwa usaha ini berawal dari keinginan pemuda desa untuk memanfaatkan sumber daya alam sekitar serta membuka lapangan pekerjaan. “Kami melihat bambu di Rancakalong sangat melimpah, sayang kalau hanya dipakai untuk kebutuhan tradisional. Maka kami berinisiatif mengolahnya menjadi produk yang lebih modern dan bernilai ekonomi,” ujarnya.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Selain meningkatkan keterampilan anggota, usaha kerajinan bambu ini juga berdampak positif pada perekonomian warga sekitar. Beberapa masyarakat mulai ikut serta dalam proses produksi, seperti pemotongan, pengeringan, hingga finishing produk.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Produk-produk kerajinan bambu dari Rancakalong kini mulai dipasarkan secara lebih luas, baik melalui pameran UMKM, pesanan dari komunitas, hingga pemasaran digital. Bahkan, sejumlah produk sudah menembus pasar luar daerah karena kualitas dan desainnya yang unik.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Dengan adanya inovasi ini, Pemuda Tani Putra Mandiri Rancakalong tidak hanya berhasil mengangkat potensi lokal, tetapi juga membuktikan bahwa kreativitas pemuda desa mampu menjadi motor penggerak pembangunan ekonomi berbasis kearifan lokal.</p>', '/uploads/articles/1758686934666-389745516.jpg', '2025-09-24 00:05:00.000', 'https://maps.app.goo.gl/WwDND8kv63riH1w96', 'published', '1970-01-01 00:00:00.000', '2025-09-18 00:05:17.000', '2025-09-24 04:08:54.683'),
(10, 2, 48, 7, 4, 11, 'Situ Lembang di Rancakalong: Pesona Alam dengan Sumber Mata Air Alami', 'situ-lembang-di-rancakalong-pesona-alam-dengan-sumber-mata-air-alami', '<p class=\"ql-align-justify\">Situ Lembang merupakan salah satu destinasi wisata alam yang terletak di Kecamatan Rancakalong, Sumedang. Keindahannya berpadu dengan keasrian hutan pinus yang tumbuh tinggi mengelilingi kawasan situ. Dengan luas sekitar setengah hektar, situ ini memiliki daya tarik tersendiri karena sumber mata airnya berasal langsung dari alam dengan debit air yang cukup deras. Aliran air dari Situ Lembang mengalir menuju Sungai Ciherang yang berada di hilir.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Secara lokasi, Situ Lembang terletak di jalur yang menghubungkan Desa Cijambu dengan Desa Rancakalong. Jika ditempuh dari arah Cijambu menuju Rancakalong, posisi situ berada di sebelah kiri jalan. Jaraknya pun cukup dekat dari pusat Kecamatan Tanjungsari atau Alun-alun Tanjungsari, yakni sekitar 12 kilometer ke arah utara.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Akses menuju Situ Lembang terbilang mudah karena dapat dijangkau dengan kendaraan roda dua maupun roda empat. Fasilitas yang tersedia di area ini cukup memadai, mulai dari tempat parkir untuk mobil dan motor, mushola, toilet, hingga warung-warung makanan. Pengunjung dapat menikmati berbagai sajian khas seperti ketan bakar, gorengan, mie rebus, kopi, bajigur, bandrek, hingga makanan tradisional Sunda seperti rujak coel, lotek, dan karedok.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Dengan pesonanya yang alami dan fasilitas yang ramah bagi pengunjung, Situ Lembang menjadi salah satu tempat yang cocok untuk melepas penat sekaligus menikmati ketenangan alam khas Rancakalong.</p>', '/uploads/articles/1758686697974-70940989.jpg', '2025-09-24 00:07:00.000', 'https://maps.app.goo.gl/WwDND8kv63riH1w96', 'published', '1970-01-01 00:00:00.000', '2025-09-18 00:07:14.000', '2025-09-24 04:04:57.977'),
(11, 2, 48, 4, 4, 12, 'GeoTheater Rancakalong: Panggung Budaya dan Panorama Alam di Jantung Sumedang', 'geotheater-rancakalong-panggung-budaya-dan-panorama-alam-di-jantung-sumedang', '<p>Di Desa Sukamaju, Kecamatan Rancakalong, Kabupaten Sumedang, berdiri sebuah destinasi wisata yang mulai menarik perhatian sebagai pusat kebudayaan modern dengan sentuhan alam: GeoTheater Rancakalong. Tempat ini tidak hanya sekadar bangunan pertunjukan, tetapi juga ruang interaksi antara seni, budaya, masyarakat lokal, dan lingkungan alam.</p><p><br></p><h3><strong>Sejarah dan Pembangunan</strong></h3><p>GeoTheater sempat mengalami kerusakan parah akibat diterjang angin puting beliung pada tahun 2020, termasuk atap yang ambruk. Setelah renovasi dan penataan ulang, gedung ini kembali diperkenalkan kepada publik sebagai pusat panggung seni dan budaya.</p><p><br></p><p>Arsitekturnya dirancang dengan estetika yang melakukan dialog dengan alam sekitar—memanfaatkan kontur bukit, panorama hijau perkebunan, dan pemandangan lanskap Sumedang yang dapat dilihat dari tinggi area GeoTheater. Desain bangunan ini juga menjadi simbol ambisi menjadikan GeoTheater sebagai pusat budaya Sunda di Kabupaten Sumedang. </p><p><br></p><h3><strong>Fungsi &amp; Aktivitas</strong></h3><p>GeoTheater bukan sekadar panggung biasa. Di tempat ini, pengunjung bisa menikmati ragam aktivitas:</p><ul><li>Menyaksikan pertunjukan seni dan budaya Sunda (tarawangsa, kuda renggong, musik tradisional) di panggung terbuka atau amphitheater kecil.</li><li>Spot foto dan area “selfie” yang dibuat sedemikian rupa agar pengunjung mendapatkan latar panorama alam dan bangunan arsitektural unik. </li><li>Fasilitas UMKM dan kios hasil pertanian lokal: pengunjung dapat membeli hasil kebun segar langsung dari petani sekitar. </li><li>Kemitraan dengan instansi kebudayaan, seperti dengan ISBI Bandung, untuk menghidupkan kembali aktivitas seni dan menjadikan GeoTheater sebagai pusat edukasi dan pertunjukan budaya rutin.</li></ul><p><br></p><h3><strong>Keunggulan Alam &amp; Lokasi</strong></h3><p>Letaknya di ketinggian dengan udara sejuk serta pemandangan sawah dan perkebunan di sekelilingnya menjadikan GeoTheater sebagai destinasi wisata alam yang menenangkan. Dari lokasi GeoTheater, pengunjung dapat melihat panorama kota Sumedang dari kejauhan, terutama saat suasana senja atau malam hari.Akses ke tempat ini relatif mudah; hanya sekitar 15–20 menit dari pintu tol Pamulihan, yang menjadikannya cukup strategis untuk wisatawan dari luar daerah. </p><p><br></p><h3><strong>Status &amp; Kategori Wisata</strong></h3><p>Berdasarkan klasifikasi dari berbagai sumber:</p><ul><li>GeoTheater dicantumkan dalam wisata budaya &amp; edukasi karena menampilkan seni Sunda dan menjadi ruang pembelajaran budaya. </li><li>Juga termasuk wisata alam karena integrasi lanskap alam, panorama hijau, dan suasana udara sejuk sebagai bagian dari pengalaman wisata. </li><li>Dalam sistem Desa Wisata (Jadesta), GeoTheater Rancakalong dikategorikan sebagai desa wisata rintisan.</li></ul><p>Jadi, GeoTheater secara fungsional bisa dikategorikan sebagai wisata budaya + alam (hybrid cultural-nature tourism), serta bagian dari pengembangan wisata desa.</p>', '/uploads/articles/1758685121026-693421021.jpg', '2025-06-18 00:07:00.000', 'https://maps.app.goo.gl/XkD2pbdT3n5v4zuP7', 'published', '1970-01-01 00:00:00.000', '2025-09-18 00:07:38.000', '2025-09-24 03:38:41.029'),
(13, 2, 48, 7, 6, 9, 'TARAWANGSA - Seni Buhun Rengkong di Rancakalong: Harmoni Tradisi, Irama, dan Panen', 'tarawangsa---seni-buhun-rengkong-di-rancakalong-harmoni-tradisi-irama-dan-panen', '<p class=\"ql-align-justify\"><strong>Rancakalong - </strong>Seni Buhun Rengkong merupakan salah satu kekayaan budaya tradisional yang hingga kini masih lestari di daerah Rancakalong, Kabupaten Sumedang. Rengkong bukan sekadar seni pertunjukan, melainkan bagian dari ritual adat yang sarat makna dan nilai kebersamaan.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Rengkong ditampilkan melalui tarian unik para penghantar gandar, yaitu alat pikul tradisional yang digunakan untuk membawa padi. Pada saat upacara, gandar yang dipikul menghasilkan bunyi khas dari lubang-lubang yang terdapat di dalamnya. Irama tersebut berpadu dengan langkah-langkah para penari, menciptakan harmoni antara musik alami dan gerakan tubuh. Suara rengkong inilah yang menjadi ciri khas dan daya tarik utama dari seni buhun ini.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Biasanya, seni Rengkong digelar dalam upacara adat mapag ibu atau menjemput kersa nyai, sebuah prosesi budaya yang melambangkan rasa syukur atas hasil panen padi. Tradisi ini diyakini sudah ada sejak akhir masa Kerajaan Pajajaran pada abad ke-16, menjadikannya sebagai warisan budaya leluhur yang penuh nilai sejarah dan spiritual.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Lebih dari sekadar hiburan, Rengkong memiliki filosofi mendalam: sebuah simbol kebersamaan masyarakat agraris, penghormatan terhadap Dewi Padi, serta ungkapan rasa syukur atas berkah alam. Di tengah arus modernisasi, keberlangsungan Seni Buhun Rengkong menjadi cermin kuatnya masyarakat Rancakalong dalam menjaga identitas budaya sekaligus memperkenalkannya kepada generasi penerus.</p>', '/uploads/articles/1758686118262-157912539.jpg', '2025-09-24 00:52:00.000', 'https://maps.app.goo.gl/WwDND8kv63riH1w96', 'published', '1970-01-01 00:00:00.000', '2025-09-21 07:52:46.901', '2025-09-24 03:55:18.266'),
(15, 2, 48, 7, 6, 15, 'Tarawangsa Rancakalong Diusulkan ke Unesco sebagai Seni Budaya Sumedang', 'tarawangsa-rancakalong-diusulkan-ke-unesco-sebagai-seni-budaya-sumedang', '<p class=\"ql-align-justify\"><strong>RANCAKALONG -&nbsp;</strong>Seni Tarawangsa Rancakalong sedang diajukan ke Unesco sebagai seni budaya Sumedang. Pengajuan Tarwangsa ke Unesco ini sebagai upaya menduniakan seni asal Rancakalong ke dunia. Pengajuan ke Unesco itu sedang diproses Balai Pelestari Nilai Budaya Provinsi Jabar</p><p class=\"ql-align-justify\">Ketua K3S Balai Pelestarian Nilai Budaya Provinsi Jabar Agus Mulyana&nbsp;mengatakan pihaknya kini sedang melanjutkan ke UNESCO untuk mempatenkan seni Tarawangsa sebagai seni budaya Sumedang, seperti tarian Saman Aceh yang saat ini sudah terlebih dahulu di akui oleh dunia.&nbsp;Benda dan Cagar budaya merupakan satu paket budaya warisan indonesia yang harus di jaga. Salah satunya budaya tarian tarawangsa adalah Cagar budaya yang terlahir dari Rancakalong yang harus dijaga dan dilestarikan.&nbsp;“Kami bersama UPT Kemendikbud Provinsi Jabar sedang melanjutkan ke UNESCO, untuk mempatenkan budaya tarwangsa sebagai seni budaya Sumedang, seperti tarian aceh yang sudah di akui dunia”, ujar Agus saat Sosialisasi Sawala Budaya Tarawangsa yang diinisiasi Balai Pelestarian Nilai Budaya Provinsi Jawa Barat di Desa wisata Kecamatan Rancakalong, Rabu, (16/2/2022)..</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Wakil Bupati Sumedang Erwan Setiawan akan mewajibkan setiap sekolah baik di tingkat SD maupun tingkat SMP di Kabupaten Sumedang melaksanakan ekstrakurikuler seni Tarawangsa.&nbsp;\"Seni Tarawangsa ini wajib menjadi ekstrakurikuler di tiap sekolah baik itu SD dan SMP agar lebih membudaya, sehingga bisa terkenal di tingkat nasional dan tentunya ke go Internasional,” ujarnya.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Wabup Erwan menyebutkan, Seni budaya Tarawangsa&nbsp;dari Rancakalong ini&nbsp;menjadi&nbsp;&nbsp;salah satu kekayaan seni dan budaya&nbsp;milik masyarakat Sumedang.&nbsp;Sebagai warisan para leluhur yang sudah ada sejak berabad abad lalu, kata Wabup, Tarawangsa ini mesti terus dilestarikan&nbsp;dan dikembangkan sampai ke generasi selanjutnya supaya tidak punah. \"Kita selaku orang sunda, orang Sumedang harus melestarikan sdan mengembangkan seni ini supaya tidak punah. Anak-anak kita nanti jangan sampai tidak tahu apa itu seni Tarawangsa. Kalau bukan kita siapa lagi,\" katanya.</p><p><br></p>', '/uploads/articles/1758685884041-124369424.jpg', '2022-02-17 15:11:00.000', 'https://maps.app.goo.gl/WwDND8kv63riH1w96', 'published', '1970-01-01 00:00:00.000', '2025-09-21 15:12:01.133', '2025-09-24 03:51:24.044'),
(16, 2, 48, 7, 3, 6, 'Sampeu Wedang, Hangatnya Tradisi Kuliner Rancakalong Sumedang', 'sampeu-wedang-hangatnya-tradisi-kuliner-rancakalong-sumedang', '<p>Rancakalong di Kabupaten Sumedang tak hanya dikenal dengan alamnya yang asri, tetapi juga memiliki kuliner khas yang unik, yakni Sampeu Wedang. Hidangan sederhana ini terbuat dari singkong rebus yang disajikan bersama kuah gula merah dan jahe hangat.</p><p><br></p><p>Rasanya manis, gurih, dan sedikit pedas dari rempah jahe, menjadikan Sampeu Wedang cocok dinikmati saat sore atau malam hari. Di balik kesederhanaannya, makanan ini mencerminkan kearifan lokal masyarakat Rancakalong dalam memanfaatkan hasil bumi.</p><p><br></p><p>Bagi para penikmat kuliner tradisional, Sampeu Wedang bukan sekadar makanan, melainkan pengalaman budaya yang menghangatkan tubuh sekaligus hati.</p>', '/uploads/articles/1758685674217-331020828.jpg', '2025-09-24 15:12:00.000', 'https://maps.app.goo.gl/3YRGG1FzWT4FHmf68', 'published', '1970-01-01 00:00:00.000', '2025-09-21 15:12:58.852', '2025-09-24 03:47:54.220'),
(19, 2, 48, 5, 3, 6, 'Pizza Tungku dari Dapur Ambu: Keunikan Rasa & Suasana Asri di Rancakalong Sumedang', 'pizza-tungku-dari-dapur-ambu-keunikan-rasa--suasana-asri-di-rancakalong-sumedang', '<p>Di tengah keheningan perdesaan Rancakalong, Sumedang, terdapat sebuah tempat kuliner yang berhasil mencuri perhatian para penikmat makanan kekinian: Pizza Ala Ambu. Berlokasi di Dusun Cisoka, Desa Sukamaju, Kecamatan Rancakalong, pizza ala Ambu ini menggabungkan cita rasa modern dengan suasana alam yang hening dan menenangkan. </p><p><br></p><h4><strong>Asal-usul dan Filosofi</strong></h4><p>‘Ambu’ sendiri dalam bahasa Sunda bisa bermakna “ibu” — menunjukkan kehangatan, keaslian, dan suasana kekeluargaan. Pizza di sini disajikan dengan metode tungku, sehingga menghasilkan aroma khas panggangan yang menggoda selera. </p><p><br></p><h4><strong>Menu Andalan &amp; Ciri Khas Rasa</strong></h4><ul><li>Pizza-tungku adalah menu primadona yang sering disebut dalam ulasan pengunjung. </li><li>Keunikan rasa pizza ini tampaknya terletak pada perpaduan adonan panggangan langsung, saus khas dari “dapur Ambu”, dan topping yang diolah secara lokal. </li><li>Beberapa pengunjung menyebutkan bahwa cita rasa pizza ini “langsung ke hati”—menyiratkan pengalaman yang personal dan memikat indera pengecap.</li></ul><p><br></p><h4><strong>Suasana &amp; Pengalaman</strong></h4><p>Salah satu daya tarik utama Pizza Ala Ambu adalah ambiance-nya: udara desa, atmosfer alami, dan pemandangan yang bisa dinikmati sambil menyantap pizza. Beberapa pengunjung menyoroti bahwa tempat ini cocok untuk acara santai bersama keluarga atau sahabat karena menggabungkan kuliner dan relaksasi. </p><p><br></p><h4><strong>Tips untuk Pengunjung</strong></h4><ol><li>Cek jam operasional / jadwal buka, terutama karena lokasi cenderung di pedesaan (info terkini bisa dicek melalui Instagram Pizza Ala Ambu).</li><li>Datang lebih awal agar bisa menikmati suasana senja atau saat sore menjelang malam — biasanya momen ini paling pas untuk mengambil foto dan merasakan suasana.</li><li>Persiapkan perjalanan — lokasi di Dusun Cisoka bisa memerlukan akses melewati jalan desa, jadi kendaraan ringan atau motor mungkin lebih praktis.</li><li>Pesan lebih dahulu (jika memungkinkan) agar stok pizza tidak habis, terutama saat akhir pekan atau hari ramai.</li></ol><p><br></p><h4><strong>Kesimpulan</strong></h4><p>Pizza Ala Ambu di Rancakalong bukan sekadar menyajikan pizza. Ia hadir sebagai pengalaman — perpaduan rasa panggangan khas, suasana alam perdesaan, dan sentuhan lokal yang hangat. Bagi Anda yang menginginkan kuliner berbeda dari yang mainstream dan punya jiwa “petualang rasa”, tempat ini layak menjadi tujuan kuliner baru di Sumedang.</p>', '/uploads/articles/1758684469869-469346765.jpg', '2025-09-24 20:15:00.000', 'https://maps.app.goo.gl/GimYpesXvgm4EHud9', 'published', '1970-01-01 00:00:00.000', '2025-09-22 10:16:11.807', '2025-09-24 03:27:49.882'),
(20, 2, 48, 10, 3, 6, 'RM Batu Alam Ciherang & Pemancingan', 'rm-batu-alam-ciherang--pemancingan', '<p>Di Rancakalong, Sumedang, terdapat sebuah tempat yang memadukan kuliner khas Sunda dengan suasana alam yang menenangkan, yaitu RM Batu Alam Ciherang &amp; Pemancingan.</p><p><br></p><p>Restoran ini menyajikan aneka hidangan tradisional Sunda dengan cita rasa autentik. Sajian seperti ikan bakar, pepes, hingga sayur segar menjadi favorit pengunjung. Keistimewaannya bukan hanya pada rasa, tetapi juga suasana makan yang dikelilingi pepohonan rindang dan udara sejuk khas perdesaan.</p><p><br></p><p>Selain kuliner, tempat ini dilengkapi fasilitas pemancingan, sehingga pengunjung bisa merasakan pengalaman berbeda: menikmati hidangan sekaligus memancing ikan segar. Kombinasi ini menjadikan RM Batu Alam Ciherang &amp; Pemancingan pilihan tepat untuk keluarga maupun rombongan yang ingin bersantai sekaligus berwisata kuliner di Rancakalong.</p>', '/uploads/articles/1758685477992-75835687.jpg', '2025-09-16 02:38:00.000', 'https://maps.app.goo.gl/HMf6aqMrJiXW8nqC8', 'published', '1970-01-01 00:00:00.000', '2025-09-22 16:38:45.003', '2025-09-24 03:44:37.994'),
(21, 2, 48, 2, 2, 2, 'Vila Deris di Rancakalong: Pesona Penginapan Nyaman di Tengah Alam', 'vila-deris-di-rancakalong-pesona-penginapan-nyaman-di-tengah-alam', '<p class=\"ql-align-justify\"><strong>Rancakalong, Sumedang</strong> – Bagi Anda yang mencari tempat singgah dengan suasana tenang, asri, dan penuh kehangatan khas pedesaan Sunda, <strong>Vila Deris</strong> bisa menjadi pilihan tepat. Terletak di kawasan Rancakalong yang terkenal dengan keindahan alam dan tradisi budayanya, vila ini menawarkan pengalaman menginap yang berbeda dari penginapan modern di perkotaan.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Dengan desain bangunan bernuansa alami serta dikelilingi oleh pepohonan hijau, Vila Deris menghadirkan suasana yang menenangkan. Cocok untuk keluarga, rombongan wisata, maupun pasangan yang ingin melepas penat dari hiruk pikuk kota.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Selain fasilitas yang nyaman, Vila Deris juga dekat dengan berbagai destinasi wisata Rancakalong, seperti situs budaya, curug alami, dan area pertanian yang masih terjaga keasliannya. Pengunjung bisa merasakan udara segar khas pegunungan serta menjelajahi kekayaan budaya Sunda yang lekat di masyarakat sekitar.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Tak hanya sebagai tempat beristirahat, Vila Deris juga sering dijadikan lokasi acara keluarga, arisan, hingga gathering komunitas. Dengan pelayanan ramah dan suasana yang homy, pengunjung akan merasa seperti berada di rumah sendiri.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">🌿 <strong>Vila Deris di Rancakalong</strong> bukan sekadar penginapan, melainkan tempat untuk merasakan ketenangan, kedekatan dengan alam, dan kehangatan budaya lokal.</p>', '/uploads/articles/1758687236525-152392189.jpg', '2025-09-24 11:12:00.000', 'https://maps.app.goo.gl/5UgYi1yabvUGNQmB7', 'published', '1970-01-01 00:00:00.000', '2025-09-24 04:13:56.527', '2025-09-24 04:13:56.527'),
(22, 2, 48, 1, 2, 2, 'Villa Kamayang di Rancakalong: Pesona Alam, Kenyamanan, dan Keasrian Pedesaan', 'villa-kamayang-di-rancakalong-pesona-alam-kenyamanan-dan-keasrian-pedesaan', '<p class=\"ql-align-justify\"><strong>Rancakalong, Sumedang</strong> – Di tengah hamparan hijau persawahan dan kesejukan udara khas perdesaan, <em>Villa Kamayang</em> hadir sebagai destinasi wisata sekaligus tempat singgah yang memadukan kenyamanan modern dengan nuansa alami pedesaan. Berlokasi di Kecamatan Rancakalong, Sumedang, villa ini menjadi pilihan tepat bagi wisatawan yang mencari ketenangan sekaligus pengalaman berdekatan dengan alam.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Dengan desain arsitektur yang sederhana namun elegan, Villa Kamayang menawarkan pemandangan lanskap pegunungan dan persawahan yang menyejukkan mata. Setiap sudutnya didesain untuk memberi rasa nyaman, mulai dari ruang kamar yang luas, area berkumpul keluarga, hingga halaman terbuka yang bisa digunakan untuk acara bersama.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Selain sebagai tempat menginap, Villa Kamayang juga kerap dijadikan lokasi untuk kegiatan keluarga, pertemuan komunitas, hingga acara khusus seperti <em>gathering</em> atau <em>private event</em>. Letaknya yang tidak terlalu jauh dari pusat Kecamatan Rancakalong membuatnya mudah diakses, namun tetap menawarkan suasana tenang jauh dari hiruk pikuk kota.</p>', '/uploads/articles/1758687409569-826047372.png', '2025-09-24 11:15:00.000', 'https://maps.app.goo.gl/xEGy1YrGgZZW8MtTA', 'published', '1970-01-01 00:00:00.000', '2025-09-24 04:16:49.571', '2025-09-24 04:16:49.571'),
(23, 2, 48, 10, 4, 12, 'Menikmati Keindahan Alam Panenjoan Pasir Biru di Rancakalong', 'menikmati-keindahan-alam-panenjoan-pasir-biru-di-rancakalong', '<p class=\"ql-align-justify\">Rancakalong, sebuah kecamatan di Kabupaten Sumedang, kini memiliki destinasi wisata alam yang mulai ramai diperbincangkan, yaitu Panenjoan Pasir Biru. Tempat ini menawarkan pemandangan alam yang memikat dengan hamparan pasir berwarna biru yang unik, dikelilingi oleh pepohonan hijau yang asri.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Panenjoan Pasir Biru menjadi favorit bagi pengunjung yang ingin berlibur sambil menikmati suasana tenang jauh dari hiruk-pikuk kota. Keindahan pasir biru yang langka menjadi spot foto yang Instagramable, sehingga tak heran jika banyak wisatawan, terutama generasi muda, rela menempuh perjalanan jauh untuk datang ke sini.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Selain menikmati keindahan alam, pengunjung juga bisa melakukan berbagai aktivitas, seperti berjalan santai menyusuri tepi pasir, piknik bersama keluarga, atau sekadar bersantai sambil menikmati suara alam. Bagi pecinta fotografi, pemandangan di Panenjoan Pasir Biru sangat ideal untuk mengambil gambar landscape atau foto pre-wedding yang menawan.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\">Pengelola wisata setempat juga terus berupaya menjaga kebersihan dan kelestarian alam agar pengalaman berwisata tetap nyaman dan aman bagi semua pengunjung. Dengan akses yang semakin mudah dan fasilitas yang memadai, Panenjoan Pasir Biru Rancakalong semakin menjadi destinasi wajib bagi siapa saja yang ingin menikmati keindahan alam unik di Bandung Barat.</p>', '/uploads/articles/1758694103783-310290167.JPG', '2025-09-24 11:23:00.000', 'https://maps.app.goo.gl/uP4rejD6bwsCihLPA', 'published', '1970-01-01 00:00:00.000', '2025-09-24 04:23:58.784', '2025-09-24 06:08:23.786');

-- --------------------------------------------------------

--
-- Struktur dari tabel `desa`
--

CREATE TABLE `desa` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `nama_desa` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `desa`
--

INSERT INTO `desa` (`id`, `kecamatan_id`, `nama_desa`, `created_at`, `updated_at`) VALUES
(1, 48, 'NAGARAWANGI', '2025-09-17 05:35:55.344', '2025-09-17 05:35:55.344'),
(2, 48, 'CIBUNAR', '2025-09-17 05:35:55.357', '2025-09-17 05:35:55.357'),
(3, 48, 'PANGADEGAN', '2025-09-17 05:35:55.361', '2025-09-17 05:35:55.361'),
(4, 48, 'SUKAHAYU', '2025-09-17 05:35:55.364', '2025-09-17 05:35:55.364'),
(5, 48, 'SUKAMAJU', '2025-09-17 05:35:55.369', '2025-09-17 05:35:55.369'),
(6, 48, 'PAMEKARAN', '2025-09-17 05:35:55.372', '2025-09-17 05:35:55.372'),
(7, 48, 'RANCAKALONG', '2025-09-17 05:35:55.375', '2025-09-17 05:35:55.375'),
(8, 48, 'SUKASIRNARASA', '2025-09-17 05:35:55.379', '2025-09-17 05:35:55.379'),
(9, 48, 'CIBUNGUR', '2025-09-17 05:35:55.382', '2025-09-17 05:35:55.382'),
(10, 48, 'PASIRBIRU', '2025-09-17 05:35:55.386', '2025-09-17 05:35:55.386');

-- --------------------------------------------------------

--
-- Struktur dari tabel `front_image`
--

CREATE TABLE `front_image` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lokasi` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `front_image`
--

INSERT INTO `front_image` (`id`, `kecamatan_id`, `title`, `lokasi`, `gambar_path`, `created_at`, `updated_at`) VALUES
(1, 49, 'Reak', 'Rancakalong Sumendang', '/assets/uploads/foto-unggulan/1758481076521-21037713.jpg', '2025-09-21 18:23:08.098', '2025-09-22 09:08:27.620'),
(3, 48, 'Sumedang Tempo Doeloe', 'Sumendang', '/uploads/foto-unggulan/1758643068292-824200874.png', '2025-09-22 07:50:17.964', '2025-09-23 15:57:48.295'),
(4, 48, 'Ngalaksa', 'Rancakalong, Sumedang', '/uploads/foto-unggulan/1758643134014-697187363.jpg', '2025-09-23 15:58:54.017', '2025-09-23 15:58:54.017'),
(5, 48, 'Geo Teater', 'Rancakalong, Sumedang', '/uploads/foto-unggulan/1758643193472-753261998.jpg', '2025-09-23 15:59:53.474', '2025-09-23 15:59:53.474');

-- --------------------------------------------------------

--
-- Struktur dari tabel `infografis`
--

CREATE TABLE `infografis` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gambar_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `infografis`
--

INSERT INTO `infografis` (`id`, `kecamatan_id`, `title`, `gambar_path`, `created_at`, `updated_at`) VALUES
(2, 48, 'bbbbbb', '/assets/default/image-not-available.png', '2025-09-19 19:35:22.000', '2025-09-19 19:35:23.000'),
(5, 48, 'Gerakan 3M: Menguras, Mengubur, Menanam', '/uploads/infografis/1758648976116-838477109.jpg', '2025-09-19 19:35:59.000', '2025-09-23 17:36:16.121'),
(6, 48, 'JAGA DATA BIOMETRIK', '/uploads/infografis/1758648879327-658536289.jpg', '2025-09-19 19:36:11.000', '2025-09-23 17:34:39.330'),
(7, 48, 'Urus KTP Rusak? Pake Tahu Sumedang!', '/uploads/infografis/1758648702183-714638802.jpg', '2025-09-19 19:39:14.000', '2025-09-23 17:31:42.185'),
(8, 48, 'Hak Permohonan Informasi Publik', '/uploads/infografis/1758648667176-850293121.jpg', '2025-09-21 10:03:01.524', '2025-09-23 17:31:07.181'),
(9, 49, 'adsdasd dsads', '/assets/default/image-not-available.png', '2025-09-22 10:45:54.473', '2025-09-22 10:47:15.757');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori_article`
--

CREATE TABLE `kategori_article` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `nama` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `kategori_article`
--

INSERT INTO `kategori_article` (`id`, `kecamatan_id`, `nama`, `created_at`, `updated_at`) VALUES
(1, 48, 'Berita', '2025-09-17 05:40:46.916', '2025-09-17 05:40:46.916'),
(2, 48, 'Akomodasi', '2025-09-17 05:40:46.927', '2025-09-17 05:40:46.927'),
(3, 48, 'Kuliner', '2025-09-17 05:40:46.930', '2025-09-17 05:40:46.930'),
(4, 48, 'Wisata', '2025-09-17 05:40:46.933', '2025-09-17 05:40:46.933'),
(5, 48, 'Ekraf', '2025-09-17 05:40:46.936', '2025-09-17 05:40:46.936'),
(6, 48, 'Seni Budaya', '2025-09-17 05:40:46.939', '2025-09-17 05:40:46.939'),
(8, 48, 'Pengumuman', '2025-09-17 14:59:40.000', '2025-09-17 14:59:41.000'),
(11, 48, 'Organisasi', '2025-09-22 05:45:58.039', '2025-09-22 05:45:58.039'),
(12, 49, 'Zikri', '2025-09-22 09:43:26.433', '2025-09-22 09:43:26.433');

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar`
--

CREATE TABLE `komentar` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `article_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `komentar`
--

INSERT INTO `komentar` (`id`, `kecamatan_id`, `article_id`, `name`, `email`, `no_telp`, `pesan`, `status`, `created_at`, `updated_at`) VALUES
(1, 48, 5, 'Fuad', 'fuad@gmail.com', '13424234243', 'Mantap', 'approved', '2025-09-19 17:11:55.000', '2025-09-22 10:54:33.754');

-- --------------------------------------------------------

--
-- Struktur dari tabel `officials`
--

CREATE TABLE `officials` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `photo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `officials`
--

INSERT INTO `officials` (`id`, `kecamatan_id`, `name`, `position`, `photo`, `created_at`, `updated_at`) VALUES
(1, 48, 'Hendra Purwadi, S.Sos., M.Si', 'Sekretaris Camat', '/uploads/officials/1758643366648-738472916.png', '2025-09-20 17:54:25.396', '2025-09-23 16:02:46.650'),
(2, 49, 'rerere', 'staff', '/assets/uploads/officials/1758390865383-789475109.jpg', '2025-09-21 00:56:28.000', '2025-09-21 00:56:29.000'),
(3, 49, 'Asep Ginanjar', 'Staf Khusus', '/assets/default/default.png', '2025-09-22 09:21:48.265', '2025-09-22 09:21:48.265');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengaduan_aspirasi`
--

CREATE TABLE `pengaduan_aspirasi` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_telp` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pesan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` enum('pengaduan','aspirasi') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pengaduan_aspirasi`
--

INSERT INTO `pengaduan_aspirasi` (`id`, `kecamatan_id`, `name`, `email`, `no_telp`, `pesan`, `kategori`, `status`, `created_at`, `updated_at`) VALUES
(1, 48, 'Fuad', 'fuad@gmaill.com', '082254535454', 'Tolong pelayannya di tingkatkan', 'pengaduan', 'approved', '2025-09-19 21:28:28.000', '2025-09-21 18:00:55.073');

-- --------------------------------------------------------

--
-- Struktur dari tabel `profile_kecamatan`
--

CREATE TABLE `profile_kecamatan` (
  `id` int NOT NULL,
  `nama_kecamatan` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `subdomain` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alamat` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `telepon` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `foto_kantor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `visi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `misi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sejarah` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gmaps_embed_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `profile_kecamatan`
--

INSERT INTO `profile_kecamatan` (`id`, `nama_kecamatan`, `subdomain`, `alamat`, `telepon`, `email`, `website`, `foto_kantor`, `visi`, `misi`, `sejarah`, `deskripsi`, `gmaps_embed_url`, `created_at`, `updated_at`) VALUES
(48, 'Rancakalong', 'kawilangrancakalong', 'Jl. Raya Rancakalong No. 1, Kecamatan Rancakalong, Kabupaten Sumedang', '0261-123456', 'rancakalong@sumedangkab.go.id', 'https://rancakalong.sumedangkab.go.id', '/uploads/profile/1758642748950-117819804.png', 'Mewujudkan Kecamatan Rancakalong yang maju, religius, berbudaya, dan sejahtera.', '\r\n        1. Meningkatkan pelayanan publik yang cepat, transparan, dan akuntabel.\r\n        2. Mengembangkan potensi budaya dan pariwisata lokal untuk meningkatkan kesejahteraan masyarakat.\r\n        3. Meningkatkan pembangunan infrastruktur wilayah yang merata dan berkelanjutan.\r\n        4. Memberdayakan masyarakat dalam bidang ekonomi, pendidikan, dan kesehatan.\r\n      ', 'Sejarah Rancakalong, Rancakalong merupakan salah satu kecamatan di Kabupaten Sumedang. Dikenal dengan masyarakatnya memegang teguh adat budaya kebersamaan dan ketertiban. Potensi alam cukup subur penghasil prodak pertanian yang mungkin menjadi ikonnya Rancakalong.', '\r\n        Kecamatan Rancakalong merupakan salah satu kecamatan di Kabupaten Sumedang \r\n        yang dikenal dengan kekayaan budaya dan tradisi Sunda. \r\n        Wilayah ini memiliki potensi seni tradisi seperti seni Tarawangsa, \r\n        serta potensi wisata alam yang mendukung perkembangan ekonomi masyarakat.\r\n      ', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.362805616904!2d107.79280603590303!3d-6.827754076907511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68d98d4fedb96d%3A0x2adf9412c9c72e06!2sKec.%20Rancakalong%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1758086503166!5m2!1sid!2sid', '2025-09-17 05:29:01.685', '2025-09-23 15:52:28.953'),
(49, 'darmaraja', 'kecdarmaraja', 'asdads', '-', 'asd@gmail.com', 'https://rancakalong.sumedangkab.go.id', '/assets/default/image-not-availeble.png', '-', '-', '-', '-', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.362805616904!2d107.79280603590303!3d-6.827754076907511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68d98d4fedb96d%3A0x2adf9412c9c72e06!2sKec.%20Rancakalong%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1758086503166!5m2!1sid!2sid', '2025-09-20 16:42:51.000', '2025-09-22 07:40:02.169'),
(50, 'dadsad', 'darmajaya', 'adasds', '0261-123456', 'fuad@gmail.com', 'https://rancakalong.sumedangkab.go.id', '/assets/default/image-not-available.png', 'dads', 'asdsad', 'adasdsads', 'dasds', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.362805616904!2d107.79280603590303!3d-6.827754076907511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68d98d4fedb96d%3A0x2adf9412c9c72e06!2sKec.%20Rancakalong%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1758086503166!5m2!1sid!2sid', '2025-09-22 07:35:39.154', '2025-09-22 07:35:39.154');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sub_kategori_article`
--

CREATE TABLE `sub_kategori_article` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `kategori_id` int NOT NULL,
  `sub_nama` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sub_kategori_article`
--

INSERT INTO `sub_kategori_article` (`id`, `kecamatan_id`, `kategori_id`, `sub_nama`, `created_at`, `updated_at`) VALUES
(1, 48, 2, 'Hotel', '2025-09-17 12:41:48.000', '2025-09-17 12:41:48.000'),
(2, 48, 2, 'Villa', '2025-09-17 12:41:59.000', '2025-09-17 12:42:00.000'),
(3, 48, 5, 'Fashion', '2025-09-17 12:42:34.000', '2025-09-17 12:42:35.000'),
(4, 48, 5, 'Kriya', '2025-09-17 12:42:48.000', '2025-09-17 12:42:49.000'),
(5, 48, 3, 'Minuman', '2025-09-17 12:43:03.000', '2025-09-17 12:43:04.000'),
(6, 48, 3, 'Makanan', '2025-09-17 12:43:16.000', '2025-09-17 12:43:16.000'),
(7, 48, 1, 'Berita', '2025-09-17 12:43:37.000', '2025-09-17 12:43:38.000'),
(8, 48, 1, 'Kegiatan', '2025-09-17 12:43:50.000', '2025-09-17 12:43:51.000'),
(9, 48, 6, 'Tradisi', '2025-09-17 12:44:38.000', '2025-09-17 12:44:39.000'),
(10, 48, 6, 'Desa Wisata', '2025-09-17 12:45:07.000', '2025-09-17 12:45:08.000'),
(11, 48, 4, 'Wisata Alam', '2025-09-17 12:45:23.000', '2025-09-17 12:45:24.000'),
(12, 48, 4, 'Wisata Buatan', '2025-09-17 12:45:50.000', '2025-09-17 12:45:53.000'),
(13, 48, 8, 'Pengumuman', '2025-09-17 15:00:36.000', '2025-09-17 15:00:37.000'),
(14, 48, 11, 'Organisasi', '2025-09-22 05:45:59.130', '2025-09-22 05:57:43.530'),
(15, 48, 6, 'Kesenian', '2025-09-22 05:58:10.263', '2025-09-22 05:58:10.263'),
(16, 49, 12, 'Zikri-bHLUL', '2025-09-22 09:43:28.796', '2025-09-22 09:58:55.876');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `kecamatan_id` int DEFAULT NULL,
  `nik` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin_kecamatan','masyarakat','admin_kab') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','approved','rejected') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_login_at` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `kecamatan_id`, `nik`, `username`, `full_name`, `email`, `password`, `role`, `status`, `last_login_at`, `created_at`, `updated_at`) VALUES
(1, NULL, '9876543210987654', 'AdminKabupaten', 'Admin Kabupaten', 'adminkabupaten@gmail.com', '$2b$10$SdqxYnmnrl6OPDJggB.jFeTQP2IfkmNwwHNDKnmpRNGt2QVhjPE/G', 'admin_kab', 'approved', NULL, '2025-09-17 05:29:30.850', '2025-09-17 05:29:30.850'),
(2, 48, '1234567890123456', 'AdminKecamatan', 'Admin Rancakalong', 'adminrancakalong@gmail.com', '$2b$10$h2I79fbA/n8JkZyiy/FFvOJ5Dzmqs9bb7bVnamqj4f9nfVhRQGruG', 'admin_kecamatan', 'approved', NULL, '2025-09-17 05:29:30.864', '2025-09-22 14:56:30.388'),
(3, 49, '1231131312314', 'AdminDarmaraja', 'admin', 'admindarmaraja@gmail.com', '$2b$10$h2I79fbA/n8JkZyiy/FFvOJ5Dzmqs9bb7bVnamqj4f9nfVhRQGruG', 'admin_kecamatan', 'approved', NULL, '2025-09-20 16:43:38.000', '2025-09-20 16:43:51.000'),
(4, 49, '123424234243', 'adwadwdassda', 'Admin Rancakalong', 'sekre@gmail.com', '$2b$10$zYLF8WcP15aIfbY2Y7pQeu3RZQo3FaVK3dYfEKZzlmXNwdFLiGlEG', 'admin_kecamatan', 'approved', NULL, '2025-09-22 14:58:33.836', '2025-09-22 14:58:33.836');

-- --------------------------------------------------------

--
-- Struktur dari tabel `videos`
--

CREATE TABLE `videos` (
  `id` int NOT NULL,
  `kecamatan_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `embed_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `uploaded_at` datetime(3) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `videos`
--

INSERT INTO `videos` (`id`, `kecamatan_id`, `title`, `embed_url`, `kategori`, `deskripsi`, `uploaded_at`, `created_at`, `updated_at`) VALUES
(1, 48, 'Geo Theater Rancakalong', 'https://www.youtube.com/watch?v=bsoEdpdLeZw', 'destinasi', 'Geo Theater terletak di 3 Desa yaitu Desa Sukamaju,Sukahayu,& Pamekaran Kecamatan Rancakalong dan menjadi destinasi wisata unggulan di Sumedang. Pasalnya, tempat wisata ini diproyeksikan menjadi pusat budaya Sunda di Sumedang.', '2025-09-19 19:09:01.000', '2025-09-19 19:09:02.000', '2025-09-19 19:09:03.000'),
(2, 48, 'PIZZA ALA AMBU CISOKA | menikmati pizza khas Italia nggak harus ke Italia yu ke PIZZA ALA AMBU aja', 'https://www.youtube.com/watch?v=89WGJSUnIbs', 'kuliner', 'PIZZA ALA AMBU.', '2025-09-19 19:11:26.000', '2025-09-19 19:11:28.000', '2025-09-19 19:11:28.000'),
(3, 48, 'wista panenjoan', 'https://www.youtube.com/watch?v=B70en0Wls0g', 'destinasi', 'wisata panenjoan rancaklong', '2025-09-19 19:13:21.000', '2025-09-19 19:13:22.000', '2025-09-19 19:13:23.000'),
(4, 48, 'cerita asal muasal kampung rancakalong', 'https://www.youtube.com/watch?v=WExGyVze3G4', 'sejarah', 'silsilah kampung rancakalong dengan semua budaya yang ada di dalamnya', '2025-09-19 19:14:08.000', '2025-09-19 19:14:09.000', '2025-09-19 19:14:10.000'),
(5, 48, 'tradisi nyawen || ritual sebelum panen padi || rancakalong sumedang', 'https://www.youtube.com/watch?v=qbADR4yMz4s', 'budaya', 'sebuah tradisi adat rancakalong ketika menjelang panen padi.', '2025-09-19 19:14:46.000', '2025-09-19 19:14:47.000', '2025-09-19 19:14:47.000'),
(7, 48, 'sdads', 'https://www.youtube.com/watch?v=Ra5VN51V9Tk', 'aspirasi', 'asds', '2025-09-22 10:39:00.000', '2025-09-22 10:39:06.474', '2025-09-22 10:39:06.474'),
(8, 48, 'zccxcx', 'http://adasds', 'bunga', 'zxczc', '2025-09-01 16:48:00.000', '2025-09-22 16:48:16.468', '2025-09-22 16:48:16.468');

-- --------------------------------------------------------

--
-- Struktur dari tabel `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('370009a1-2555-45c1-9525-2736883c6075', '416693e197a86e6fcd130e623ae501dbe709f97ec8cad766806a5bce441d70eb', '2025-09-17 05:20:57.049', '20250917052055_init_schema', NULL, NULL, '2025-09-17 05:20:56.003', 1);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `acara`
--
ALTER TABLE `acara`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acara_slug_key` (`slug`),
  ADD KEY `acara_kecamatan_id_fkey` (`kecamatan_id`),
  ADD KEY `acara_user_id_fkey` (`user_id`);

--
-- Indeks untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `articles_title_key` (`title`),
  ADD UNIQUE KEY `articles_slug_key` (`slug`),
  ADD KEY `articles_user_id_fkey` (`user_id`),
  ADD KEY `articles_kecamatan_id_fkey` (`kecamatan_id`),
  ADD KEY `articles_desa_id_fkey` (`desa_id`),
  ADD KEY `articles_kategori_id_fkey` (`kategori_id`),
  ADD KEY `articles_sub_kategori_id_fkey` (`sub_kategori_id`);

--
-- Indeks untuk tabel `desa`
--
ALTER TABLE `desa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `desa_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `front_image`
--
ALTER TABLE `front_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `front_image_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `infografis`
--
ALTER TABLE `infografis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `infografis_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `kategori_article`
--
ALTER TABLE `kategori_article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategori_article_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD PRIMARY KEY (`id`),
  ADD KEY `komentar_kecamatan_id_fkey` (`kecamatan_id`),
  ADD KEY `komentar_article_id_fkey` (`article_id`);

--
-- Indeks untuk tabel `officials`
--
ALTER TABLE `officials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `officials_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `pengaduan_aspirasi`
--
ALTER TABLE `pengaduan_aspirasi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pengaduan_aspirasi_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `profile_kecamatan`
--
ALTER TABLE `profile_kecamatan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sub_kategori_article`
--
ALTER TABLE `sub_kategori_article`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_kategori_article_kategori_id_fkey` (`kategori_id`),
  ADD KEY `sub_kategori_article_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_nik_key` (`nik`),
  ADD UNIQUE KEY `users_username_key` (`username`),
  ADD UNIQUE KEY `users_email_key` (`email`),
  ADD KEY `users_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_kecamatan_id_fkey` (`kecamatan_id`);

--
-- Indeks untuk tabel `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `acara`
--
ALTER TABLE `acara`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `desa`
--
ALTER TABLE `desa`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `front_image`
--
ALTER TABLE `front_image`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `infografis`
--
ALTER TABLE `infografis`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `kategori_article`
--
ALTER TABLE `kategori_article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT untuk tabel `komentar`
--
ALTER TABLE `komentar`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `officials`
--
ALTER TABLE `officials`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `pengaduan_aspirasi`
--
ALTER TABLE `pengaduan_aspirasi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `profile_kecamatan`
--
ALTER TABLE `profile_kecamatan`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT untuk tabel `sub_kategori_article`
--
ALTER TABLE `sub_kategori_article`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `acara`
--
ALTER TABLE `acara`
  ADD CONSTRAINT `acara_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `acara_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `desa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_article` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_sub_kategori_id_fkey` FOREIGN KEY (`sub_kategori_id`) REFERENCES `sub_kategori_article` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `desa`
--
ALTER TABLE `desa`
  ADD CONSTRAINT `desa_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `front_image`
--
ALTER TABLE `front_image`
  ADD CONSTRAINT `front_image_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `infografis`
--
ALTER TABLE `infografis`
  ADD CONSTRAINT `infografis_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `kategori_article`
--
ALTER TABLE `kategori_article`
  ADD CONSTRAINT `kategori_article_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `komentar_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `komentar_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `officials`
--
ALTER TABLE `officials`
  ADD CONSTRAINT `officials_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pengaduan_aspirasi`
--
ALTER TABLE `pengaduan_aspirasi`
  ADD CONSTRAINT `pengaduan_aspirasi_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `sub_kategori_article`
--
ALTER TABLE `sub_kategori_article`
  ADD CONSTRAINT `sub_kategori_article_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_article` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `sub_kategori_article_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
