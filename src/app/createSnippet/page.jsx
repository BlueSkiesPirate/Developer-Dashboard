"use client"
import { useState } from "react"
import { createSnippet } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "../page.module.css"

export default function AddSnippet() {
    const router = useRouter()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        await createSnippet({ title, description });
        alert("Snippet created!");
        const mainPage = '/'
        router.push(mainPage)
    };
    return (

        <div className="w-full h-screen bg-slate-800 flex justify-center overflow-hidden ">
            <div className="h-full w-1/2 bg-slate-700 px-5">



                <div className="flex justify-between mt-5">
                    <div
                        className={`h-10 w-3/4 ${styles.background} ${styles.rounded} flex`}
                    >
                        <div
                            className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center ${styles.rounded} `}
                        >
                            tags +
                        </div>
                        <div
                            className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center ${styles.rounded} ml-2 `}
                        >
                            {" "}
                            react
                        </div>
                    </div>
                    {/* <button className={` bg-green-500 rounded w-20 h-10 mr-5 ${edittingSnippet ? "" : "hidden"}`}>Update</button> */}
                </div>
                <div
                    className={`h-full
           pb-52`}
                >


                    <form onSubmit={handleSubmit} className="h-full">
                        <input
                            type="text"
                            placeholder="title"
                            required={true}
                            onChange={(e) => setTitle(e.target.value)}
                            className={`${styles.background} h-10 w-full text-white ${styles.rounded} flex pl-2 items-center mt-2`}
                        >
                        </input>


                        <textarea
                            type="text"
                            placeholder="description"
                            required={true}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`${styles.background} h-32 w-full text-white align-text-top ${styles.rounded} flex pl-2 mt-2 resize-none`}
                        >
                        </textarea>



                        <textarea
                            type="text"
                            placeholder="code"
                            required={true}
                            className={`${styles.background} h-5/6 w-full text-white ${styles.rounded} flex pl-2 mt-2 resize-none`}
                        >

                        </textarea>
                        <div className="w-full flex justify-center mt-2 ">
                            <button type="submit" className={`border px-8 py-2 bg-green-500`}>create Snippet</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}


