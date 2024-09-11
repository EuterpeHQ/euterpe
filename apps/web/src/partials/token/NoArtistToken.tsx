"use client";
import React, { useState } from "react";
import CreateTokenBanner from "@/partials/banners/CreateTokenBanner";
import Balancer from "react-wrap-balancer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CreateTokenForm from "@/partials/token/CreateTokenForm";
import { motion, AnimatePresence } from "framer-motion";

function NoArtistToken() {
  const [opendialog, setOpendialog] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.25 }}
        className="flex flex-1 flex-col gap-4"
      >
        <CreateTokenBanner />
        <div className="flex flex-1 flex-col items-center rounded-[16px] border-[0.5px] bg-white/[0.02] py-[3.75rem]">
          <CoinIcon />
          <h2 className="mt-4 font-azeret font-medium leading-tight">
            Launch your artist token
          </h2>
          <p className="mt-2 max-w-md text-center text-sm leading-snug text-muted-foreground">
            <Balancer>
              Gain independence and earn directly through your fans with your
              own artist token.
            </Balancer>
          </p>
          <Dialog open={opendialog} onOpenChange={setOpendialog}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-3">
                Launch Token
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateTokenForm />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function CoinIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="65"
      height="64"
      viewBox="0 0 65 64"
      fill="none"
      {...props}
    >
      <path
        d="M52.8777 6.72028C54.9772 9.0385 57.0774 11.3567 59.1776 13.6749C64.2018 19.2223 65.9726 27.6631 63.1739 36.9106C58.4144 52.6426 42.2332 64.7539 27.0312 63.9626C20.7654 63.6367 15.6444 61.1692 12.1223 57.2797L5.82309 50.3243C9.34593 54.2138 14.4669 56.6813 20.732 57.008C35.934 57.7992 52.1152 45.6872 56.8754 29.956C59.6734 20.7077 57.9019 12.267 52.8777 6.72028Z"
        fill="url(#paint0_linear_240_430)"
      />
      <path
        d="M59.1776 13.6749C57.0774 11.3567 54.9772 9.03849 52.8777 6.72028C53.0859 6.94977 53.2802 7.19195 53.4765 7.432C55.1965 9.33135 56.9165 11.2307 58.6372 13.1301C63.66 18.6774 65.4315 27.1175 62.6343 36.3657C57.8754 52.0977 41.6929 64.209 26.4922 63.4177C20.7271 63.1171 15.9369 61.0024 12.4635 57.6387C15.9717 61.3185 20.9625 63.6479 27.0312 63.9633C42.2332 64.7546 58.4144 52.6433 63.1739 36.9113C65.9719 27.6631 64.201 19.2223 59.1776 13.6749Z"
        fill="#E68805"
      />
      <path
        d="M37.9681 0.0366671C53.1708 0.828649 61.6343 14.2226 56.8754 29.9553C52.1152 45.6872 35.934 57.7985 20.732 57.0073C5.5306 56.2153 -2.93426 42.8206 1.82531 27.0887C6.58418 11.3567 22.7674 -0.754611 37.9681 0.0366671Z"
        fill="url(#paint1_linear_240_430)"
      />
      <path
        opacity="0.7"
        d="M57.2069 30.327C60.0389 20.9633 58.1866 12.4296 53.0176 6.88715C57.9304 12.4352 59.6469 20.7972 56.8754 29.956C52.1151 45.6879 35.934 57.7993 20.7319 57.008C14.5644 56.6863 9.51093 54.2878 5.99435 50.5039C6.06608 50.5862 6.1371 50.6707 6.21022 50.7524L6.35368 50.9108C9.86886 54.6757 14.9153 57.0594 21.0634 57.3797C36.2648 58.171 52.4466 46.0596 57.2069 30.327Z"
        fill="url(#paint2_linear_240_430)"
      />
      <path
        opacity="0.7"
        d="M35.0643 8.05641C45.9838 8.62523 52.0685 18.2459 48.6473 29.5518C45.2282 40.8529 33.6006 49.5563 22.6811 48.9874C11.7553 48.4186 5.67614 38.7938 9.09593 27.4927C12.5178 16.1867 24.1378 7.48829 35.0643 8.05641Z"
        fill="url(#paint3_linear_240_430)"
      />
      <path
        d="M35.5413 8.05641C46.4622 8.62523 52.5462 18.2459 49.1264 29.5518C45.7066 40.8529 34.0783 49.5563 23.1588 48.9874C12.2337 48.4186 6.15455 38.7938 9.57363 27.4927C12.9955 16.1867 24.6169 7.48829 35.5413 8.05641Z"
        fill="url(#paint4_linear_240_430)"
      />
      <path
        d="M11.928 28.6557C15.3499 17.3497 26.9706 8.65127 37.897 9.22009C39.8197 9.32076 41.5877 9.70654 43.1858 10.3275C41.0439 9.01664 38.4694 8.20917 35.5413 8.05641C24.6169 7.48829 12.9955 16.1867 9.57362 27.4927C6.75757 36.805 10.3911 44.9733 17.8686 47.8801C12.0171 44.2996 9.42529 36.9296 11.928 28.6557Z"
        fill="#CF4505"
      />
      <path
        opacity="0.4"
        d="M37.9682 0.0366906C35.4474 -0.0949544 32.9002 0.136656 30.3801 0.672388L3.16039 23.4533C2.65206 24.6409 2.20013 25.8518 1.82479 27.0887C0.857559 30.2862 0.446006 33.3837 0.516337 36.3017L42.9325 0.801216C41.3727 0.393609 39.7168 0.128208 37.9682 0.0366906Z"
        fill="url(#paint5_linear_240_430)"
      />
      <path
        opacity="0.5"
        d="M48.2692 48.1998C44.4009 52.0492 40.6497 54.5378 39.89 53.7578C39.1302 52.9777 41.6497 49.2248 45.5179 45.3747C49.3868 41.5253 53.1388 39.036 53.8978 39.8168C54.6575 40.5968 52.1374 44.3504 48.2692 48.1998Z"
        fill="url(#paint6_radial_240_430)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_240_430"
          x1="4.82647"
          y1="68.7067"
          x2="72.4965"
          y2="15.5686"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#D13F05" />
          <stop offset="0.2926" stop-color="#F67205" />
          <stop offset="0.3667" stop-color="#F67705" />
          <stop offset="0.4526" stop-color="#F68505" />
          <stop offset="0.5441" stop-color="#F69C05" />
          <stop offset="0.5638" stop-color="#F6A205" />
          <stop offset="0.5977" stop-color="#F69005" />
          <stop offset="0.6432" stop-color="#F67F05" />
          <stop offset="0.6932" stop-color="#F67505" />
          <stop offset="0.7553" stop-color="#F67205" />
          <stop offset="1" stop-color="#D13F05" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_240_430"
          x1="48.1064"
          y1="38.0032"
          x2="-6.87479"
          y2="10.8108"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FFAF02" />
          <stop offset="1" stop-color="#F56D05" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_240_430"
          x1="17.3984"
          y1="58.0121"
          x2="61.6666"
          y2="13.2671"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.4787" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_240_430"
          x1="18.7492"
          y1="50.6516"
          x2="39.0258"
          y2="7.27845"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0" />
          <stop offset="0.4787" stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_240_430"
          x1="54.3335"
          y1="20.9053"
          x2="10.0068"
          y2="34.127"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#CF4505" />
          <stop offset="1" stop-color="#E45905" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_240_430"
          x1="12.9388"
          y1="9.54209"
          x2="23.2797"
          y2="19.918"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
        <radialGradient
          id="paint6_radial_240_430"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(46.8933 46.7873) rotate(45.7799) scale(1.97155 9.8822)"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default NoArtistToken;
