import connectMongoDB from "@/lib/mongodb";
import Snippet from "../../../../models/snippet";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Snippet.create({
    title,
    description,
  });

  return NextResponse.json({ message: "snippet created!" }, { status: 201 });
}

export async function GET(id) {
  await connectMongoDB;
  const snippets = await Snippet.find();
  return NextResponse.json({ snippets });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB;
  await Snippet.findByIdAndDelete(id);
  return NextResponse.json({ message: "deleted" }, { status: 200 });
}
