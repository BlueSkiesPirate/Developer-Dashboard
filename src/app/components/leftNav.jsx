import styles from "../page.module.css"
import { auth } from "@/auth"

export default async function LeftNav() {

    const session = await auth()
    console.log(session)

    return (
        <>
            <div className={`${styles.navbar} w-56 h-full rounded-r-lg`}>
            </div>
        </>
    )
}