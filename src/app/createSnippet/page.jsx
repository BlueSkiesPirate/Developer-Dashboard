"use client"
import { useState } from "react"
import { createSnippet } from "@/lib/api";
import { useRouter } from "next/navigation";
import styles from "../page.module.css"
import { IoIosAddCircle } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { MdOutlineCancel } from "react-icons/md";

export default function AddSnippet() {
    const router = useRouter()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([])
    const [files, setFiles] = useState([])
    const [selectedFile, setSelectedFile] = useState(null)
    const [codeContent, setCodeContent] = useState("")
    const [viewTags, setViewTags] = useState(false)

    const handleViewTagsContainer = () => {
        setViewTags(!viewTags)
    }

    const handleCreateTag = (tag) => {
        console.log(tag)
        setTags((prevTags) => {
            if (!prevTags.includes(tag)) {

                return [...prevTags, tag]
            }
            return prevTags
        })
    }

    const handleRemoveTag = (tag) => {
        setTags((prevTags) => prevTags.filter((t) => t !== tag))
        console.log(tags)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serializedFiles = files.map((file) => ({
            title: file.title,
            lastmodified: file.lastmodified || new Date().toISOString(), // Default to now if not set
            codeSection: file.codeSection,
        }));

        console.log(title, description, tags, serializedFiles)
        await createSnippet({ title, description, tags, code: serializedFiles });
        alert("Snippet created!");
        const mainPage = '/'
        router.push(mainPage)
    };


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

        <div className="w-full h-screen bg-slate-800 flex justify-center overflow-hidden ">
            <div className="h-full w-1/2 bg-slate-700 px-5">



                <div className="flex justify-between mt-5">
                    <div
                        className={`h-10 w-3/4 ${styles.background} ${styles.rounded} flex`}
                    >
                        <div
                            className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center ${styles.rounded} relative`}
                        >
                            tags <IoIosAddCircle onClick={() => handleViewTagsContainer()} className={`w-5 ${viewTags ? "text-red-600" : "text-green-600"}  text-2xl cursor-pointer ml-2`} />


                            {viewTags ?


                                <div className="absolute  w-80 h-96 right-24 top-2">
                                    <div className="h-10 w-full bg-red-500 flex justify-center items-center rounded-t-xl">tags</div>
                                    <div className="h-full w-full bg-slate-600 rounded-b-xl p-2 flex flex-wrap items-start justify-evenly gap-0">

                                        {["react", "Mongo", "CSS", "Router", "Auth", "Firebase"].map((tag) => (
                                            <div
                                                key={tag}
                                                onClick={() => {
                                                    if (tags.includes(tag)) {
                                                        handleRemoveTag(tag);
                                                    } else {
                                                        handleCreateTag(tag);
                                                    }
                                                }}
                                                className={`border-2 rounded w-20 h-10 flex justify-center items-center text-black hover:bg-green-300 hover:border-green-600 hover:border-4 cursor-pointer ${tags.includes(tag) ? "bg-green-500" : "bg-slate-200"}`}
                                            >
                                                {tag}
                                            </div>))}
                                    </div>
                                </div>

                                : ""
                            }



                        </div>

                        {tags.map((tag, index) => (
                            <div key={index} onClick={() => handleRemoveTag(tag)}
                                className={`w-20 h-full ${styles.buttonDark} text-white flex justify-center items-center ${styles.rounded} ml-2 cursor-pointer hover:bg-red-700 `}>
                                {tag}
                            </div>
                        ))};

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


                        <div className="mt-2 bg-slate-800 rounded-t-xl h-10 flex items-center">
                            <div className=" bg-slate-900 w-20 h-full text-white flex justify-around items-center rounded-t-xl">
                                Files <IoIosAddCircle onClick={handleCreateFile} className="w-5 text-green-600 text-2xl cursor-pointer" />
                            </div>

                            <div className=" w-full h-full pt-2 flex"> {/**This is where the files will be shown */}

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

                            <div className="absolute top-2/3 right-1/3  ">
                                <FaCode className=" text-slate-900 text-9xl " />
                            </div>


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
                                    {`Please select a file before writting code :${`)`}`}
                                </div>

                            }  {/**the : is very important don't delete*/}



                        </div>
                        <div className="w-full flex justify-center mt-2 ">
                            <button type="submit" className={`border px-8 py-2 bg-green-500`}>create Snippet</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}


