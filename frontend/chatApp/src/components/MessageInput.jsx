import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { X, Image, Send } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
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
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const canSend = text.trim() || imagePreview;

  return (
    <div className="shrink-0 p-4 w-full border-t border-base-300 bg-base-100/80 backdrop-blur-md">
      {/* Image preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 animate-pop">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-xl border-2 border-primary/40 shadow-lg shadow-primary/10"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 size-6 rounded-full bg-error text-error-content
                flex items-center justify-center shadow-md
                hover:scale-110 hover:rotate-90 transition-all duration-300"
              type="button"
              aria-label="Remove image"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-full input-sm sm:input-md
              bg-base-200/60 transition-all duration-300
              focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-base-100"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            aria-label="Attach image"
            className={`hidden sm:flex btn btn-circle btn-ghost transition-all duration-300
              hover:scale-110 hover:-rotate-6
              ${imagePreview ? "text-success bg-success/10" : "text-base-content/50 hover:text-primary"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        <button
          type="submit"
          aria-label="Send message"
          disabled={!canSend}
          className={`group btn btn-circle border-0 transition-all duration-300
            ${
              canSend
                ? "bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg shadow-primary/30 hover:scale-110 active:scale-95"
                : "btn-disabled"
            }`}
        >
          <Send
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;