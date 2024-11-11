import styles from "../page.module.css";

export default function TopNav() {
  return (
    <div className={`w-full h-22`}>
      {/**This is the container for the top Navs */}
      <div className={`w-full h-10  flex justify-between `}>
        {" "}
        {/**search bar container */}
        <div
          className={`w-full h-full ${styles.navbar} ${styles.rounded} flex items-center pl-2`}
        >
          <div
            className={`${styles.rounded} w-24 h-5/6 bg-green-500 text-white flex justify-center items-center`}
          >
            create
          </div>
          <div
            className={` ${styles.buttonLight} w-1/3 h-8 ${styles.rounded}  ml-36 text-white flex pl-2 items-center`}
          >
            Search
          </div>
        </div>
        <div
          className={` ${styles.navbar} w-10 h-full  ml-2 ${styles.rounded} `}
        ></div>
      </div>
      <div className={` ${styles.navbar} w-full h-10  mt-2 ${styles.rounded}`}>
        {" "}
        {/**search bar container */}
      </div>
    </div>
  );
}
