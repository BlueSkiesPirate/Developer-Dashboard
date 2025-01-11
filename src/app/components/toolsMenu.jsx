"use client"
import { useState } from "react"
import styles from "../page.module.css"
import { useEffect } from "react";
import { deleteSnippet } from "@/lib/api";

export default function ToolMenu({ id, edit }) {//{ id }, { edit }

    const [noDisplay, setNoDisplay] = useState(true);
    const handleDisplay = () => {
        if (!noDisplay) {
            setNoDisplay(true)
        } else {
            setNoDisplay(false)
        }

    }
    const handleEdit = async () => {
        edit()
    }

    const handleDelete = async () => {
        const confirmed = confirm("are you sure?")
        if (confirmed) {
            await deleteSnippet(id)
        }

    }

    return (
        <>
            <div className={`h-10 w-16 flex justify-center items-center ${styles.buttonDark} ${styles.rounded} ml-2 text-white relative`}>
                <button onClick={handleDisplay} className={``}>tools</button>
                <div className={`${styles.componentLight} ${styles.rounded} ${noDisplay ? styles.noDisplay : " "} w-full h-32 absolute top-0 flex flex-col justify-center items-center`}>
                    <div className={`border-b-2 border-black w-1/2 flex justify-center items-center cursor-pointer`} onClick={handleDisplay}>A</div>
                    <button className={`cursor-pointer`} onClick={handleEdit}>edit</button>
                    <div>Copy</div>
                    <button className={`mt-3`} onClick={handleDelete}>Del</button>
                </div>
            </div>
        </>

    )
}