import { MessageSquare, Sparkles, Users, Image } from "lucide-react";

const hints = [
  { icon: Users, label: "Pick a contact" },
  { icon: MessageSquare, label: "Send a message" },
  { icon: Image, label: "Share a photo" },
];

const NoChatSelected = () => {
  return (
    <div className="relative w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 overflow-hidden">
      {/* Floating background blobs */}
      <div className="animate-blob absolute top-10 left-10 size-56 rounded-full bg-primary/15 blur-3xl" />
      <div
        className="animate-blob absolute bottom-10 right-10 size-64 rounded-full bg-secondary/15 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />

      <div className="relative max-w-md text-center space-y-6">
        {/* Icon with ping rings */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <span className="animate-ring-ping absolute inset-0 rounded-2xl bg-primary/30" />
            <span
              className="animate-ring-ping absolute inset-0 rounded-2xl bg-primary/20"
              style={{ animationDelay: "1s" }}
            />
            <div className="animate-float relative size-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl shadow-primary/30">
              <MessageSquare className="size-9 text-primary-content" />
              <Sparkles className="absolute -top-2 -right-2 size-5 text-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <h2
          className="gradient-text text-3xl font-extrabold animate-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          Welcome to Chatty!
        </h2>
        <p
          className="text-base-content/60 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          Select a conversation from the sidebar to start chatting
        </p>

        {/* Hint chips */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {hints.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className="animate-fade-up flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
                bg-base-200 border border-base-300 text-base-content/70
                hover:border-primary/50 hover:text-primary hover:-translate-y-0.5
                transition-all duration-300 cursor-default"
              style={{ animationDelay: `${450 + i * 120}ms` }}
            >
              <Icon className="size-3.5" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;