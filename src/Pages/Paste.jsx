import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/PasteSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEdit, FaRegEye, FaRegCopy } from "react-icons/fa";
import { MdOutlineShare, MdDeleteOutline } from "react-icons/md";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
    toast.success("Paste deleted successfully");
  };

  const handleShare = (paste) => {
    navigator
      .share({
        title: paste.title,
        text: paste.content,
        url: window.location.href,
      })
      .catch((err) => {
        toast.error("Share failed. Please try again.");
      });
    toast.success("Shared successfully");
  };

  return (
    <div className="main bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="card2 text-white flex items-center justify-center rounded-2xl flex-col p-5  w-[90%] shadow-lg">
        <input
          type="search"
          className=" w-[80%] p-3 mb-5 rounded-md border border-gray-700 shadow-md focus:outline-none focus:ring focus:ring-blue-500"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col gap-5 w-full overflow-y-auto h-[70vh] card2 text-black p-4 rounded-lg">
          {filterData.length > 0 ? (
            filterData.map((paste) => (
              <div
                key={paste._id}
                className="bg-white bg-opacity-20 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
              >
                <div className="flex justify-between items-start text-black">
                  <div className="title font-bold text-xl">{paste.title}</div>
                  <div className="flex gap-2">
                    <Link to={`/?pasteId=${paste?._id}`}>
                      <button className="text-black text-xl py-1 px-2 rounded hover:bg-gray-400 transition duration-300">
                        <FaRegEdit />
                      </button>
                    </Link>
                    <Link to={`/pastes/${paste._id}`}>
                      <button className="text-xl text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-300">
                        <FaRegEye />
                      </button>
                    </Link>
                    <button
                      className="text-xl text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-300"
                      onClick={() => handleShare(paste)}
                    >
                      <MdOutlineShare />
                    </button>
                    <button
                      className="text-xl text-black py-1 px-2 rounded hover:bg-gray-400 transition duration-300"
                      onClick={() => {
                        navigator.clipboard.writeText(paste.content);
                        toast.success("Copied to clipboard");
                      }}
                    >
                      <FaRegCopy />
                    </button>
                    <button
                      className="hover:bg-gray-400 text-xl text-black py-1 px-2 rounded transition duration-300"
                      onClick={() => handleDelete(paste._id)}
                    >
                      <MdDeleteOutline />
                    </button>
                  </div>
                </div>
                <div className="content  mt-4 text-black">{paste.content}</div>
                <div className="date text-black text-sm mt-2">
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-lg text-center">
              No pastes found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;
