import { useState } from "react";

const Switch = ({ onToggle }) => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-5";
  return (
    <>
      <div
        className="md:w-14 md:h-7 w-12 h-6 flex transform duration-500 items-center bg-darkGray dark:bg-purple rounded-full p-1 cursor-pointer "
        onClick={() => {
          setToggle(!toggle);
          onToggle()
        }}
      >
        {/* Switch */}
        <div
          className={
            "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform duration-300 ease-in-out" +
            (toggle ? null : toggleClass)
          }
        ></div>
      </div>
    </>
  );
}

export default Switch