import { PrismaClient } from "@/generated/prisma";
import { NextRequest } from "next/server";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  
    if (!body) {
      return new Response("No data provided", { status: 400 });
    }
  
    if (!body.email) {
      return new Response("Email is required", { status: 400 });
    }
  
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
  
    if (user) {
      return new Response("User already exists", { status: 400 });
    }
  
    if (body?.provider === "google") {
      if (!body.displayName || !body.uid || !body.email) {
        return new Response(
          "Display Name, UID and Email are required for Google sign up",
          { status: 400 }
        );
      }
  
      const { displayName, uid, email } = body;
  
     const user = await prisma.user.create({
        data: {
          id: uid,
          email,
          name: displayName,
        },
      });
  
      return new Response(JSON.stringify({ message: "User created successfully", user }), {
        status: 201,
      });
    }
  
    const { name, email } = body;
  
    const user2 = await prisma.user.create({
      data: {
        name,
        email,
        id: new ObjectId().toHexString(),
      },
    });
  
    return new Response(JSON.stringify({ message: "User created successfully", user: user2 }), {
        status: 201,
      });
  } catch (error) {
    console.log(error)
    console.error("User creation failed:", error);
    return new Response("Error creating user", { status: 500 });
    
  }


}
