"use client"
import { useRouter } from "next/navigation"

export default function DeleteBtn({ id }) {
    const router = useRouter();
    const removeSnippet = async () => {



        const confirmed = confirm("are you sure?")

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/snippets?id=${id}`, {
                method: "DELETE"
            })
            if (res.ok) {
                router.refresh()
            }
        }
    }
    return (
        <button onClick={removeSnippet} className={`bg-white text-black w-20 mr-2 `}>delete</button>
    )
}