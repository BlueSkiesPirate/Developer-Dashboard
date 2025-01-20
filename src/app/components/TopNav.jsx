"use client"

import { useRouter } from "next/navigation";
import styles from "../page.module.css";
import { FaUserCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";

import { logout } from "@/lib/actions/auth";

import { useState } from "react";
import Image from "next/image";



export default function TopNav({ session }) {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('dashboard/createSnippet');
  };

  const [isUserMenuSelected, setIsUserMenuSelected] = useState(false)


  const handleUserMenuSelected = () => {
    setIsUserMenuSelected(!isUserMenuSelected)
  }
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
          {session?.user && session.user.image ? (<Image onClick={handleUserMenuSelected} className={"rounded-full"} src={session?.user?.image} width={30} height={30} alt="user" />) : (<FaUserCircle onClick={handleUserMenuSelected} className="text-3xl text-white" />)}


          {isUserMenuSelected ? (

            <div className="absolute w-24 bg-slate-800 h-32 top-8 right-5 flex flex-col justify-center items-center">
              <div onClick={handleUserMenuSelected} className=" hover:bg-slate-700 w-full flex justify-center items-center cursor-pointer shadow-md"><AiFillCloseCircle className="text-red-600 mb-2 mt-1 text-xl " /></div>


              <div className="text-white mt-1 hover:bg-slate-700 w-full flex justify-center items-center cursor-pointer ">trash</div>
              <div className="text-white hover:bg-slate-700 w-full flex justify-center items-center cursor-pointer ">settings</div>
              <div onClick={() => logout()} className="text-red-500 mt-2 hover:bg-slate-700 w-full flex justify-center items-center cursor-pointer ">sign out</div>
            </div >
          ) : ("")}

        </div >
      </div >
      <div className={` ${styles.navbar} w-full h-10  mt-2 ${styles.rounded}`}>

        {/**search bar container */}
      </div>
    </div >
  );
}
