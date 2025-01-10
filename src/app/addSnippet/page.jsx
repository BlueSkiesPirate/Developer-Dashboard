"use client"
import { useState } from "react"
import { createSnippet } from "@/lib/api";

export default function AddSnippet() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createSnippet({ title, description });
        alert("User created!");
    };
    return (

        <form onSubmit={handleSubmit} className={`w-40 bg-green-500 flex flex-col`}>
            <input onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={`border px-8 py-2`} type="text" placeholder="Snippet Title" />
            <input onChange={(e) => setDescription(e.target.value)}
                value={description}

                className={`border px-8 py-2`} type="text" placeholder="description" />
            <button type="submit" className={`border px-8 py-2 bg-green-500`}>Add Snippet</button>

        </form>
    )
}
