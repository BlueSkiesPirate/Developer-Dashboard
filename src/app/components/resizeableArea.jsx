import styles from "../page.module.css";
import Link from "next/link";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function ResizeableArea() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className={`${styles.scrollPanel} ${styles.rounded}`}>
        <div className={`h-16 w-full flex items-center pl-2`}>
          <div
            className={`${styles.background} text-white w-28 h-10 ${styles.rounded} flex justify-center items-center`}
          >
            <p className={`text-green-500`}>3 </p> <pre> Results</pre>
          </div>
        </div>

        <div className={`h-full w-full px-2 pt-2`}>
          {/**This is one of the cards */}
          <div
            className={`h-36 w-full ${styles.background} ${styles.rounded} px-2 pt-2`}
          >
            <div
              className={`h-10 w-full ${styles.buttonDark} ${styles.rounded} text-white flex justify-center items-center`}
            >
              Modal
            </div>
            <div className={`h-full w-full text-white p-2`}>Description</div>
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className={`${styles.background} w-2`} />
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
            <div
              className={`h-10 w-16 flex justify-center items-center ${styles.buttonDark} ${styles.rounded} ml-2 text-white`}
            >
              tools
            </div>
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
    </ResizablePanelGroup>
  );
}
