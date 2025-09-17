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
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
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
    `subdomain` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `telepon` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `website` VARCHAR(191) NULL,
    `foto_kantor` VARCHAR(255) NOT NULL,
    `visi` LONGTEXT NOT NULL,
    `misi` LONGTEXT NOT NULL,
    `sejarah` LONGTEXT NOT NULL,
    `deskripsi` LONGTEXT NOT NULL,
    `gmaps_embed_url` LONGTEXT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `front_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `lokasi` VARCHAR(255) NOT NULL,
    `gambar_path` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `infografis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `gambar_path` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `kecamatan_id` INTEGER NOT NULL,
    `desa_id` INTEGER NOT NULL,
    `kategori_id` INTEGER NOT NULL,
    `sub_kategori_id` INTEGER NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `featured_image` VARCHAR(255) NOT NULL,
    `waktu_kegiatan` DATETIME(3) NOT NULL,
    `lokasi_kegiatan` VARCHAR(255) NOT NULL,
    `status` ENUM('published', 'draft') NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `articles_title_key`(`title`),
    UNIQUE INDEX `articles_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `desa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `nama_desa` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sub_kategori_article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `kategori_id` INTEGER NOT NULL,
    `sub_nama` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

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
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acara` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `kecamatan_id` INTEGER NOT NULL,
    `judul` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `deskripsi` LONGTEXT NOT NULL,
    `lokasi` VARCHAR(255) NOT NULL,
    `waktu` DATETIME(3) NOT NULL,
    `poster` VARCHAR(255) NOT NULL,
    `penyelenggara` VARCHAR(255) NOT NULL,
    `status_acara` ENUM('published', 'draft') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `acara_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `officials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kecamatan_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
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
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
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
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `front_image` ADD CONSTRAINT `front_image_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `infografis` ADD CONSTRAINT `infografis_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_desa_id_fkey` FOREIGN KEY (`desa_id`) REFERENCES `desa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_sub_kategori_id_fkey` FOREIGN KEY (`sub_kategori_id`) REFERENCES `sub_kategori_article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `desa` ADD CONSTRAINT `desa_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_article` ADD CONSTRAINT `kategori_article_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kategori_article` ADD CONSTRAINT `sub_kategori_article_kategori_id_fkey` FOREIGN KEY (`kategori_id`) REFERENCES `kategori_article`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sub_kategori_article` ADD CONSTRAINT `sub_kategori_article_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `videos` ADD CONSTRAINT `videos_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acara` ADD CONSTRAINT `acara_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `acara` ADD CONSTRAINT `acara_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `officials` ADD CONSTRAINT `officials_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `komentar` ADD CONSTRAINT `komentar_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengaduan_aspirasi` ADD CONSTRAINT `pengaduan_aspirasi_kecamatan_id_fkey` FOREIGN KEY (`kecamatan_id`) REFERENCES `profile_kecamatan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
