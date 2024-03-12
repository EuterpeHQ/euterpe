import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Transition from "@/lib/Transition";

function DropdownNotifications({ align }: { align: "left" | "right" }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: any }) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!dropdownOpen || event.key !== "Escape") return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-card/65 dark:hover:bg-card ${dropdownOpen && "bg-slate-200"}`}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Notifications</span>
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-current text-slate-500 dark:text-muted-foreground"
            d="M6.5 0C2.91 0 0 2.462 0 5.5c0 1.075.37 2.074 1 2.922V12l2.699-1.542A7.454 7.454 0 006.5 11c3.59 0 6.5-2.462 6.5-5.5S10.09 0 6.5 0z"
          />
          <path
            className="fill-current text-muted-foreground "
            d="M16 9.5c0-.987-.429-1.897-1.147-2.639C14.124 10.348 10.66 13 6.5 13c-.103 0-.202-.018-.305-.021C7.231 13.617 8.556 14 10 14c.449 0 .886-.04 1.307-.11L15 16v-4h-.012C15.627 11.285 16 10.425 16 9.5z"
          />
        </svg>
        <div className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-primary dark:border-[#182235]"></div>
      </button>

      {/* @ts-expect-error */}
      <Transition
        className={`dark:bg-surface absolute top-full z-10 -mr-48 mt-1 min-w-80 origin-top-right overflow-hidden rounded border border-slate-200 bg-white py-1.5 shadow-lg dark:border-card/65 sm:mr-0 ${align === "right" ? "right-0" : "left-0"}`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="px-4 pb-2 pt-1.5 text-xs font-semibold uppercase text-muted-foreground ">
            Notifications
          </div>
          <ul className="text-white/80">
            <li className="border-b border-slate-200 last:border-0 dark:border-card/65">
              <Link
                className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-card/65"
                href="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mb-2 block text-sm">
                  🤝{" "}
                  <span className="font-medium ">
                    Your Harmony received a new investment just now.
                  </span>
                </span>
                <span className="block text-xs font-medium text-muted-foreground ">
                  Feb 12, 2024
                </span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0 dark:border-card/65">
              <Link
                className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-card/65"
                href="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mb-2 block text-sm">
                  🚀{" "}
                  <span className="font-medium ">You have 500 new fans!</span>{" "}
                  As your audience grows, so does the value of your tokens.
                </span>
                <span className="block text-xs font-medium text-muted-foreground ">
                  Feb 9, 2024
                </span>
              </Link>
            </li>
            <li className="border-b border-slate-200 last:border-0 dark:border-card/65">
              <Link
                className="block px-4 py-2 hover:bg-slate-50 dark:hover:bg-card/65"
                href="#0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="mb-2 block text-sm">
                  ⚡️
                  <span className="font-medium ">
                    Your Token Launch is Live!
                  </span>{" "}
                  Track its performance and attract investors.
                </span>
                <span className="block text-xs font-medium text-muted-foreground ">
                  Jan 24, 2024
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownNotifications;
