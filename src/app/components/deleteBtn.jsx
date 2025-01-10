"use client"
import { useRouter } from "next/navigation"
import { BiTrash } from "react-icons/bi";

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

        <BiTrash onClick={removeSnippet} className={`text-red-400 border-white text-black text-xl `} />
    )
}