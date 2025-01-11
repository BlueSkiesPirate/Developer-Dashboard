import { ResizablePanel } from "@/components/ui/resizable"
import styles from "../page.module.css"
import ToolMenu from "./toolsMenu";
import { useState } from "react";

export default function ViewSnippet({ snippetData }) {
    const [edittingSnippet, setEdittingSnippet] = useState(false);

    const [title, SetTitle] = useState(snippetData.title)
    const [description, SetDescription] = useState(snippetData.description)

    const id = snippetData._id;

    const edit = () => {
        setEdittingSnippet(true)
    }

    const updated = () => {
        setEdittingSnippet(false)
    }
    return (
        <ResizablePanel
            className={`${styles.scrollPanel} ${styles.rounded} p-2 h-full `}
        >
            <div className="flex justify-between">
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
                <button onClick={updated} className={` bg-green-500 rounded w-20 h-10 mr-5 ${edittingSnippet ? "" : "hidden"}`}>Update</button>
            </div>
            <div
                className={`h-full
           pb-52`}
            >
                <div className={`flex mt-2 `}>
                    <div
                        className={`${styles.background} h-10 w-full text-white ${styles.rounded} flex pl-2 items-center`}
                    >
                        {title}
                    </div>
                    <div
                        className={`${styles.background} h-10 w-64 text-white ml-2 ${styles.rounded} flex pl-2 items-center justify-between`}
                    >
                        <p>Last edit</p>
                        <div
                            className={`h-full w-24 flex justify-center items-center ${styles.buttonDark} ${styles.rounded}`}
                        >
                            1 day ago
                        </div>
                    </div>
                    <ToolMenu id={id} edit={edit} />
                </div>
                <div
                    className={`${styles.background} h-32 w-full text-white ${styles.rounded} flex pl-2 mt-2`}
                >
                    {description}
                </div>
                <div
                    className={`${styles.background} h-5/6 w-full text-white ${styles.rounded} flex pl-2 mt-2 `}
                >
                    code
                </div>

            </div>
        </ResizablePanel>

    )
}