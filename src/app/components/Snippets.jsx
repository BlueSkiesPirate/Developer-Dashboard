"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import DeleteBtn from "./deleteBtn";
import { getSnippets } from "@/lib/api";
import { FiEye } from "react-icons/fi";

export default function Snippets({ onSendData, DoReload, length }) {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(false)
    const [currentlyViewing, setCurrentlyViewing] = useState(true) //This is to add a feature in which I can chhnage the styling of the snippet I select to add like a border color and such



    const triggerReload = () => {
        setReload(!reload)
    }

    const sendData = (snippet) => {
        onSendData(snippet)
        setCurrentlyViewing(true)
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
        console.log(currentlyViewing)
        fetchSnippets();
    }, [reload, DoReload, currentlyViewing]);

    useEffect(() => {
        length(snippets.length)
    }, [snippets])

    if (loading) return <p className="text-white">Loading...</p>;


    return (
        <>


            {snippets.map((snippet, key) => (
                <div
                    key={snippet._id}
                    className={`h-36 w-full ${styles.background} ${styles.rounded} px-2 pt-2 mt-2 `}
                >
                    <div
                        className={`h-10 w-full ${styles.buttonDark} ${styles.rounded} text-white flex justify-center items-center px-2`}
                    >
                        {snippet.title}
                        <FiEye onClick={() => sendData(snippet)} className={"ml-auto mr-5 cursor-pointer"} />
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