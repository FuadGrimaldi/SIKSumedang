const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.profile_kecamatan.create({
    data: {
      nama_kecamatan: "Kecamatan Rancakalong",
      subdomain: "kawilangrancakalong",
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
      sejarah: `
        Kecamatan Rancakalong merupakan salah satu kecamatan di Kabupaten Sumedang 
        yang dikenal dengan kekayaan budaya dan tradisi Sunda. 
        Wilayah ini memiliki potensi seni tradisi seperti seni Tarawangsa, 
        serta potensi wisata alam yang mendukung perkembangan ekonomi masyarakat.
      `,
      deskripsi: `
        Kecamatan Rancakalong merupakan salah satu kecamatan di Kabupaten Sumedang 
        yang dikenal dengan kekayaan budaya dan tradisi Sunda. 
        Wilayah ini memiliki potensi seni tradisi seperti seni Tarawangsa, 
        serta potensi wisata alam yang mendukung perkembangan ekonomi masyarakat.
      `,
      gmaps_embed_url:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.362805616904!2d107.79280603590303!3d-6.827754076907511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68d98d4fedb96d%3A0x2adf9412c9c72e06!2sKec.%20Rancakalong%2C%20Kabupaten%20Sumedang%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1758086503166!5m2!1sid!2sid",
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
