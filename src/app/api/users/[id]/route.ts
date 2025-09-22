import { UserKecamatanService } from "@/lib/prisma-service/userKecamatanService";
import { NextResponse, NextRequest } from "next/server";
import { Roles, Status } from "@/types/user";

// api by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  try {
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
    const user = await UserKecamatanService.getUserById(id);
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
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
  };
  try {
    const updatedUser = await UserKecamatanService.updateUser(id, data);
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("PUT /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }
  try {
    await UserKecamatanService.deleteUser(id);
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
