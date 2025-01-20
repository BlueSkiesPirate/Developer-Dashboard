"use server"

import LeftNav from "../components/leftNav";
import TopNav from "../components/TopNav";
import ResizeableArea from "../components/resizeableArea";

import styles from "../page.module.css";

import { auth } from "@/auth";

export default async function Home() {

  const session = await auth();

  return (
    <div className={`${styles.background} w-screen h-screen py-2 flex`}>
      <LeftNav />

      <div className={`w-full flex flex-col px-2 `}>
        <TopNav session={session} />
        <div className={`h-full w-full mt-2 overflow-hidden`}>
          <ResizeableArea />
        </div>
      </div>
    </div>
  );
}
