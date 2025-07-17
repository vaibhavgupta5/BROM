import { NextRequest } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { FieldType } from "@/constants/formTemplates";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  const body = await req.json();

  if (!body || !body.id) {
    return new Response("Form ID and data required", { status: 400 });
  }

  try {
    await prisma.formField.deleteMany({
      where: { formId: body.id },
    });

    const updatedForm = await prisma.form.update({
      where: { id: body.id },
      data: {
        title: body.title,
        wrapper: body.wrapper,
        submitButton: body.submitButton,
        custom: body.custom,
        active: body.active ?? true,
        updatedAt: new Date(),
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
      },
      include: { fields: true },
    });

    return new Response(JSON.stringify(updatedForm), { status: 200 });
  } catch (err) {
    console.error("Update failed:", err);
    return new Response("Error updating form", { status: 500 });
  }
}
