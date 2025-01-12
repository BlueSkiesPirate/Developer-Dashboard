"use client"
import { deleteSnippet } from "@/lib/api";
import { useRouter } from "next/navigation"
import { BiTrash } from "react-icons/bi";

export default function DeleteBtn({ id, onDelete, title }) {

    const removeSnippet = async () => {
        const confirmed = confirm(`Are you sure you want to delete: ${title} ?`)
        if (confirmed) {
            await deleteSnippet(id)
            onDelete()
        }
    }
    return (

        <BiTrash onClick={removeSnippet} className={`text-red-400 border-white text-black text-xl cursor-pointer`} />
    )
}