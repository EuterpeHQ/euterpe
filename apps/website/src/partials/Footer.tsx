"use client";
import React, { useState } from "react";
import Link from "next/link";
import Spacer from "@/components/ui/spacer";
import { Separator } from "@/components/ui/separator";
import { MdEmail } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import { Credits } from "@/partials/Credits";
import { TbSquareRoundedX } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";

const exploreNavItems = [
  {
    name: "Discover Artists",
    href: "#footer",
    target: "_self",
  },
  {
    name: "New Releases",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Trending Tracks",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Genre Spaces",
    href: "#footer",
    target: "_self",
  },
];

const listenNavItems = [
  {
    name: "Comforting Habits",
    href: "https://songwhip.com/bunmi/comforting-habits",
    target: "_blank",
  },
  { name: "Playlist Curation", href: "/playlists", target: "_self" },
  { name: "Mood Mixes", href: "#footer", target: "_self" },
  { name: "Artist Radio", href: "#footer", target: "_self" },
];

const tokenNavItems = [
  {
    name: "Buy EUT",
    href: "https://app.euterpe.finance/exchange",
    target: "_self",
  },
  {
    name: "Create Artist Token",
    href: "https://app.euterpe.finance/token",
    target: "_self",
  },
  {
    name: "Verify Token Ownership",
    href: "https://app.euterpe.finance/verify-token",
    target: "_self",
  },
];

const harmoniesNavItems = [
  {
    name: "Harmony of the Week",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Create a Harmony",
    href: "/harmonies",
    target: "_self",
  },
  {
    name: "Propose New Harmony",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Guidelines",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Trends",
    href: "#footer",
    target: "_self",
  },
];

const plumesNavItems = [
  {
    name: "AI Recommendations",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Run Token Simulation",
    href: "#footer",
    target: "_self",
  },
];

const resourceNavItems = [
  {
    name: "Help Center",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Docs",
    href: "#footer",
    target: "_self",
  },
  {
    name: "FAQs",
    href: "#footer",
    target: "_self",
  },
];

const learnNavItems = [
  {
    name: "Investing Guides",
    href: "#footer",
    target: "_self",
  },
  {
    name: "DeFi for Artists",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Token Basics",
    href: "#footer",
    target: "_self",
  },
];

const companyNavItems = [
  {
    name: "Our Mission",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Position Paper",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Announcements",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Careers",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Collaborate with Us",
    href: "#footer",
    target: "_self",
  },
];

const legalNavItems = [
  {
    name: "Terms of Service",
    href: "#footer",
    target: "_self",
  },
  {
    name: "Privacy Policy",
    href: "#footer",
    target: "_self",
  },

  {
    name: "User Agreement",
    href: "#footer",
    target: "_self",
  },
];

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];

export default function Footer() {
  const [loading, setLoading] = useState(false);
  return (
    <footer id="footer">
      <Spacer size={64} />
      <div className="mx-auto w-full max-w-6xl px-10">
        <div className="grid grid-cols-1 gap-10 py-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:py-8">
          <div className="flex flex-col gap-10">
            <NavGroup title="Explore" items={exploreNavItems} />
            <NavGroup title="Listen" items={listenNavItems} />
          </div>
          <div className="flex flex-col gap-10">
            <NavGroup title="Token" items={tokenNavItems} />
            <NavGroup title="Harmonies" items={harmoniesNavItems} />
            <NavGroup title="Resources" items={resourceNavItems} />
          </div>
          <div className="flex flex-col gap-10">
            <NavGroup title="Plumes" items={plumesNavItems} />
            <NavGroup title="Learn" items={learnNavItems} />
          </div>
          <NavGroup title="Company" items={companyNavItems} />
          <NavGroup title="Legal" items={legalNavItems} />
        </div>
        <Separator className="h-[0.4px]" />
        <div className="w-full px-4 py-6 md:flex md:items-center md:justify-between">
          <span className="font-pulp text-[0.688rem] font-extralight text-muted-foreground sm:text-center">
            © 2024 <a href="#">Euterpe</a>. All Rights Reserved.
          </span>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <SocialLinks />

            <p
              className="-mb-1 cursor-pointer font-pulp text-[0.688rem] font-extralight leading-none text-muted-foreground hover:underline hover:underline-offset-2 sm:text-center"
              onClick={() => setLoading(true)}
            >
              Credits
            </p>
          </div>
        </div>
      </div>
      <Credits
        loadingStates={loadingStates}
        loading={loading}
        duration={2000}
      />
      {loading && (
        <button
          className="fixed right-4 top-4 z-[120] text-black dark:text-white"
          onClick={() => setLoading(false)}
        >
          <TbSquareRoundedX className="h-6 w-6" />
        </button>
      )}
    </footer>
  );
}

type NavGroupProps = {
  title: string;
  items: {
    name: string;
    href: string;
    target: string;
  }[];
};

function NavGroup({ title, items }: NavGroupProps) {
  return (
    <div className="">
      <h3 className="text-xs font-medium capitalize text-primary">{title}</h3>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              target={item.target}
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground"
            >
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="flex items-center space-x-5 sm:justify-center rtl:space-x-reverse">
      <a
        href="https://x.com/euterpehq/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary"
      >
        <FaXTwitter className="h-4 w-4" />
        <span className="sr-only">Twitter page</span>
      </a>
      <a
        href="https://www.instagram.com/euterpehq"
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground hover:text-primary"
      >
        <RiInstagramFill className="h-4 w-4" />
        <span className="sr-only">Instagram account</span>
      </a>
      {/* <a href="" className="text-muted-foreground hover:text-primary">
        <svg
          className="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 21 16"
        >
          <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
        </svg>
        <span className="sr-only">Discord community</span>
      </a> */}
      <a
        href="mailto:team@euterpe.finance"
        className="text-muted-foreground hover:text-primary"
      >
        <MdEmail className="h-4 w-4" />
        <span className="sr-only">Email address</span>
      </a>
    </div>
  );
}
