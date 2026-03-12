import { X, Image, Send } from "lucide-react";
import React, { useRef, useState } from "react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {};
  const removeImage = () => {};
  const handleSendMessage = (e) => {};

  return (
    <div className="p-4 w-full bg-base-300">
      {/* image preview */}
      {imagePreview && (
        <div className="flex">
          {/* image container */}
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
          </div>

          {/* close btn container */}
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
          >
            <X className="size-3" />
          </button>
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
            className={` hidden sm:flex btn-circle ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
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
