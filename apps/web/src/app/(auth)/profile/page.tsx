"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import Withdrawls from "./Withdrawls";

// props
// change password modal
interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
interface PasswordOtpProps {
  isOpen: boolean;
  onClose: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

// functions
// change password
const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [showPasswordOtpModal, setShowPasswordOtpModal] = useState(false);

  const handlePasswordChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // Perform password change logic here
    // For demonstration purposes, just toggling the visibility of PasswordOtp modal
    setShowPasswordOtpModal(true);
    onClose(e);
  };
  // form handlre
  function handleSubmit(e: any) {
    e.preventDefault();
  }
  return (
    <>
      <div
        className={`modal ${
          isOpen ? "block" : "hidden"
        } fixed inset-0 z-50 flex items-center justify-center  overflow-auto bg-gray-500 bg-opacity-50`}
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto w-[500px] space-y-7 rounded-lg bg-background p-10 shadow-lg outline-4 dark:bg-background"
        >
          <div className="flex w-full items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Change Password</h1>
            <button
              onClick={onClose}
              className="p-2 text-sm text-primary hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mb-5">
            <label
              htmlFor="old-password"
              className="mb-2 block text-sm font-thin text-white"
            >
              Old Password
            </label>
            <Input
              type="password"
              placeholder="Enter Old Password"
              className="block w-full rounded-lg bg-background p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-thin text-white"
            >
              New Password
            </label>
            <Input
              type="password"
              placeholder="Enter New Password"
              className="block w-full rounded-lg bg-background p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-thin text-white"
            >
              Confirm Password
            </label>
            <Input
              type="password"
              placeholder="Confirm Password"
              className="block w-full rounded-lg bg-background p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handlePasswordChange}
            className="w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-white focus:outline-none"
          >
            Change
          </button>
        </form>
      </div>
      {showPasswordOtpModal && (
        <PasswordOtp
          isOpen={showPasswordOtpModal}
          onClose={() => setShowPasswordOtpModal(false)}
        />
      )}
    </>
  );
};
//
// password otp modal
const PasswordOtp: React.FC<PasswordOtpProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    // Add event listener to prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to remove event listener
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`modal ${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 flex items-center justify-center  overflow-auto bg-gray-500 bg-opacity-50`}
    >
      <form className="mx-auto w-[500px] space-y-7 rounded-lg bg-background p-10 shadow-lg outline-4 dark:bg-background">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Change Password</h1>
          <button
            onClick={onClose}
            className="p-2 text-sm text-primary hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="m-auto flex w-full flex-col items-center justify-center md:w-[80%] ">
          <p className="text-center text-base text-white  ">
            To change your password please enter the OTP sent to
          </p>
          <p className="flex w-[50%] items-center justify-start gap-x-3 text-center text-base font-bold text-white">
            rom*****@test.com
            <span className="border-10 flex h-8 w-8 cursor-pointer items-center justify-center border-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil h-4 w-4 cursor-pointer text-primary"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
              </svg>
            </span>
          </p>
        </div>
        <div className="m-auto flex flex-col items-center justify-center">
          <InputOTP
            className="m-auto"
            maxLength={6}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            render={({ slots }) => (
              <InputOTPGroup className="w-full space-x-0 sm:space-x-4">
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    className="h-10 w-10 rounded-lg border-2 border-gray-700"
                    key={index}
                    {...slot}
                  />
                ))}{" "}
              </InputOTPGroup>
            )}
          />
        </div>

        <p className="mb-4 text-center text-base text-white">
          Didn't recieve code?{" "}
          <span className="cursor-pointer text-primary hover:underline">
            Resend Code
          </span>
        </p>
        <Link className="mt-4" href="#">
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-white focus:outline-none"
          >
            Continue
          </button>
        </Link>
      </form>
      {/* <button
          onClick={onClose}
          className="mt-4 p-2 text-sm border-2 rounded-full font-thin text-black"
        >
          Close
        </button> */}
    </div>
    // </div>
  );
};

