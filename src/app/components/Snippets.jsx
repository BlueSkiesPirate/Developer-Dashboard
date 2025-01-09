"use client";

import { useState, useEffect } from "react";
import styles from "../page.module.css";
import DeleteBtn from "./deleteBtn";
import ViewBtn from "./viewBtn";
import { getSnippets } from "@/lib/api";

export default function Snippets() {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);

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
    console.log(snippets)
    return (
        <>


            {snippets.map((snippet) => (
                <div
                    key={snippet._id}
                    className={`h-36 w-full ${styles.background} ${styles.rounded} px-2 pt-2 mt-2`}
                >
                    <div
                        className={`h-10 w-full ${styles.buttonDark} ${styles.rounded} text-white flex justify-center items-center px-2`}
                    >
                        {snippet.title}
                        <ViewBtn id={snippet._id} />
                    </div>
                    <div className={`h-full w-full text-white p-2`}>
                        {snippet.description}
                        <div className={`flex`}>
                            <button className={`bg-white text-black w-20 mr-2`}>update</button>
                            <DeleteBtn id={snippet._id} />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}