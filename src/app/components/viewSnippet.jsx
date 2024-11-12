import { ResizablePanel } from "@/components/ui/resizable"
import styles from "../page.module.css"
import ToolMenu from "./toolsMenu";

export default function ViewSnippet({ id }) {
    // const { id } = params;
    // console.log(id)
    return (
        <ResizablePanel
            className={`${styles.scrollPanel} ${styles.rounded} p-2 h-full `}
        >
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

            <div
                className={`h-full
           pb-52`}
            >
                <div className={`flex mt-2 `}>
                    <div
                        className={`${styles.background} h-10 w-full text-white ${styles.rounded} flex pl-2 items-center`}
                    >
                        Modal
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
                    <ToolMenu />
                </div>
                <div
                    className={`${styles.background} h-32 w-full text-white ${styles.rounded} flex pl-2 mt-2`}
                >
                    Descriptiton
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