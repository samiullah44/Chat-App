import { useState } from "react";
import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Check, ChevronDown, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
  { id: 3, content: "That sounds awesome! 🚀", isSent: false },
];

const SettingPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [previewMessages, setPreviewMessages] = useState(PREVIEW_MESSAGES);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const sentMessage = {
      id: previewMessages.length + 1,
      content: newMessage,
      isSent: true,
    };

    setPreviewMessages([...previewMessages, sentMessage]);
    setNewMessage("");

    // Simulate reply
    setTimeout(() => {
      const replyMessage = {
        id: previewMessages.length + 2,
        content: "Thanks for your message! This is a theme preview.",
        isSent: false,
      };
      setPreviewMessages((prev) => [...prev, replyMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-6 pt-16 max-w-7xl">
      {/* Header */}
      <div className="text-center space-y-1 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          Customize Your Chat
        </h2>
        <p className="text-sm text-base-content/70">
          Pick a theme you love and preview how your chat will look
        </p>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Theme Selector */}
        <div>
          {/* Mobile Dropdown */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
              className="flex items-center justify-between w-full p-4 rounded-lg bg-base-200 shadow-sm border border-base-300"
            >
              <div className="flex items-center gap-2">
                <Palette size={18} />
                <span className="font-medium">Select Theme</span>
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform ${
                  isThemeSelectorOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isThemeSelectorOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-base-200 rounded-lg border border-base-300">
                    <h3 className="text-lg font-semibold mb-3">Choose Theme</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {THEMES.map((t) => (
                        <motion.button
                          key={t}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className={`relative group flex flex-col items-center gap-2 p-3 rounded-xl border shadow-sm cursor-pointer transition-all
                            ${
                              theme === t
                                ? "border-primary ring-2 ring-primary/30"
                                : "border-base-300 hover:border-base-200"
                            }`}
                          onClick={() => setTheme(t)}
                        >
                          <div
                            className="relative h-10 w-full rounded-md overflow-hidden shadow-inner"
                            data-theme={t}
                          >
                            <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                              <div className="rounded bg-primary"></div>
                              <div className="rounded bg-secondary"></div>
                              <div className="rounded bg-accent"></div>
                              <div className="rounded bg-neutral"></div>
                            </div>
                          </div>
                          <span className="text-xs font-medium truncate w-full text-center">
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                          </span>
                          {theme === t && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute top-2 right-2 bg-primary text-primary-content p-1 rounded-full shadow-md"
                            >
                              <Check size={14} />
                            </motion.div>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Themes */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-3">Choose Theme</h3>
            <div className="grid grid-cols-2 gap-3">
              {THEMES.map((t) => (
                <motion.button
                  key={t}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative group flex flex-col items-center gap-2 p-3 rounded-xl border shadow-sm cursor-pointer transition-all
                    ${
                      theme === t
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-base-300 hover:border-base-200"
                    }`}
                  onClick={() => setTheme(t)}
                >
                  <div
                    className="relative h-10 w-full rounded-md overflow-hidden shadow-inner"
                    data-theme={t}
                  >
                    <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                      <div className="rounded bg-primary"></div>
                      <div className="rounded bg-secondary"></div>
                      <div className="rounded bg-accent"></div>
                      <div className="rounded bg-neutral"></div>
                    </div>
                  </div>
                  <span className="text-xs font-medium truncate w-full text-center">
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                  {theme === t && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 bg-primary text-primary-content p-1 rounded-full shadow-md"
                    >
                      <Check size={14} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Chat Preview (Sticky on desktop) */}
        <div className="relative">
          <div className="lg:sticky lg:top-4">
            <h3 className="text-lg font-semibold mb-3">Live Preview</h3>
            <motion.div
              key={theme}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-xl"
              data-theme={theme}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-base-300 bg-base-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                  J
                </div>
                <div>
                  <h3 className="font-medium text-sm">John Doe</h3>
                  <p className="text-xs text-base-content/70">Online</p>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-4 min-h-[300px] max-h-[300px] overflow-y-auto bg-base-100">
                {previewMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isSent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`max-w-[75%] rounded-2xl p-3 shadow-md text-sm leading-snug
                        ${
                          message.isSent
                            ? "bg-primary text-primary-content rounded-br-none"
                            : "bg-base-200 rounded-bl-none"
                        }`}
                    >
                      <p>{message.content}</p>
                      <p
                        className={`text-[10px] mt-1.5 text-right ${
                          message.isSent
                            ? "text-primary-content/70"
                            : "text-base-content/70"
                        }`}
                      >
                        12:00 PM
                      </p>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-base-300 bg-base-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="input input-bordered flex-1 text-sm h-10 rounded-full"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                  />
                  <button
                    className="btn btn-primary h-10 min-h-0 px-4 rounded-full"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-base-content/70 mt-2 text-center">
                  Type a message to test this theme
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
