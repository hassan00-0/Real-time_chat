import { X, Image, Send } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      return toast.error("Please select an image file");
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items || items.length === 0) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        e.preventDefault();
        const file = items[i].getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        }
      }
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });
      // clear the form
      setText("");
      setImagePreview(null);
    } catch (error) {
      console.log("failed to send message ", error);
    }
  };

  return (
    <div className="p-4 w-full bg-base-300">
      {/* image preview */}
      {imagePreview && (
        <div className="flex mb-3 items-center gap-2">
          {/* image container */}
          <div className="relative size-20">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />

            {/* close btn container */}
            <button
              type="button"
              onClick={removeImage}
              className="cursor-pointer absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center border border-base-100 shadow-sm"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* handle sumbit form */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          {/* text */}
          <input
            type="text"
            className="input input-bordered w-full rounded-lg "
            value={text}
            onChange={(e) => setText(e.target.value)}
            onPaste={handlePaste}
          />
          {/* image input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`cursor-pointer hidden sm:flex btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={23} />
          </button>

          {/* send input */}
          <button
            type="submit"
            className={`flex items-center justify-center transition-colors
    ${
      text.trim() || imagePreview
        ? "text-primary cursor-pointer hover:opacity-80"
        : "text-primary/40 "
    }`}
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={23} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
