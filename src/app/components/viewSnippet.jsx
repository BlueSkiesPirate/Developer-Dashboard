import { ResizablePanel } from "@/components/ui/resizable"
import styles from "../page.module.css"
import ToolMenu from "./toolsMenu";
import { useState, useEffect } from "react";
import { updateSnippet } from "@/lib/api";
import { FaRegEyeSlash } from "react-icons/fa";

export default function ViewSnippet({ snippetData, isViewingSnippet, stopViewingSnippet, reloadThroughUpdate }) {

    const [edittingSnippet, setEdittingSnippet] = useState(false);
    const [title, SetTitle] = useState(snippetData.title)
    const [description, SetDescription] = useState(snippetData.description)
    const [tempTitle, setTempTitle] = useState(snippetData.title)
    const [tempDescription, setTempDescription] = useState(snippetData.description)

    const id = snippetData._id;

    useEffect(() => {
        SetTitle(snippetData.title);
        SetDescription(snippetData.description);
        setTempTitle(snippetData.title);
        setTempDescription(snippetData.description);
    }, [snippetData]);

    const toggleEditMode = () => {
        setEdittingSnippet(!edittingSnippet)


        if (edittingSnippet) {
            setTempTitle(title)
            setTempDescription(description)
        }
    }

    const saveChanges = () => {
        SetTitle(tempTitle)
        SetDescription(tempDescription)
        setEdittingSnippet(false)

        update()

    }

    useEffect(() => {
        reloadThroughUpdate()
    }, [title])

    const update = async () => {
        await updateSnippet(id, { title: tempTitle, description: tempDescription })

    }


    return (
        <ResizablePanel className={`${styles.scrollPanel} ${styles.rounded} p-2 h-full `}>
            {isViewingSnippet ?
                <>
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
                        <button onClick={saveChanges} className={` bg-green-500 rounded w-20 h-10 mr-5 ${edittingSnippet ? "" : "hidden"}`}>Update</button>
                    </div>
                    <div
                        className={`h-full
           pb-52`}
                    >
                        <div className={`flex mt-2 `}>


                            {edittingSnippet ? <input
                                type="text"
                                value={tempTitle}
                                onChange={(e) => setTempTitle(e.target.value)}
                                className={`${styles.background} h-10 w-full text-white ${styles.rounded} flex pl-2 items-center`}
                            >
                            </input>

                                : <div className={`${styles.background} h-10 w-full text-white ${styles.rounded} flex pl-2 items-center`} >
                                    {title}
                                </div>

                            }




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
                            <ToolMenu snippetData={snippetData} edit={toggleEditMode} stopViewingSnippet={stopViewingSnippet} />
                        </div>

                        {edittingSnippet ?
                            <textarea
                                type="text"
                                value={tempDescription}
                                onChange={(e) => setTempDescription(e.target.value)}
                                className={`${styles.background} h-32 w-full text-white align-text-top ${styles.rounded} flex pl-2 mt-2 `}
                            >
                            </textarea>

                            : <div className={`${styles.background} h-32 w-full text-white ${styles.rounded} flex pl-2 mt-2 overflow-y-scroll`} >
                                {description}
                            </div>

                        }

                        <div
                            className={`${styles.background} h-5/6 w-full text-white ${styles.rounded} flex pl-2 mt-2 `}
                        >
                            code
                        </div>

                    </div>
                </> :
                <div className="flex flex-col justify-center items-center  ">
                    <FaRegEyeSlash className="text-9xl mt-52 text-green-900" />
                    <h1 className="text-xl text-green-900">No snippets selected</h1>
                </div>
            }

        </ResizablePanel>

    )
}