import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import AnnouncementBar from "@/components/AnnouncementBar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Explore", href: "#", current: false },
  { name: "Resources", href: "#", current: false },
  { name: "About Us", href: "#", current: false },
];

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-50 flex flex-col backdrop-blur-md"
    >
      <AnnouncementBar>
        <div>
          <p className="font-axiforma text-xs">Pre-Alpha Release is Coming🎉</p>
        </div>
      </AnnouncementBar>
      <div className="relative flex h-[3.25rem] w-full flex-row items-center justify-between border-y-[0.5px] border-[#313131] bg-black/[0.85] p-2 px-4 text-lg sm:px-6 lg:px-8">
        <h1 className="font-aeonik font-medium">Euterpe.</h1>
        <div className="hidden flex-row gap-x-20 text-[0.688rem] sm:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                item.current ? "text-primary" : "hover:text-primary",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden sm:block">
          <Button size="sm" asChild>
            <Link
              href="https://app.euterpe.finance"
              rel="noreferrer"
              target="_blank"
            >
              Launch App
            </Link>
          </Button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none group-data-[open]:hidden">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <Bars3Icon
              aria-hidden="true"
              className="block h-6 w-6 stroke-muted-foreground"
            />
          </DisclosureButton>
        </div>
      </div>

      <DisclosurePanel
        className="fixed inset-y-0 right-0 z-50 flex h-screen w-full items-center justify-center bg-background/90 transition duration-200 ease-out data-[closed]:opacity-0 sm:hidden"
        transition
      >
        <div className="absolute right-0 top-0 flex items-center sm:hidden">
          <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 pt-11 text-muted-foreground focus:outline-none">
            <span className="absolute -inset-0.5" />
            <span className="sr-only">Open main menu</span>
            <XMarkIcon
              aria-hidden="true"
              className="hidden h-6 w-6 stroke-muted-foreground group-data-[open]:block"
            />
          </DisclosureButton>
        </div>
        <div className="space-y-1 px-2 pb-3 pt-2 text-xl">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={cn(
                item.current
                  ? "bg-primary"
                  : "hover:bg-primary/5 hover:text-primary",
                "block rounded-md px-3 py-2 text-center",
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
