const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Cari profile_kecamatan pertama
  const kecamatan = await prisma.profile_kecamatan.findFirst();

  if (!kecamatan) {
    console.log("Belum ada data kecamatan, buat dulu sebelum seed desa");
    return;
  }

  const kategoriArticle = [
    { nama: "Berita" },
    { nama: "Akomodasi" },
    { nama: "Kuliner" },
    { nama: "Wisata" },
    { nama: "Ekraf" },
    { nama: "Seni Budaya" },
    { nama: "Entertainment" },
  ];

  for (const kategori of kategoriArticle) {
    await prisma.kategori_article.create({
      data: {
        kecamatan_id: kecamatan.id,
        nama: kategori.nama,
      },
    });
  }

  console.log("✅ Data kategori artikel berhasil ditambahkan");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
