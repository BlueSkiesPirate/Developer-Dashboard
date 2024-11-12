
import styles from "../page.module.css"
import DeleteBtn from "./deleteBtn"
import ViewBtn from "./viewBtn"

const getSnippets = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/snippets', { cache: "no-store" })
        if (!res.ok) {
            throw new Error('failed fetch snippets')
        }
        return res.json()
    } catch (error) {
        console.log("Error loading topics", error)
    }
}



export default async function Snippets() {

    const { snippets } = await getSnippets();



    return (
        <>
            {/* <form className={`w-64 bg-green-500 flex flex-col`}>
                <input className={`border px-8 py-2`} type="text" placeholder="Snippet Title" />
                <input className={`border px-8 py-2`} type="text" placeholder="description" />
                <button className={`border px-8 py-2 bg-green-500`}>Add Snippet</button>
            </form> */}

            {snippets.map((snippet) => (
                <div className={`h-36 w-full ${styles.background} ${styles.rounded} px-2 pt-2 mt-2`}>
                    <div className={`h-10 w-full ${styles.buttonDark} ${styles.rounded} text-white flex justify-center items-center px-2`}>
                        {snippet.title}
                        <ViewBtn id={snippet._id} />
                    </div>
                    <div className={`h-full w-full text-white p-2`}>
                        {snippet.description}
                        <div className={` flex`}>
                            <button className={`bg-white text-black w-20 mr-2 `}>update</button>
                            <DeleteBtn id={snippet._id} />

                        </div>
                    </div>
                </div >

            ))
            }
        </>

    )
}