// Handle submit function
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form submitted");
};
function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("details");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="max-w-9xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Change vector art */}
      <div className="relative mb-8 overflow-hidden rounded-sm bg-card sm:p-6">
        <div
          className="pointer-events-none absolute right-0 top-0 -mt-4  hidden xl:block"
          aria-hidden="true"
        >
          <Image
            className="opacity-60"
            src="/images/vector-art.jpg"
            alt="vector-art"
            width={1400}
            height={300}
          />
        </div>
        <div className="relative space-y-4">
          <h1 className="mb-1 text-2xl font-bold text-foreground/80 md:text-3xl">
            Account Settings <br />
          </h1>
          <p className="text-muted-foreground">
            Set your name, bio, and other public <br /> facing image
          </p>
          <div className="flex gap-4 py-1">
            {/* <button className="w-36 rounded-lg border border-white bg-inherit p-2">
              Explore
            </button> */}
            {/* <button className="w-36 rounded-lg border border-white bg-inherit p-2">
              Create
            </button> */}
          </div>
        </div>
      </div>
      {/* User profile Section */}
      <div className="border2- w-full border-primary  p-4">
        {/* tabs */}
        <section className="mt-2 flex w-full flex-row flex-wrap justify-evenly gap-y-3 p-4 md:items-center md:justify-between">
          <button
            onClick={() => setActiveSection("details")}
            className={`w-[50%] font-semibold md:w-[15%] ${
              activeSection === "details"
                ? "border-b border-b-primary text-primary"
                : "text-white"
            }`}
          >
            My details
          </button>
          <button
            onClick={() => setActiveSection("withdrawls")}
            className={`w-[50%] font-semibold md:w-[15%]  ${
              activeSection === "withdrawls"
                ? "border-b border-b-primary text-primary"
                : "text-white"
            }`}
          >
            Withdrawls
          </button>
          <button
            onClick={() => setActiveSection("links")}
            className={`w-[50%] font-semibold md:w-[15%]  ${
              activeSection === "links"
                ? "border-b border-b-primary text-primary"
                : "text-white"
            }`}
          >
            Links
          </button>
          <button
            onClick={() => setActiveSection("privacy")}
            className={`w-[50%] font-semibold md:w-[15%]  ${
              activeSection === "privacy"
                ? "border-b border-b-primary text-primary"
                : "text-white"
            }`}
          >
            Privacy
          </button>
        </section>
        {/* section for My Details*/}
        {activeSection === "details" && (
          <>
            {/* profile image */}
            <section className="flex flex-col justify-between gap-y-4 md:flex-row">
              <div
                className="relative mt-10 h-40 w-40 rounded-full bg-background"
                style={{
                  backgroundImage: `url('/images/rapper.jpg')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <button className="absolute bottom-4 right-2 flex  h-8 w-8 rotate-2 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil h-8 w-8"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                </button>
              </div>
              <div className="mb-0 flex">
                <button
                  onClick={openModal}
                  className="mr-auto mt-auto h-fit rounded-full border border-gray-300  p-2 text-sm font-semibold text-gray-300 md:ml-auto"
                >
                  Change Password
                </button>
                <ChangePasswordModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                />
              </div>
            </section>

            {/* form */}
            <form onSubmit={handleSubmit} className="mt-16 w-full p-1.5">
              <div className="mb-6 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="product_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>

                  <input
                    type="text"
                    id="first_name"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 shadow focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Dennis"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="color_temp"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="White"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Other_names"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>

                  <input
                    type="text"
                    id="color_temp"
                    className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="pluto"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="color temperature"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date of Birth
                  </label>
                  <input
                    required
                    type="date"
                    name=""
                    id="dob"
                    className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    About Yourself
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Write about yourself here..."
                    required
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="focus: m-auto mx-auto w-full rounded-full bg-primary p-3 px-5 py-2.5 text-center text-sm  font-bold  text-white focus:outline-none md:w-[40%]"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </>
        )}
        {/* section for withdrawls */}
        {activeSection === "withdrawls" && (
          <>
            <div className="w-full ">
              <h1 className="mt-10 flex flex-row items-center justify-start gap-x-2 text-2xl text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-link-45deg h-8 w-8 text-primary underline"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                </svg>
                Withdrawls
              </h1>
              <p className="ms-1.5 mt-4 w-full md:w-[70%]">
                Withdraw your funds at ease!
              </p>
              {/* form */}
              <Withdrawls />
            </div>
          </>
        )}
        {/* section for privacy */}
        {activeSection === "privacy" && (
          <>
            <div className="w-full ">
              <h1 className="mt-10 flex flex-row items-center justify-start gap-x-2 text-2xl text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-link-45deg h-8 w-8 text-primary underline"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                </svg>
                Privacy Preferences
              </h1>
              <p className="ms-1.5 mt-4 w-full md:w-[70%]">
                Hi there, we don't want to keep any info that you're not
                comfortable sharing. We want our users to have 100% control of
                their informmation 100% of the time. Toggle below what you would
                like to share and not share baring in mind the more you share
                with us the more tailored experience you will receive- thanks!
              </p>
              {/* form */}
              <form onSubmit={handleSubmit} className="mt-10 w-full p-1.5">
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div className="flex flex-row items-center justify-start gap-x-3 border-b border-b-muted-foreground py-2">
                    <div className="flex  w-[85%] flex-row items-center justify-start gap-x-3 ">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary p-2 md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google h-8 w-8"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-white">
                          Google Authentication
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Used for Withdrawls and Security Modifications
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[20%] items-center justify-center">
                      <button className="w-20 rounded-lg border border-primary p-1.5 font-semibold text-primary md:w-40 md:p-2 md:px-4">
                        Enable
                      </button>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center justify-start gap-x-3 border-b border-b-muted-foreground py-2">
                    <div className="flex  w-[85%] flex-row items-center justify-start gap-x-3 ">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary p-2 md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google h-8 w-8"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-white">
                          Google Authentication
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Used for Withdrawls and Security Modifications
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[20%] items-center justify-center">
                      <button className="w-20 rounded-lg border border-primary p-1.5 font-semibold text-primary md:w-40 md:p-2 md:px-4">
                        Enable
                      </button>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center justify-start gap-x-3 border-b border-b-muted-foreground py-2">
                    <div className="flex  w-[85%] flex-row items-center justify-start gap-x-3 ">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary p-2 md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google h-8 w-8"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-white">
                          Google Authentication
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Used for Withdrawls and Security Modifications
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[20%] items-center justify-center">
                      <button className="w-20 rounded-lg border border-primary p-1.5 font-semibold text-primary md:w-40 md:p-2 md:px-4">
                        Enable
                      </button>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center justify-start gap-x-3 border-b border-b-muted-foreground py-2">
                    <div className="flex  w-[85%] flex-row items-center justify-start gap-x-3 ">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary p-2 md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google h-8 w-8"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-white">
                          Google Authentication
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Used for Withdrawls and Security Modifications
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[20%] items-center justify-center">
                      <button className="w-20 rounded-lg border border-primary p-1.5 font-semibold text-primary md:w-40 md:p-2 md:px-4">
                        Enable
                      </button>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center justify-start gap-x-3 border-b border-b-muted-foreground py-2">
                    <div className="flex  w-[85%] flex-row items-center justify-start gap-x-3 ">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary p-2 md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google h-8 w-8"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-white">
                          Google Authentication
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Used for Withdrawls and Security Modifications
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[20%] items-center justify-center">
                      <button className="w-20 rounded-lg border border-primary p-1.5 font-semibold text-primary md:w-40 md:p-2 md:px-4">
                        Enable
                      </button>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-row items-center justify-start gap-x-3 border-b border-b-muted-foreground py-2">
                    <div className="flex  w-[85%] flex-row items-center justify-start gap-x-3 ">
                      <div className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary p-2 md:flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-google h-8 w-8"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                        </svg>
                      </div>
                      <div className="w-full">
                        <h2 className="font-semibold text-white">
                          Google Authentication
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          Used for Withdrawls and Security Modifications
                        </p>
                      </div>
                    </div>
                    <div className="flex w-[20%] items-center justify-center">
                      <button className="w-20 rounded-lg border border-primary p-1.5 font-semibold text-primary md:w-40 md:p-2 md:px-4">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="focus: m-auto mx-auto mt-10 w-full rounded-full bg-primary p-3 px-5 py-2.5 text-center text-sm  font-bold  text-white focus:outline-none md:w-[40%]"
                  >
                    Update Settings
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
        {/* section for links */}
        {activeSection === "links" && (
          <>
            <div className="w-full ">
              <h1 className="mt-10 flex flex-row items-center justify-start gap-x-2 text-2xl text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-link-45deg h-8 w-8 text-primary underline"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z" />
                  <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
                </svg>
                Social Links
              </h1>
              {/* form */}
              <form onSubmit={handleSubmit} className="mt-10 w-full p-1.5">
                <div className="mb-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="spotify"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Spotify
                    </label>

                    <input
                      type="text"
                      id="first_name"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 shadow focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="https:dennismarrel//spotify.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="last_name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Apple Music
                    </label>

                    <input
                      type="text"
                      id="color_temp"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="https://dennismarrel.amazonmusic.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Other_names"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Youtube Music
                    </label>

                    <input
                      type="text"
                      id="yt"
                      className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="https://pluto@youtubemusic.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="color temperature"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Sound Cloud
                    </label>
                    <input
                      required
                      type="text"
                      name=""
                      id="soundcloud"
                      placeholder="https://pluto@soundcloud.com"
                      className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="color temperature"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      TIDAL
                    </label>
                    <input
                      required
                      type="text"
                      name=""
                      id="tidal"
                      placeholder="https://dennismarrel@tidal.com"
                      className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="color temperature"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Google Play Music
                    </label>
                    <input
                      required
                      type="text"
                      name=""
                      id="soundcloud"
                      placeholder="https://pluto@googleplay.com"
                      className=" block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-background dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="focus: m-auto mx-auto mt-10 w-full rounded-full bg-primary p-3 px-5 py-2.5 text-center text-sm  font-bold  text-white focus:outline-none md:w-[40%]"
                  >
                    Update Socials
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
