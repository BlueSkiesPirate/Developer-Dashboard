"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function AddSnippet() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title || !description) {
            alert('title or description missing')
            return;
        }

        try {
            const res = fetch('http://localhost:3000/api/snippets', { /**Removed the await */
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description
                })
            })

            if (res.ok) {
                router.push('/')
            } else {
                throw new Error("failed to create a topic")
            }


        } catch (error) {
            console.log(error)
        }
    }

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
