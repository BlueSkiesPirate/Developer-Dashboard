import connectMongoDB from "@/lib/db";
import Snippet from "../../../../../models/snippet";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { title } = params;
  await connectMongoDB();
  const snippet = await Snippet.find({ title: title });
  return NextResponse.json({ snippet }, { status: 200 });
}
