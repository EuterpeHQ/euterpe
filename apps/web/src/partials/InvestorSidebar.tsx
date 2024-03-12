"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSidebarStore } from "@/store/sidebar.store";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UrlObject } from "url";
import { Logomark } from "@/components/Logo";
import { cn } from "@/lib/utils";

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

function InvestorSidebar() {
  const sidebarOpen = useSidebarStore((state) => state.isOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setIsOpen);
  const sidebarExpanded = useSidebarStore((state) => state.isExpanded);
  const setSidebarExpanded = useSidebarStore((state) => state.setIsExpanded);

  const pathname = usePathname();

  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  //   const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  //   const [sidebarExpanded, setSidebarExpanded] = useState(
  //     storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  //   );

  // close on click outside
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

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    // localStorage.setItem("sidebar-expanded", sidebarExpanded);
    console.log("sidebarExpanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`bg-surface/60 fixed inset-0 z-40 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar bg-surface absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll border-r border-card/65 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto lg:sidebar-expanded:!w-64 2xl:!w-64 ${
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
            <div className="flex items-center justify-center">
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
              <span className="whitespace-nowrap lg:hidden lg:sidebar-expanded:block 2xl:block">
                Investor Mode
              </span>
            </h3>
            <ul className="mt-3">
              {/* Discover */}
              <SidebarLinkGroup activecondition={pathname.includes("discover")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-white/80 transition duration-150 ${
                          pathname.includes("discover")
                            ? "hover:text-white/80"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-muted-foreground`}
                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                              />
                              <path
                                className={`fill-current text-slate-600`}
                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                              />
                              <path
                                className={`fill-current text-muted-foreground`}
                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              Discover
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-2 w-2 shrink-0 fill-current text-muted-foreground ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        {/* The height of this <ul> element is carefully calculated to ensure a smooth transition effect when toggling visibility. 
                        The value is derived from the expected total height of the element's content, including the line-height of the child text elements, any bottom margins between list items, and bottom padding applied from the SidebarLinkGroup element. */}
                        <ul
                          className={cn(
                            "mt-1 h-20 pl-9 opacity-100 transition-all duration-150 ease-in-out",
                            {
                              "invisible h-0 opacity-0": !open,
                            },
                          )}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/discover"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                New Artists
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/discover/trending"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Trending Tokens
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/harmonies"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Harmonies
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Portfolio */}
              <SidebarLinkGroup
                activecondition={pathname.includes("portfolio")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-white/80 transition duration-150 ${
                          pathname.includes("portfolio")
                            ? "hover:text-white/80"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-muted-foreground`}
                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                              />
                              <path
                                className={`fill-current text-slate-700`}
                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                              />
                              <path
                                className={`fill-current text-slate-600`}
                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              Portfolio
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-2 w-2 shrink-0 fill-current text-muted-foreground ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        {/* The height of this <ul> element is carefully calculated to ensure a smooth transition effect when toggling visibility. 
                        The value is derived from the expected total height of the element's content, including the line-height of the child text elements, any bottom margins between list items, and bottom padding applied from the SidebarLinkGroup element. */}
                        <ul
                          className={cn(
                            "mt-1 h-[8.5rem] pl-9 opacity-100 transition-all duration-150 ease-in-out",
                            {
                              "invisible h-0 opacity-0": !open,
                            },
                          )}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/portfolio"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Overview
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/portfolio/my-tokens"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                My Tokens
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/portfolio/my-harmonies"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                My Harmonies
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/portfolio/performance"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Performance Tracker
                              </span>
                            </NavLink>
                          </li>{" "}
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/portfolio/rewards"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Rewards
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Exchange */}
              <SidebarLinkGroup activecondition={pathname.includes("exchange")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-white/80 transition duration-150 ${
                          pathname.includes("exchange")
                            ? "hover:text-white/80"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-600`}
                                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
                              />
                              <path
                                className={`fill-current text-muted-foreground`}
                                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              Exchange
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-2 w-2 shrink-0 fill-current text-muted-foreground ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        {/* The height of this <ul> element is carefully calculated to ensure a smooth transition effect when toggling visibility. 
                        The value is derived from the expected total height of the element's content, including the line-height of the child text elements, any bottom margins between list items, and bottom padding applied from the SidebarLinkGroup element. */}
                        <ul
                          className={cn(
                            "mt-1 h-[6.75rem] pl-9 opacity-100 transition-all duration-150 ease-in-out",
                            {
                              "invisible h-0 opacity-0": !open,
                            },
                          )}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/exchange"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Buy & Sell
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/exchange/auctions"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Participate in Auctions
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/exchange/staking"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Earn with Staking
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/exchange/airdrops"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Claim Airdrops
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Learn */}
              <SidebarLinkGroup activecondition={pathname.includes("learn")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-white/80 transition duration-150 ${
                          pathname.includes("learn")
                            ? "hover:text-white/80"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-600`}
                                d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"
                              />
                              <path
                                className={`fill-current text-muted-foreground`}
                                d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              Learn
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-2 w-2 shrink-0 fill-current text-muted-foreground ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        {/* The height of this <ul> element is carefully calculated to ensure a smooth transition effect when toggling visibility. 
                        The value is derived from the expected total height of the element's content, including the line-height of the child text elements, any bottom margins between list items, and bottom padding applied from the SidebarLinkGroup element. */}
                        <ul
                          className={cn(
                            "mt-1 h-[6.75rem] pl-9 opacity-100 transition-all duration-150 ease-in-out",
                            {
                              "invisible h-0 opacity-0": !open,
                            },
                          )}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/learn/investing-guides"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Investing Guides
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/learn/artists-spotlight"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Artists Spotlight
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/learn/market-watch"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Market Watch
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/learn/faqs"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                FAQs
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* Profile */}
              <SidebarLinkGroup activecondition={pathname.includes("profile")}>
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <a
                        href="#0"
                        className={`block truncate text-white/80 transition duration-150 ${
                          pathname.includes("profile")
                            ? "hover:text-white/80"
                            : "hover:text-white"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-6 w-6 shrink-0"
                              viewBox="0 0 24 24"
                            >
                              <path
                                className={`fill-current text-slate-700`}
                                d="M4.418 19.612A9.092 9.092 0 0 1 2.59 17.03L.475 19.14c-.848.85-.536 2.395.743 3.673a4.413 4.413 0 0 0 1.677 1.082c.253.086.519.131.787.135.45.011.886-.16 1.208-.474L7 21.44a8.962 8.962 0 0 1-2.582-1.828Z"
                              />
                              <path
                                className={`fill-current text-slate-600`}
                                d="M10.034 13.997a11.011 11.011 0 0 1-2.551-3.862L4.595 13.02a2.513 2.513 0 0 0-.4 2.645 6.668 6.668 0 0 0 1.64 2.532 5.525 5.525 0 0 0 3.643 1.824 2.1 2.1 0 0 0 1.534-.587l2.883-2.882a11.156 11.156 0 0 1-3.861-2.556Z"
                              />
                              <path
                                className={`fill-current text-muted-foreground`}
                                d="M21.554 2.471A8.958 8.958 0 0 0 18.167.276a3.105 3.105 0 0 0-3.295.467L9.715 5.888c-1.41 1.408-.665 4.275 1.733 6.668a8.958 8.958 0 0 0 3.387 2.196c.459.157.94.24 1.425.246a2.559 2.559 0 0 0 1.87-.715l5.156-5.146c1.415-1.406.666-4.273-1.732-6.666Zm.318 5.257c-.148.147-.594.2-1.256-.018A7.037 7.037 0 0 1 18.016 6c-1.73-1.728-2.104-3.475-1.73-3.845a.671.671 0 0 1 .465-.129c.27.008.536.057.79.146a7.07 7.07 0 0 1 2.6 1.711c1.73 1.73 2.105 3.472 1.73 3.846Z"
                              />
                            </svg>
                            <span className="ml-3 text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                              Profile
                            </span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg
                              className={`ml-1 h-2 w-2 shrink-0 fill-current text-muted-foreground ${open && "rotate-180"}`}
                              viewBox="0 0 12 12"
                            >
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                        {/* The height of this <ul> element is carefully calculated to ensure a smooth transition effect when toggling visibility. 
                        The value is derived from the expected total height of the element's content, including the line-height of the child text elements, any bottom margins between list items, and bottom padding applied from the SidebarLinkGroup element. */}
                        <ul
                          className={cn(
                            "mt-1 h-20 pl-9 opacity-100 transition-all duration-150 ease-in-out",
                            {
                              "invisible h-0 opacity-0": !open,
                            },
                          )}
                        >
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/profile"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Account Settings
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/profile/connect-wallet"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Wallet Connection
                              </span>
                            </NavLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <NavLink
                              to="/profile/withdrawals"
                              className={({
                                isActive,
                              }: {
                                isActive: boolean;
                              }) =>
                                "block truncate transition duration-150 " +
                                (isActive
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-white/80")
                              }
                            >
                              <span className="text-sm font-medium duration-200 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100">
                                Withdrawals
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>
        </div>
        {/* Expand / collapse button */}
        <div className="justify- mt-auto hidden pt-3 lg:inline-flex 2xl:hidden">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="h-6 w-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-muted-foreground"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorSidebar;
