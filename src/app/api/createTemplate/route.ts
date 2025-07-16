import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { FieldType } from "@/constants/formTemplates";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body) {
    return new Response("No data provided", { status: 400 });
  }

  if (!body.userId) {
    return new Response("ID is required", { status: 400 });
  }

const form = await prisma.form.create({
  data: {
    title: body.title,
    wrapper: body.wrapper,
    userId: body.userId,
    fields: {
      create: body.fields.map((field: FieldType) => ({
        type: field.type,
        label: field.label,
        placeholder: field.placeholder,
        layout: field.layout,
        selectOptions: field.selectOptions || [],
        style: field.style || {},
      })),
    },
    submitButton: {
      label: body.submitButton.label,
      redirectUrl: body.submitButton.redirectUrl,
      style: body.submitButton.style,
      wrapper: body.submitButton.wrapper,
      alignment: body.submitButton.alignment || "left",
    }, // ✅ just assign JSON object directly
  },
});


  return new Response(JSON.stringify(form), { status: 201 });
}
