import LeftNav from "./components/leftNav";
import TopNav from "./components/TopNav";
import ResizeableArea from "./components/resizeableArea";

import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.background} w-screen h-screen py-2 flex`}>
      <LeftNav />

      <div className={`w-full flex flex-col px-2 `}>
        <TopNav />
        <div className={`h-full w-full mt-2`}>
          {/**This is the container for the resizable sections */}
          <ResizeableArea />
        </div>
      </div>
    </div>
  );
}
