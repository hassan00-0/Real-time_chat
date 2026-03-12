import { X } from "lucide-react";
import React, { useRef, useState } from "react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const filInput = useRef(null);

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
    </div>
  );
};

export default MessageInput;
