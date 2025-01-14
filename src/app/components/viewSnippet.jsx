import { ResizablePanel } from "@/components/ui/resizable"
import styles from "../page.module.css"
import ToolMenu from "./toolsMenu";
import { useState, useEffect } from "react";
import { updateSnippet } from "@/lib/api";
import { FaCode, FaRegEyeSlash } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import moment from "moment";

export default function ViewSnippet({ snippetData, isViewingSnippet, stopViewingSnippet, reloadThroughUpdate }) {

    const [edittingSnippet, setEdittingSnippet] = useState(false);
    const [title, SetTitle] = useState(snippetData.title)
    const [description, SetDescription] = useState(snippetData.description)
    const [tempTitle, setTempTitle] = useState(snippetData.title)
    const [tempDescription, setTempDescription] = useState(snippetData.description)
    const [tags, setTags] = useState(snippetData.tags || [])
    const [tempTags, setTempTags] = useState(snippetData.tags || [])
    const [files, setFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [codeContent, setCodeContent] = useState("")
    const [lastEdit, setLastEdit] = useState(new Date())

    const [viewTags, setViewTags] = useState(false)

    const id = snippetData._id;

    console.log("files:", files)

    useEffect(() => {
        SetTitle(snippetData.title);
        SetDescription(snippetData.description);
        setTempTitle(snippetData.title);
        setTempDescription(snippetData.description);
        setTags(snippetData.tags || [])
        setTempTags(snippetData.tags || [])
        setFiles(snippetData.code || [])

        const date = moment(snippetData.updatedAt).fromNow();
        setLastEdit(date)



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
        setTags(tempTags)

        update()

    }

    useEffect(() => {
        reloadThroughUpdate()
    }, [title])

    const update = async () => {

        const serializedFiles = files.map((file) => ({
            title: file.title,
            lastmodified: file.lastmodified || new Date().toISOString(), // Default to now if not set
            codeSection: file.codeSection,
        }));

        await updateSnippet(id, { title: tempTitle, description: tempDescription, tags: tempTags, code: serializedFiles })

    }

    const handleViewTagsContainer = () => {
        setViewTags(!viewTags)
    }

    const handleCreateTag = (tag) => {
        setTempTags((prevTags) => {
            if (!prevTags.includes(tag)) {

                return [...prevTags, tag]
            }
            return prevTags
        })
    }

    const handleRemoveTag = (tag) => {
        setTempTags((prevTags) => prevTags.filter((t) => t !== tag))
        console.log(tempTags)

    }

    useEffect(() => {
        const handleDocumentChange = () => {
            setSelectedFile(null)
        }
        handleDocumentChange()
    }, [snippetData])


    /** This is the section for controlling the files */
    const handleCreateFile = () => {
        const fileName = prompt("Enter file name:")
        if (fileName) {
            setFiles((prev) => [...prev, { title: fileName, codeSection: "" }])
        }
    };

    const handleFileClick = (file) => {
        setSelectedFile(file.title)
        setCodeContent(file.codeSection)
    }

    const handleCodeChange = (e) => {
        const updatedCode = e.target.value;
        setCodeContent(updatedCode);

        setFiles((prevFiles) =>
            prevFiles.map((file) =>
                file.title === selectedFile
                    ? { ...file, codeSection: updatedCode }
                    : file
            )
        );
    };

    const handleRemoveFile = (fileToRemove) => {
        const confirmRemove = confirm(`Are you sure you want to delete "${fileToRemove.title}"?`);
        if (confirmRemove) {
            setFiles((prevFiles) => prevFiles.filter((file) => file.title !== fileToRemove.title));

            // Clear code editor if the removed file is the currently selected file
            if (selectedFile === fileToRemove.title) {
                setSelectedFile(null);
                setCodeContent("");
            }
        }
    };


    return (
        <ResizablePanel className={`${styles.scrollPanel} ${styles.rounded} p-2 h-full `}>
            {isViewingSnippet ?
                <>
                    <div className="flex justify-between">
                        <div
                            className={`h-10 w-3/4 ${styles.background} ${styles.rounded} flex`}
                        >

                            {edittingSnippet ?

                                <div
                                    className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center ${styles.rounded} relative mr-2`}>

                                    <IoIosAddCircle onClick={() => handleViewTagsContainer()} className={`w-5 text-green-600 hover:text-green-700  text-2xl cursor-pointer `} />

                                    {viewTags ?


                                        <div className="static w-80 h-96 right-24 top-2 mt-auto">
                                            <div onClick={() => handleViewTagsContainer()} className="h-10 w-full bg-red-500 flex justify-center items-center rounded-t-xl cursor-pointer hover:bg-red-600 text-2xl">x</div>
                                            <div className="h-full w-full bg-slate-600 rounded-b-xl p-2 flex flex-wrap items-start justify-evenly gap-0">

                                                {["react", "Mongo", "CSS", "Router", "Auth", "Firebase"].map((tag) => (
                                                    <div
                                                        key={tag}
                                                        onClick={() => {
                                                            if (tempTags.includes(tag)) {
                                                                handleRemoveTag(tag);
                                                            } else {
                                                                handleCreateTag(tag);
                                                            }
                                                        }}
                                                        className={`border-2 rounded w-20 h-10 flex justify-center items-center text-black hover:bg-green-300 hover:border-green-600 hover:border-4 cursor-pointer ${tempTags.includes(tag) ? "bg-green-500" : "bg-slate-200"}`}
                                                    >
                                                        {tag}
                                                    </div>))}
                                            </div>
                                        </div>

                                        : ""
                                    }
                                </div>
                                :
                                <div
                                    className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center ${styles.rounded} `}
                                >
                                    tags +
                                </div>}


                            {tempTags.map((tag, index) => (
                                <div
                                    key={index} onClick={() => {

                                        if (edittingSnippet) {
                                            handleRemoveTag(tag)
                                        }
                                    }}
                                    className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center cursor-pointer ${styles.rounded} ml-2  ${edittingSnippet ? "hover:bg-red-500" : ""}`}
                                >
                                    {tag}
                                </div>
                            ))}

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
                                className={`${styles.background} h-10 w-80 text-white ml-2 ${styles.rounded} flex pl-2 items-center justify-between`}
                            >
                                <p >Last edit </p>
                                <div
                                    className={`h-full w-32 flex justify-center items-center ${styles.buttonDark} ${styles.rounded}`}
                                >
                                    {lastEdit}
                                    {/* 1 day ago */}
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


                        {/* <div
                            className={`${styles.background} h-5/6 w-full text-white ${styles.rounded} flex pl-2 mt-2 `}
                        >
                            code
                        </div> */}

                        <div className="mt-2 bg-slate-800 rounded-t-xl h-10 flex items-center">
                            <div className=" bg-slate-900 w-20 h-full text-white flex justify-around items-center rounded-t-xl">
                                Files <IoIosAddCircle onClick={handleCreateFile} className="w-5 text-green-600 text-2xl cursor-pointer" />
                            </div>

                            <div className=" w-full h-full pt-2 flex">

                                {files.map((file, index) => (

                                    <div key={index} className={` flex justify-center items-center  border-r-2  pr-2 ${selectedFile === file.title ? "bg-green-600 hover:bg-green-400" : "bg-slate-500 hover:bg-slate-400"}`}>

                                        <div

                                            onClick={() => handleFileClick(file)}
                                            className={` w-fit h-full flex justify-start items-center pl-1  cursor-pointer `}>
                                            {file.title}

                                        </div>
                                        <MdOutlineCancel onClick={() => handleRemoveFile(file)} className="ml-2 text-red-900 text-xl cursor-pointer " />
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="h-4/6">




                            {selectedFile ?
                                <textarea
                                    type="text"
                                    placeholder="code"
                                    value={codeContent}
                                    required={true}
                                    onChange={handleCodeChange}
                                    className={`${styles.background} h-full w-full text-white rounded-b-xl flex pl-2 resize-none`}
                                >

                                </textarea>

                                :

                                <div className={`${styles.background} h-full w-full text-slate-700 rounded-b-xl flex justify-center items-start resize-none pt-5 text-3xl`}>
                                    {`Please select a file :${`)`}`}
                                    <div className="absolute top-2/3 right-1/3  ">
                                        <FaCode className=" text-slate-900 text-9xl " />
                                    </div>
                                </div>

                            }

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