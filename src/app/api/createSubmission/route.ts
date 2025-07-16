import { PrismaClient } from "@/generated/prisma";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.formId) {
    return new Response("Form ID and data required", { status: 400 });
  }

  try {
    const submission = await prisma.submission.create({
      data: {
        formId: body.formId,
        userId: body.userId,
        data: body.data,
      },
    });

    return new Response(JSON.stringify(submission), { status: 201 });
  } catch (err) {
    console.error("Submission creation failed:", err);
    return new Response("Error creating submission", { status: 500 });
  }
}