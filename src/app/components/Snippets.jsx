"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import DeleteBtn from "./deleteBtn";
import { getSnippets } from "@/lib/api";
import { FiEye } from "react-icons/fi";

export default function Snippets({ onSendData, DoReload }) {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false)

    const triggerReload = () => {
        setReload(!reload)
    }

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
    }, [reload, DoReload]);

    if (loading) return <p className="text-white">Loading...</p>;


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
                        <FiEye onClick={() => sendData(snippet)} className={"ml-auto mr-5 cursor-pointer"}> view</FiEye>
                        <DeleteBtn id={snippet._id} onDelete={triggerReload} title={snippet.title} />

                    </div>
                    <div className={`h-full w-full text-white p-2 `}>
                        <div>{snippet.description.length > 300 ?
                            `${snippet.description.slice(0, 300)}...`
                            : snippet.description}</div>
                    </div>
                </div>
            ))}
        </>
    );
}