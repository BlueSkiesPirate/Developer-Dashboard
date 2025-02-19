"use client"

import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { FaUserCircle } from "react-icons/fa";

export default function TopNav() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/createSnippet');
  };


  return (
    <div className={`w-full h-22`}>
      {/**This is the container for the top Navs */}
      <div className={`w-full h-10  flex justify-between `}>
        {" "}
        {/**search bar container */}
        <div
          className={`w-full h-full ${styles.navbar} ${styles.rounded} flex items-center pl-2`}
        >
          <button onClick={handleNavigation} className={`${styles.rounded} w-24 h-5/6 bg-green-500 text-white flex justify-center items-center`}>
            create
          </button>

          <div
            className={` ${styles.buttonLight} w-1/3 h-8 ${styles.rounded}  ml-36 text-white flex pl-2 items-center`}
          >
            Search
          </div>
        </div>
        <div
          className={` ${styles.navbar} w-10 h-full  ml-2 ${styles.rounded} flex justify-center items-center`}
        >
          <FaUserCircle className="text-3xl text-white" />
        </div>
      </div>
      <div className={` ${styles.navbar} w-full h-10  mt-2 ${styles.rounded}`}>

        {/**search bar container */}
      </div>
    </div>
  );
}
