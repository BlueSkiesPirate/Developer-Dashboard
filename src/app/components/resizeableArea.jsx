"use client"
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
import { useEffect, useState } from "react";


export default function ResizeableArea() {
  const [viewData, setViewData] = useState({ title: "title", description: "description" })
  const [isViewingSnippet, setIsViewingSnippet] = useState(false)
  const [reloadSnippets, setReloadSnippets] = useState(false)
  const [length, setLength] = useState(0)//This is the length of the snippets array, whihc is used for the Results Btn

  const handleDataFromView = (data) => {
    setIsViewingSnippet(true)
    setViewData(data)
  }

  const stopViewingSnippet = () => {
    setIsViewingSnippet(false)
    setReloadSnippets(!reloadSnippets)
  }

  const reloadThroughUpdate = () => {
    setReloadSnippets(!reloadSnippets)
  }

  const handleLength = (data) => {
    setLength(data)
  }

  return (

    <ResizablePanelGroup direction="horizontal" >
      <ResizablePanel className={`${styles.scrollPanel} ${styles.rounded}`}>
        <div className={`h-16 w-full flex items-center pl-2`}>
          <div
            className={`${styles.background} text-white w-28 h-10 ${styles.rounded} flex justify-center items-center`}
          >
            <p className={`text-green-500`}>{length}</p> <pre> Results</pre>
          </div>
        </div>

        <div className={`h-full w-full px-2 pt-2  overflow-y-scroll`}>
          <Snippets onSendData={handleDataFromView} DoReload={reloadSnippets} length={handleLength} />

        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className={`${styles.background} w-2`} />
      <ViewSnippet snippetData={viewData} isViewingSnippet={isViewingSnippet} stopViewingSnippet={stopViewingSnippet} reloadThroughUpdate={reloadThroughUpdate} />
    </ResizablePanelGroup>
  );
}
