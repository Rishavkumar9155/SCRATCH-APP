import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../Redux/PasteSlice";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { gsap } from "gsap";

const Home = () => {
  const [Title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const mainContentRef = useRef(null);
  const titleInputRef = useRef(null);
  const contentAreaRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animate main content on mount
    gsap.fromTo(
      [ titleInputRef.current, contentAreaRef.current, buttonRef.current],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.2,
      }
    );
  }, []);

  function createPaste() {
    const paste = {
      title: Title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className="main h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500" >
      <div className="glass-container flex flex-col gap-6 p-8 h-[90vh] w-[95%] max-w-4xl bg-opacity-20 backdrop-blur-md shadow-2xl rounded-lg">
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-3">
          <input
            ref={titleInputRef}
            className="glass-input outline-none w-full uppercase md:w-[70%] bg-transparent text-white placeholder:text-white p-3 rounded-b-none focus:ring-0 border-b-2 border-white"
            type="text"
            placeholder="Enter Title Here"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            ref={buttonRef}
            onClick={createPaste}
            className="ripple-effect w-full md:w-[20%] text-black bg-slate-50 p-3 rounded hover:bg-gray-400 transition duration-300"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-4 h-full">
          <div className="flex h-[5%] w-full items-center justify-between border-2 border-gray-200 p-3">
            <div className="flex items-center gap-2 ">
              <div className="bg-red-500 h-4 w-4 rounded-full"></div>
              <div className="bg-green-500 h-4 w-4 rounded-full"></div>
              <div className="bg-blue-500 h-4 w-4 rounded-full"></div>
            </div>
            <div
              className="copy text-xl text-white cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(value);
                toast.success("Copied to Clipboard", {
                  position: "top-right",
                });
              }}
            >
              <FaRegCopy />
            </div>
          </div>
          <textarea
            ref={contentAreaRef}
            className="glass-input w-full h-[85%] p-4 rounded bg-transparent text-white placeholder:text-white border-[1px] border-white shadow-2xl resize-none focus:outline-none"
            value={value}
            placeholder="Enter Content"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
