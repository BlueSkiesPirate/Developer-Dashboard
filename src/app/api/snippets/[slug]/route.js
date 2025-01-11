import connectMongoDB from "@/lib/db";
import Snippet from "../../../../../models/snippet";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req, { params }) {
  const { slug } = params;

  await connectMongoDB();
  const snippet = await Snippet.find({ title: slug });
  return NextResponse.json({ snippet }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    await connectMongoDB();
    const { slug } = await params;
    const { title, description } = await req.json();
    const updatedSnippet = await Snippet.findByIdAndUpdate(
      slug,
      { title, description },
      { new: true }
    );
    if (!updatedSnippet) {
      return NextResponse.json(
        { message: "Snippet not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedSnippet, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { slug } = await params;
    await connectMongoDB();
    const deletedSnippet = await Snippet.findByIdAndDelete(slug);
    if (!deletedSnippet) {
      return NextResponse.json(
        { message: "Snippet Not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedSnippet, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
