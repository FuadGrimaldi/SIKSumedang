import { UserKecamatanService } from "@/lib/prisma-service/userKecamatanService";
import { NextResponse, NextRequest } from "next/server";
import { Roles, Status } from "@/types/user";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const user = await UserKecamatanService.getUserById(Number(id));
  } else {
    const users = await UserKecamatanService.getAllUsers();
    return NextResponse.json(users, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data = {
    kecamatan_id: body.kecamatan_id ? Number(body.kecamatan_id) : null,
    nik: String(body.nik),
    full_name: String(body.full_name),
    username: String(body.username),
    email: String(body.email),
    password: String(body.password),
    role: String(body.role) as Roles,
    status: String(body.status) as Status,
    created_at: new Date(),
    updated_at: new Date(),
  };
  try {
    const newUser = await UserKecamatanService.createUser(data);
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json("create successfull", { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
