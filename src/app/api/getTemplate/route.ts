import { PrismaClient } from "@/generated/prisma";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const body = await req.json();

  const { userId, formId } = body;

  if (!body || !userId || !formId) {
    return new Response("User ID and Form ID are required", { status: 400 });
  }

  const form = await prisma.form.findUnique({
    where: { id: formId, userId: userId },
    include: {
      fields: true, 
    },
  });

    if (!form) {
        return new Response("Form not found or you do not have access", { status: 404 });
    }

    return new Response(JSON.stringify(form), { status: 200 });
}
