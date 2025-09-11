-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NULL,
    `nik` VARCHAR(16) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `full_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin_kecamatan', 'masyarakat', 'admin_kab') NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
    `last_login_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_nik_key`(`nik`),
    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profile_kecamatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kecamatan` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `foto_kantor` VARCHAR(255) NOT NULL,
    `visi` LONGTEXT NOT NULL,
    `misi` LONGTEXT NOT NULL,
    `tujuan` LONGTEXT NOT NULL,
    `sejarah` LONGTEXT NOT NULL,
    `gmaps_embed_url` LONGTEXT NOT NULL,
    `lat` DOUBLE NULL,
    `lng` DOUBLE NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infografis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `gambar_path` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anggaran_apbkec` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `tahun_anggaran` YEAR NOT NULL,
    `deskripsi` LONGTEXT NOT NULL,
    `total_pendapatan` DECIMAL(15, 2) NOT NULL,
    `total_belanja` DECIMAL(15, 2) NOT NULL,
    `dokumen_realisasi_path` VARCHAR(255) NOT NULL,
    `infografis_path` VARCHAR(255) NOT NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL,
    `published_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `kecamatan_id` INTEGER NOT NULL,
    `tipe` ENUM('berita', 'agenda', 'sakip', 'sid', 'kegiatan', 'pengumuman') NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `featured_image` VARCHAR(255) NOT NULL,
    `dokumen_terkait_path` VARCHAR(255) NOT NULL,
    `waktu_kegiatan` DATETIME(3) NOT NULL,
    `lokasi_kegiatan` VARCHAR(255) NOT NULL,
    `status` ENUM('published', 'draft') NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `embed_url` VARCHAR(255) NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `deskripsi` LONGTEXT NOT NULL,
    `uploaded_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organisasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `kategori_id` INTEGER NOT NULL,
    `nama_organisasi` VARCHAR(255) NOT NULL,
    `nama_ketua` VARCHAR(255) NOT NULL,
    `deskripsi_kegiatan` LONGTEXT NOT NULL,
    `logo_path` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_organisasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(100) NOT NULL,
    `kecamatan_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agenda_kecamatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `judul` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `kategori` ENUM('Kebudayaan', 'Olahraga', 'Umum', 'Peringatan_Hari_Besar', 'Sepedahan', 'Olahraga_Asik', 'PKK') NOT NULL,
    `deskripsi` LONGTEXT NOT NULL,
    `lokasi` VARCHAR(255) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,
    `poster` VARCHAR(255) NOT NULL,
    `created_by` INTEGER NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `agenda_kecamatan_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `officials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `display_order` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `komentar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `article_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `pesan` LONGTEXT NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengaduan_aspirasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `pesan` LONGTEXT NOT NULL,
    `kategori` ENUM('pengaduan', 'aspirasi') NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sarana_prasarana` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `kategori` ENUM('pendidikan', 'kesehatan', 'ibadah', 'olahraga', 'umum', 'wisata') NOT NULL,
    `nama_sarana` VARCHAR(255) NOT NULL,
    `deskripsi` LONGTEXT NOT NULL,
    `alamat_lokasi` VARCHAR(255) NOT NULL,
    `koordinat_lat` VARCHAR(50) NOT NULL,
    `koordinat_long` VARCHAR(50) NOT NULL,
    `foto_path` VARCHAR(255) NOT NULL,
    `unggulan` ENUM('Y', 'N') NOT NULL,
    `status` ENUM('pending', 'approved', 'rejected') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `infografis` ADD CONSTRAINT `infografis_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anggaran_apbkec` ADD CONSTRAINT `anggaran_apbkec_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organisasi` ADD CONSTRAINT `organisasi_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `organisasi` ADD CONSTRAINT `organisasi_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_organisasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_organisasi` ADD CONSTRAINT `kategori_organisasi_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda_kecamatan` ADD CONSTRAINT `agenda_kecamatan_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agenda_kecamatan` ADD CONSTRAINT `agenda_kecamatan_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `officials` ADD CONSTRAINT `officials_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengaduan_aspirasi` ADD CONSTRAINT `pengaduan_aspirasi_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sarana_prasarana` ADD CONSTRAINT `sarana_prasarana_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
