const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.profile_kecamatan.create({
    data: {
      nama_kecamatan: "Kecamatan Rancakalong",
      alamat:
        "Jl. Raya Rancakalong No. 1, Kecamatan Rancakalong, Kabupaten Sumedang",
      telepon: "0261-123456",
      email: "rancakalong@sumedangkab.go.id",
      website: "https://rancakalong.sumedangkab.go.id",
      foto_kantor: "uploads/kecamatan/rancakalong/kantor.jpg",
      visi: "Mewujudkan Kecamatan Rancakalong yang maju, religius, berbudaya, dan sejahtera.",
      misi: `
        1. Meningkatkan pelayanan publik yang cepat, transparan, dan akuntabel.
        2. Mengembangkan potensi budaya dan pariwisata lokal untuk meningkatkan kesejahteraan masyarakat.
        3. Meningkatkan pembangunan infrastruktur wilayah yang merata dan berkelanjutan.
        4. Memberdayakan masyarakat dalam bidang ekonomi, pendidikan, dan kesehatan.
      `,
      tujuan:
        "Menciptakan masyarakat Kecamatan Rancakalong yang mandiri, adil, sejahtera, dan harmonis.",
      sejarah: `
        Kecamatan Rancakalong merupakan salah satu kecamatan di Kabupaten Sumedang 
        yang dikenal dengan kekayaan budaya dan tradisi Sunda. 
        Wilayah ini memiliki potensi seni tradisi seperti seni Tarawangsa, 
        serta potensi wisata alam yang mendukung perkembangan ekonomi masyarakat.
      `,
      gmaps_embed_url:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.1234567890123!2d107.92345678901234!3d-6.833456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e12345678901234%3A0x1234567890123456!2sKecamatan%20Rancakalong%2C%20Sumedang!5e0!3m2!1sid!2sid!4v1612345678901",
      lat: -6.833456,
      lng: 107.923456,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
