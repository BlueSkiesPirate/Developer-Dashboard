import styles from "../page.module.css"
import AddSnippet from "../addSnippet/page"
export default function LeftNav() {
    return (
        <>
            <div className={`${styles.navbar} w-56 h-full rounded-r-lg`}>
                <AddSnippet />
            </div>
        </>
    )
}