import connectMongoDB from "@/lib/db";
import Snippet from "../../../../models/snippet";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { title, description, tags, code } = await req.json();
    const newSnippet = new Snippet({ title, description, tags, code });
    await newSnippet.save();
    return NextResponse.json(newSnippet, { status: 201 });
  } catch (err) {
    console.log(err);
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const Snippets = await Snippet.find({});
    return NextResponse.json(Snippets, { status: 201 });
  } catch (err) {}
}
