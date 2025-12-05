// ------------------------------
// Clerk Webhook Endpoint
// Ruta: /api/webhooks/clerk
// ------------------------------

import { NextResponse } from "next/server"; // Respuestas para App Router
import { Webhook } from "svix"; // Librería para verificar webhook signatures
import { prisma } from "@/lib/prisma"; // Prisma Client

// Exportamos POST porque Clerk envía eventos como POST
export async function POST(req: Request) {
  // Clerk envía el body como texto plano
  const payload = await req.text();

  // Cabeceras necesarias para verificar la firma
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  // Validamos que existan las cabeceras
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Missing svix headers", { status: 400 });
  }

  // Instanciamos el verificador con el Webhook Secret de Clerk
  const wh = new Webhook(process.env.SIGNING_SECRET!);

  let evt: any;

  try {
    // Verificamos la firma y parseamos el evento
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("❌ Error verificando webhook:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Extraemos tipo de evento y datos del usuario
  const { type, data } = evt;

  // ------------------------------
  // EVENTO: user.created
  // ------------------------------
  if (type === "user.created") {
    try {
      await prisma.user.create({
        data: {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address ?? null,
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          phone: data.phone_numbers?.[0]?.phone_number ?? null,
        },
      });
      console.log(`✅ Usuario creado en BD → ${data.id}`);
    } catch (err: any) {
      if (err.code === "P2002") {
        console.log("⚠️ Usuario ya existe:", data.id);
      } else {
        console.error("❌ Error creando usuario en Prisma:", err);
        return new NextResponse("DB error", { status: 500 });
      }
    }
  }

  // ------------------------------
  // EVENTO: user.updated
  // ------------------------------
  if (type === "user.updated") {
    try {
      await prisma.user.update({
        where: { clerkId: data.id },
        data: {
          email: data.email_addresses?.[0]?.email_address ?? null,
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          phone: data.phone_numbers?.[0]?.phone_number ?? null,
        },
      });
      console.log(`🔄 Usuario actualizado en BD → ${data.id}`);
    } catch (err) {
      console.error("❌ Error actualizando usuario en Prisma:", err);
      return new NextResponse("DB error", { status: 500 });
    }
  }

  // ------------------------------
  // EVENTO: user.deleted
  // ------------------------------
  if (type === "user.deleted") {
    try {
      await prisma.user.delete({
        where: { clerkId: data.id },
      });
      console.log(`🗑 Usuario borrado en BD → ${data.id}`);
    } catch (err) {
      console.error("❌ Error borrando usuario en Prisma:", err);
      return new NextResponse("DB error", { status: 500 });
    }
  }

  // Devolvemos siempre 200 OK si todo fue bien
  return new NextResponse("OK", { status: 200 });
}
