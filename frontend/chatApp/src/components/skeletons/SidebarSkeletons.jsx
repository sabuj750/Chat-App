import React from "react";
import { Users } from "lucide-react";

const SidebarSkeletons = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-300 bg-base-100">
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2.5 justify-center lg:justify-start">
          <div className="size-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 ring-1 ring-primary/30 flex items-center justify-center">
            <Users className="size-5 text-primary" />
          </div>
          <span className="font-semibold hidden lg:block">Contacts</span>
        </div>

        {/* search + filter placeholders */}
        <div className="hidden lg:block mt-4 space-y-3">
          <div className="skeleton h-9 w-full rounded-full" />
          <div className="skeleton h-4 w-40 rounded-full" />
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3 thin-scroll">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="animate-fade-in-left w-full px-4 py-3 flex items-center gap-3"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 rounded-full" />
              <div className="skeleton h-3 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeletons;