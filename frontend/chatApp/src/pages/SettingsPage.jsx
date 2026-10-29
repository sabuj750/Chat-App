import React from "react";

import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { Send, Check, Palette } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hello, how are you?", isSent: false },
  { id: 2, content: "I'm good, thanks! How about you?", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen container mx-auto px-4 pt-24 pb-12 max-w-5xl">
      <div className="space-y-8">
        {/* Heading */}
        <div className="flex items-center gap-4 animate-fade-up">
          <div className="size-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/30">
            <Palette className="size-6 text-primary-content" />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Theme</h2>
            <p className="text-sm text-base-content/60">
              Choose a theme for your chat interface
            </p>
          </div>
        </div>

        {/* Theme grid */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-3">
          {THEMES.map((t, i) => {
            const isActive = theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{ animationDelay: `${Math.min(i, 20) * 25}ms` }}
                className={`animate-pop group relative flex flex-col items-center gap-2 p-2.5 rounded-2xl border transition-all duration-300
                  hover:-translate-y-1 hover:shadow-lg
                  ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                      : "border-base-300 hover:border-primary/40 hover:bg-base-200/60"
                  }`}
              >
                <div
                  className="relative h-10 w-full rounded-xl overflow-hidden ring-1 ring-base-content/10"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5 bg-base-100">
                    <div className="rounded bg-primary" />
                    <div className="rounded bg-secondary" />
                    <div className="rounded bg-accent" />
                    <div className="rounded bg-neutral" />
                  </div>
                </div>
                <span className="text-[11px] font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>

                {isActive && (
                  <span className="animate-pop absolute -top-1.5 -right-1.5 size-5 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-md">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Preview</h3>
          <div className="rounded-3xl border border-base-300 overflow-hidden bg-base-100 shadow-2xl shadow-primary/5">
            <div className="p-6 bg-base-200">
              <div className="max-w-lg mx-auto">
                {/* Mock Chat UI */}
                <div className="bg-base-100 rounded-2xl shadow-lg overflow-hidden border border-base-300">
                  {/* Chat Header */}
                  <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="size-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-medium">
                          J
                        </div>
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-success ring-2 ring-base-100" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">John Doe</h3>
                        <p className="text-xs text-success">Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100 thin-scroll">
                    {PREVIEW_MESSAGES.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-2xl p-3 shadow-sm transition-all duration-500
                            ${
                              message.isSent
                                ? "bg-gradient-to-br from-primary to-secondary text-primary-content rounded-br-md"
                                : "bg-base-200 rounded-bl-md"
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-[10px] mt-1.5 ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }`}
                          >
                            12:00 PM
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-10 rounded-full bg-base-200/60"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-circle btn-sm h-10 w-10 min-h-0 border-0 bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg shadow-primary/30">
                        <Send size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;