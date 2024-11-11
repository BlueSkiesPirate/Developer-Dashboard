import styles from "../page.module.css"

export default function Test() {
    return (
        <>
            <form className={`w-64 bg-green-500 flex flex-col`}>
                <input className={`border px-8 py-2`} type="text" placeholder="Snippet Title" />
                <input className={`border px-8 py-2`} type="text" placeholder="description" />
                <button className={`border px-8 py-2 bg-green-500`}>Add Snippet</button>

            </form>

            <div
                className={`h-36 w-96 ${styles.background} ${styles.rounded} px-2 pt-2`}>
                <div className={`h-10 w-full ${styles.buttonDark} ${styles.rounded} text-white flex justify-center items-center`}>
                    Modal
                </div>
                <div className={`h-full w-full text-white p-2`}>
                    Description
                    <div className={` flex`}>
                        <div className={`bg-white text-black w-20 mr-2 cursor-pointer border`}>update</div>
                        <div className={`bg-white text-black w-20 mr-2 cursor-pointer border`}>delete</div>
                    </div>
                </div>

            </div>

        </>

    )
}
