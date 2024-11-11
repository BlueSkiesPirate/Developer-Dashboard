export default function AddSnippet() {
    return (

        <form className={`w-64 bg-green-500 flex flex-col`}>
            <input className={`border px-8 py-2`} type="text" placeholder="Snippet Title" />
            <input className={`border px-8 py-2`} type="text" placeholder="description" />
            <button className={`border px-8 py-2 bg-green-500`}>Add Snippet</button>

        </form>



    )
}
