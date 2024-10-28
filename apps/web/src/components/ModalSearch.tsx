import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Transition from "@/lib/Transition";

type ModalSearchProps = {
  id: string;
  searchId: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

function ModalSearch({
  id,
  searchId,
  modalOpen,
  setModalOpen,
}: ModalSearchProps) {
  const modalContent = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: any }) => {
      if (!modalContent.current) return;
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!modalOpen || event.key !== "Escape") return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    if (!searchInput.current) return;
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  return (
    <>
      {/* Modal backdrop */}
      {/* @ts-expect-error */}
      <Transition
        className="bg-surface/60 fixed inset-0 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      {/* @ts-expect-error */}
      <Transition
        id={id}
        className="fixed inset-0 top-20 z-50 mb-4 flex items-start justify-center overflow-hidden px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="dark:bg-surface max-h-full w-full max-w-2xl overflow-auto rounded border border-transparent bg-white shadow-lg dark:border-card/65"
        >
          {/* Search form */}
          <form className="border-b border-slate-200 dark:border-card/65">
            <div className="relative">
              <label htmlFor={searchId} className="sr-only">
                Search
              </label>
              <input
                id={searchId}
                className="dark:bg-surface w-full appearance-none border-0 bg-white py-3 pl-10 pr-4 placeholder-slate-400 focus:ring-transparent dark:text-white/80 dark:placeholder-muted-foreground"
                type="search"
                placeholder="Search Anything…"
                ref={searchInput}
              />
              <button
                className="group absolute inset-0 right-auto"
                type="submit"
                aria-label="Search"
              >
                <svg
                  className="ml-4 mr-2 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 dark:text-muted-foreground dark:group-hover:text-slate-400"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </div>
          </form>
          <div className="px-2 py-4">
            {/* Recent searches */}
            <div className="mb-3 last:mb-0">
              <div className="mb-2 px-2 text-xs font-semibold uppercase text-slate-400 dark:text-muted-foreground">
                Recent searches
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Royalty Harmony Contract Templates</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Create New Token</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Harmonies with Streaming Rights</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Understanding Royalty Terms</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>Token Launch Guide</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.707 14.293v.001a1 1 0 01-1.414 1.414L11.185 12.6A6.935 6.935 0 017 14a7.016 7.016 0 01-5.173-2.308l-1.537 1.3L0 8l4.873 1.12-1.521 1.285a4.971 4.971 0 008.59-2.835l1.979.454a6.971 6.971 0 01-1.321 3.157l3.107 3.112zM14 6L9.127 4.88l1.521-1.28a4.971 4.971 0 00-8.59 2.83L.084 5.976a6.977 6.977 0 0112.089-3.668l1.537-1.3L14 6z" />
                    </svg>
                    <span>DREs - Afrobeats</span>
                  </Link>
                </li>
              </ul>
            </div>
            {/* Recent pages */}
            <div className="mb-3 last:mb-0">
              <div className="mb-2 px-2 text-xs font-semibold uppercase text-slate-400 dark:text-muted-foreground">
                Recent pages
              </div>
              <ul className="text-sm">
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium">Learn</span> -{" "}
                      <span className="text-slate-600 group-hover:text-white dark:text-slate-400">
                        Getting Started / … / DeFi For Artists
                      </span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="group flex items-center rounded p-2 text-slate-800 hover:bg-card/65 hover:text-white dark:text-slate-100"
                    href="#0"
                    onClick={() => setModalOpen(!modalOpen)}
                  >
                    <svg
                      className="mr-3 h-4 w-4 shrink-0 fill-current text-slate-400 group-hover:text-white group-hover:text-opacity-50 dark:text-muted-foreground"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 0H2c-.6 0-1 .4-1 1v14c0 .6.4 1 1 1h8l5-5V1c0-.6-.4-1-1-1zM3 2h10v8H9v4H3V2z" />
                    </svg>
                    <span>
                      <span className="font-medium">Learn</span> -{" "}
                      <span className="text-slate-600 group-hover:text-white dark:text-slate-400">
                        FAQs / … / How To Value A Token
                      </span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
