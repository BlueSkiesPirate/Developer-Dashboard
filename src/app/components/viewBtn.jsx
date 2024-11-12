"use client"



export default function ViewBtn({ id }) {
    const addToView = () => {
        console.log(id)
    }

    return (
        <div onClick={addToView} className={`ml-auto cursor-pointer`}>view</div>
    )
}