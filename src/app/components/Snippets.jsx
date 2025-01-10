"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import DeleteBtn from "./deleteBtn";
import { getSnippets } from "@/lib/api";
import { FiEye } from "react-icons/fi";

export default function Snippets({ onSendData }) {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);



    const sendData = (snippet) => {
        onSendData(snippet)
    }



    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const res = await getSnippets(); // Axios fetch
                setSnippets(res || [])
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);

    if (loading) return <p>Loading...</p>;
    // if (snippets.length === 0) return <p>No snippets available.</p>;

    return (
        <>


            {snippets.map((snippet, key) => (
                <div
                    key={snippet._id}
                    className={`h-36 w-full ${styles.background} ${styles.rounded} px-2 pt-2 mt-2`}
                >
                    <div
                        className={`h-10 w-full ${styles.buttonDark} ${styles.rounded} text-white flex justify-center items-center px-2`}
                    >
                        {snippet.title}
                        <FiEye onClick={() => sendData(snippet)} className={"ml-auto cursor-pointer"}> view</FiEye>

                    </div>
                    <div className={`h-full w-full text-white p-2 `}>
                        {snippet.description}
                        <div className={`flex mt-9`}>
                            <button className={` text-cyan-500`}>update</button>
                            <h2 className={'mx-3'}>|</h2>
                            <DeleteBtn id={snippet._id} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}