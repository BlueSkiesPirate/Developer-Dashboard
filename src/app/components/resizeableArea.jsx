
import styles from "../page.module.css";
import uStyles from "./resizeableArea.module.css"
import Link from "next/link";
import Snippets from "./Snippets";
import ViewSnippet from "./viewSnippet";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
// import { useState } from "react";

export default function ResizeableArea() {

  // const [displayedSnippet, setDisplayedSnippet] = useState(null)
  // const handleDisplayedSnippet = () => {
  //   setDisplayedSnippet(id)
  // }

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
          <Snippets />

        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className={`${styles.background} w-2`} />
      <ViewSnippet />
    </ResizablePanelGroup>
  );
}
