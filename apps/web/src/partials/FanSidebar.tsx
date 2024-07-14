"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSidebarStore } from "@/providers/store/sidebar.store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UrlObject } from "url";
import { Logomark } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SelectUserModeOption from "@/components/SelectUserMode";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiBullseye } from "react-icons/bi";
import { IoInfiniteOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

type Url = string | UrlObject;

const NavLink = ({
  children,
  to,
  className,
}: {
  children: React.ReactNode;
  to: Url;
  className: string | (({ isActive }: { isActive: boolean }) => string);
}) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  let resolvedClassName;
  if (typeof className === "function") {
    resolvedClassName = className({ isActive });
  } else {
    resolvedClassName = className;
  }

  return (
    <Link href={to} className={resolvedClassName}>
      {children}
    </Link>
  );
};

function SidebarLinkGroup({
  children,
  activecondition,
}: {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  activecondition?: boolean;
}) {
  const [open, setOpen] = useState(activecondition || false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${activecondition && "bg-card/25"}`}
    >
      {children(handleClick, open)}
    </li>
  );
}

const SidebarItem = ({
  name,
  to,
  icon,
}: {
  name: string;
  to: Url;
  icon: JSX.Element;
}) => {
  const pathname = usePathname();
  const isActive = pathname === to;
  const sidebarExpanded = useSidebarStore((state) => state.isExpanded);
  const setSidebarExpanded = useSidebarStore((state) => state.setIsExpanded);

  return (
    <Link
      href={to}
      className={cn(
        "mb-1 flex items-center rounded-xl px-2.5 py-1.5 text-white/80 transition duration-150 last:mb-0 hover:bg-muted/30",
        {
          "bg-accent text-primary hover:bg-accent hover:text-primary": isActive,
        },
      )}
      onClick={(e) => {
        sidebarExpanded ? () => {} : setSidebarExpanded(true);
      }}
    >
      <div
        className={cn("mr-2 inline-flex h-6 w-6 items-center", {
          "text-primary": isActive,
        })}
      >
        {icon}
      </div>
      <span className="ml-2 text-sm font-medium transition-opacity duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
        {name}
      </span>
    </Link>
  );
};

function FanSidebar() {
  const sidebarItems = [
    {
      name: "Home",
      to: "/home",
      icon: <MdOutlineSpaceDashboard className="h-5 w-5" />,
    },
    {
      name: "Portfolio",
      to: "/portfolio",
      icon: <BiBullseye className="h-5 w-5" />,
    },
    {
      name: "Explore",
      to: "/explore",
      icon: <IoInfiniteOutline className="h-5 w-5" />,
    },
  ];

  const sidebarBottomItems = [
    {
      name: "Settings",
      to: "/profile",
      icon: <IoSettingsOutline className="h-5 w-5" />,
    },
    {
      name: "Community",
      to: "/community",
      icon: <MdOutlinePeopleAlt className="h-5 w-5" />,
    },
  ];
  const sidebarOpen = useSidebarStore((state) => state.isOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setIsOpen);
  const sidebarExpanded = useSidebarStore((state) => state.isExpanded);
  const setSidebarExpanded = useSidebarStore((state) => state.setIsExpanded);

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: { target: any }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    let delay: NodeJS.Timeout;
    if (sidebarExpanded) {
      delay = setTimeout(() => {
        document.querySelector("body")?.classList.add("sidebar-expanded");
      }, 5);
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }

    return () => clearTimeout(delay);
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-surface/60 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll border-r border-card/65 bg-surface p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="mb-10 flex justify-between pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="text-slate-500 hover:text-muted-foreground lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink to="/" className="block">
            <div className="flex items-center justify-center gap-2">
              <Logomark className="h-auto w-8" />
              <p
                className={cn(
                  "ml-2 text-base font-semibold opacity-0 transition duration-150",
                  {
                    "opacity-100": sidebarExpanded,
                  },
                )}
              >
                Euterpe
              </p>
              <Badge
                variant="outline"
                className={cn("text-nowrap", !sidebarExpanded && "hidden")}
              >
                Pre-Alpha
              </Badge>
            </div>
          </NavLink>
        </div>

        {/* Links */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-muted-foreground">
              <span
                className="hidden w-6 text-center lg:block lg:sidebar-expanded:hidden 2xl:hidden"
                aria-hidden="true"
              >
                •••
              </span>
              <div className="whitespace-nowrap lg:hidden lg:sidebar-expanded:inline-flex  2xl:inline-flex ">
                Fan Mode
              </div>
            </h3>
            <ul className="mt-3">
              {sidebarItems.map((item) => (
                <SidebarItem key={item.name} {...item} />
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-auto">
          <ul className="mt-3">
            {sidebarBottomItems.map((item) => (
              <SidebarItem key={item.name} {...item} />
            ))}
          </ul>
          {/* Expand / collapse button */}
          <div className="mt-auto hidden justify-center pt-3 lg:inline-flex 2xl:hidden">
            <div className="px-3 py-2">
              <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                <span className="sr-only">Expand / collapse sidebar</span>
                <div className="flex shrink-0">
                  <svg
                    className={`ml-1 h-3 w-3 shrink-0 fill-current text-muted-foreground ${!sidebarExpanded && "rotate-[270deg]"} ${sidebarExpanded && "rotate-90"}`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FanSidebar;
