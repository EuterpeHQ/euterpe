import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";
import config from "../../../tailwind.config";
import Spacer from "@/components/ui/spacer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BASE_URL}`
  : "";

export default function JoinWaitlistEmail() {
  return (
    <Tailwind config={config}>
      <Html>
        <Head />
        <Preview>
          Your spot on the waitlist is confirmed. We're approaching pre-alpha
          and excited to share our progress with you very soon.
        </Preview>
        <Body className="m-auto max-w-lg bg-[#020303]">
          <Container className="p-10">
            <Img
              src={`${baseUrl}/images/girl-sitting-on-floor.png`}
              alt="Girl Waiting"
              className="w-2/3"
            />
            <Text className="text-2xl font-semibold text-white">
              You're on the waitlist🤭
            </Text>
            <Text className="text-base font-light tracking-[-0.04rem] text-[#A5A5A5] sm:text-sm">
              Your spot on the waitlist is confirmed. We're approaching
              pre-alpha and excited to share our progress with you very soon.
            </Text>
            <Spacer size={6} />
            <Button
              href="https://x.com/euterpehq/"
              className="flex w-full items-center justify-center rounded-full bg-[#b8ff5c] px-5 py-2 text-sm text-[#0f1729] sm:w-fit"
            >
              <div className="mt-0.5 inline-flex items-center justify-center">
                <Img
                  src={`${baseUrl}/icons/twitter-primary-foreground.png`}
                  alt="Twitter page"
                  className="mr-1 h-4 w-4"
                />
                Follow us
              </div>
            </Button>
            <Hr className="my-6 border-t border-t-[1px] border-t-[#303030]" />
            <div className="flex w-full pb-6 pt-0">
              <span className="w-1/2 text-[0.688rem] font-extralight text-[#A5A5A5]">
                © 2024 Euterpe. All Rights Reserved.
              </span>
              <div className="w-1/2 text-right">
                <SocialLinks />
              </div>
            </div>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

export function SocialLinks() {
  return (
    <div className="inline-flex items-center justify-center rtl:space-x-reverse">
      <a
        href="https://x.com/euterpehq/"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-5 text-[#bdbdbd] hover:text-primary"
      >
        <Img
          src={`${baseUrl}/icons/twitter.png`}
          alt="Twitter page"
          className="h-4 w-4"
        />
      </a>
      <a
        href="https://www.instagram.com/euterpehq"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-5 text-[#bdbdbd] hover:text-primary"
      >
        <Img
          src={`${baseUrl}/icons/instagram.png`}
          alt="Instagram page"
          className="h-4 w-4"
        />
      </a>
      {/* <a href="" className="text-[#A5A5A5] hover:text-primary">
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
        className="text-[#bdbdbd] hover:text-primary"
      >
        <Img
          src={`${baseUrl}/icons/email.png`}
          alt="Email address"
          className="h-4 w-4"
        />
      </a>
    </div>
  );
}
