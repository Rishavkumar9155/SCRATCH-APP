import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaRegCopy } from "react-icons/fa";

const ViewPaste = () => {
  const { id } = useParams();
  console.log("ViewPaste ID:", id); // Check the ID from URL

  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id); // Find paste by ID

  console.log("Found Paste:", paste); // Check the found paste

  if (!paste) {
    return <div className="text-red-500 text-center">Paste not found!</div>; // Handle case where paste is not found
  }

  return (
    <div className="main h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
      <div className="glass-container flex flex-col gap-6 p-8 h-[90vh] w-[95%] max-w-4xl bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-lg">
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="glass-input w-full bg-transparent text-white placeholder:text-white p-3 rounded focus:ring-2 focus:ring-white transition-all"
        />
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            {/* Circle and Copy button */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              <button
                className={`flex justify-center items-center transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(paste.content);
                  toast.success("Copied to Clipboard");
                }}
              >
                <span className="group-hover:text-success-500 text-2xl">  <FaRegCopy /></span>
              </button>
            </div>
          </div>

          {/* TextArea */}
          <textarea
            value={paste.content}
            disabled
            placeholder="Write Your Content Here...."
            className="glass-input w-full h-[85%] p-4 rounded bg-transparent text-white shadow-2xl resize-none focus:outline-none"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
