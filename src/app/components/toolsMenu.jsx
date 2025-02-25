"use client"
import { useState } from "react"
import styles from "../page.module.css"
import { deleteSnippet } from "@/lib/api";
import { TiEdit } from "react-icons/ti";
import { BiTrash } from "react-icons/bi";
import { RiToolsFill } from "react-icons/ri";
import DeleteBtn from "./deleteBtn";

export default function ToolMenu({ snippetData, edit, stopViewingSnippet }) {//{ id }, { edit }

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
    return (
        <>
            <div className={`h-10 w-16 flex justify-center items-center ${styles.buttonDark} ${styles.rounded} ml-2 text-white relative`}>
                <RiToolsFill onClick={handleDisplay} className={`text-2xl`} />
                <div className={`  ${noDisplay ? styles.noDisplay : " "} w-full h-32 absolute top-0 flex flex-col justify-around items-center bg-slate-900 border border-white rounded-xl`}> {/**${styles.componentLight} */}
                    <RiToolsFill className={`border-b-2 border-black w-1/2 flex justify-center cursor-pointer text-4xl `} onClick={handleDisplay} />
                    <TiEdit className={`cursor-pointer  text-purple-700 text-3xl`} onClick={handleEdit} />
                    <DeleteBtn id={snippetData._id} onDelete={stopViewingSnippet} title={snippetData.title} />
                </div>
            </div>
        </>

    )
}