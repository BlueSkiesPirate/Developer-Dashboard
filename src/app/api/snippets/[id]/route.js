import connectMongoDB from "@/lib/mongodb";
import Snippet from "../../../../../models/snippet";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB;
  await Snippet.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = await params;
  await connectMongoDB;
  const snippet = await Snippet.findOne({ _id: id });
  return NextResponse.json({ snippet }, { status: 200 });
}
