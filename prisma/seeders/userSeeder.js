const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Cari profile_kecamatan pertama
  const kecamatan = await prisma.profile_kecamatan.findFirst();

  if (!kecamatan) {
    console.log(
      "Belum ada data kecamatan, buat dulu sebelum seed user admin_kecamatan"
    );
    return;
  }

  const hashedPasswordKab = await bcrypt.hash("admin123", 10);
  const hashedPasswordKec = await bcrypt.hash("adminkec123", 10);

  // User admin kabupaten
  await prisma.users.create({
    data: {
      kecamatan_id: null, // null karena admin kabupaten tidak terkait kecamatan spesifik
      nik: "9876543210987654",
      username: "AdminKabupaten",
      full_name: "Admin Kabupaten",
      email: "adminkabupaten@gmail.com",
      password: hashedPasswordKab,
      role: "admin_kab", // enum Role
      status: "approved",
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  // User admin kecamatan
  await prisma.users.create({
    data: {
      kecamatan_id: kecamatan.id, // hubungkan ke kecamatan pertama
      nik: "1234567890123456",
      username: "AdminKecamatan",
      full_name: "Admin Kecamatan",
      email: "adminkecamatan@gmail.com",
      password: hashedPasswordKec,
      role: "admin_kecamatan",
      status: "approved",
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
