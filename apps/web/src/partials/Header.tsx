import React, { useState } from "react";
import { useSidebarStore } from "@/providers/store/sidebar.store";
import SearchModal from "@/components/ModalSearch";
import Notifications from "@/components/DropdownNotifications";
import ConnectButton from "@/components/ConnectButton";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function Header() {
  const sidebarOpen = useSidebarStore((state) => state.isOpen);
  const setSidebarOpen = useSidebarStore((state) => state.setIsOpen);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-[3.25rem] items-center justify-between bg-white/[0.02] px-6 py-3 shadow-[0px_0.5px_0px_0px_#313131]">
      <div className="flex">
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/">
            <h2 className="text-sm font-bold">Euterpe</h2>
          </Link>
          <Badge
            variant="outline"
            className="text-nowrap font-azeret text-[0.563rem]"
          >
            Pre-Alpha
          </Badge>
        </div>
        <button
          className="text-muted-foreground lg:hidden"
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="4" y="5" width="16" height="2" />
            <rect x="4" y="11" width="16" height="2" />
            <rect x="4" y="17" width="16" height="2" />
          </svg>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div>
          <button
            className={`ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-card/65 dark:hover:bg-card ${
              searchModalOpen && "bg-slate-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setSearchModalOpen(true);
            }}
            aria-controls="search-modal"
          >
            <span className="sr-only">Search</span>
            <svg
              className="h-3 w-3"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current text-slate-500 dark:text-muted-foreground"
                d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
              />
              <path
                className="fill-current text-slate-400 dark:text-muted-foreground"
                d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
              />
            </svg>
          </button>
          <SearchModal
            id="search-modal"
            searchId="search"
            modalOpen={searchModalOpen}
            setModalOpen={setSearchModalOpen}
          />
        </div>
        <Notifications align="right" />
        <ConnectButton align="right" />
      </div>
    </header>
  );
}

export default Header;
