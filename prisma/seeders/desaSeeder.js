const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Cari profile_kecamatan pertama
  const kecamatan = await prisma.profile_kecamatan.findFirst();

  if (!kecamatan) {
    console.log("Belum ada data kecamatan, buat dulu sebelum seed desa");
    return;
  }

  const desaList = [
    { nama_desa: "NAGARAWANGI" },
    { nama_desa: "CIBUNAR" },
    { nama_desa: "PANGADEGAN" },
    { nama_desa: "SUKAHAYU" },
    { nama_desa: "SUKAMAJU" },
    { nama_desa: "PAMEKARAN" },
    { nama_desa: "RANCAKALONG" },
    { nama_desa: "SUKASIRNARASA" },
    { nama_desa: "CIBUNGUR" },
    { nama_desa: "PASIRBIRU" },
  ];

  for (const desa of desaList) {
    await prisma.desa.create({
      data: {
        kecamatan_id: kecamatan.id,
        nama_desa: desa.nama_desa,
      },
    });
  }

  console.log("✅ Data desa berhasil ditambahkan");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
