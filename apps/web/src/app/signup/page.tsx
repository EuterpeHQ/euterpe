"use client";
import Lottie from "lottie-react";
import BoyLottie from "@/assets/animations/boy2.json";
import Link from "next/link";
import { CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
export default function page() {
  return (
    <>
      <Alert className="border bg-red-700 shadow-md">
        <ExclamationTriangleIcon className="mt-4 h-4 w-4" />
        <AlertTitle className="text-center font-bold text-primary">
          Heads up!
        </AlertTitle>
        <AlertDescription className="text-center">
          Please note: Our login and sign up functionality is currently
          undergoing improvements and may not be fully operational. We apologize
          for any inconvenience this may cause. Feel free to click the sign up
          button to explore other areas of our project. Thank you for your
          understanding.
        </AlertDescription>
      </Alert>
      <div className=" m-auto flex max-h-screen max-w-screen-2xl gap-[4.5rem]">
        <Lottie
          className="hidden h-screen w-[40%] bg-black/15 lg:block"
          animationData={BoyLottie}
          loop
          autoplay
        />
        <div className="m-auto flex w-[90%] flex-col items-center  justify-center  md:h-screen md:w-[80%] lg:m-0 lg:w-[50%]">
          <header className="mb-0 mt-60 flex flex-wrap justify-center gap-2 lg:mt-16">
            <img className=" size-10" src="./logo/logo.png" alt="logo" />
            <h2 className="mb-0 text-center text-4xl font-bold text-white">
              Euterpe
            </h2>
          </header>
          <main className="m-auto mt-20 flex w-full flex-col">
            <div className="flex flex-col flex-wrap items-center justify-center space-y-3">
              <h3 className="text-xl font-bold">Create an Account</h3>
              <p className="mb-2">
                Already have an account?{" "}
                <span className="text-primary">
                  <Link href="/login">Log in</Link>
                </span>
              </p>
            </div>
            <form className="mx-auto mb-5 mt-4 w-[90%] space-y-6 sm:w-[80%] md:w-[60%] lg:w-[60%]">
              <div className="mb-5 flex flex-wrap justify-center gap-2">
                <div className="flex w-[80%] justify-center  gap-6 rounded-lg bg-gray-700 p-2 text-sm md:w-[45%] md:gap-0">
                  <span className="flex">
                    <svg
                      className="me-2 h-6 w-6 text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 22a10 10 0 0 1-7.1-3A9.9 9.9 0 0 1 5 4.8C7 3 9.5 2 12.2 2h.2c2.4 0 4.8 1 6.6 2.6l-2.5 2.3a6.2 6.2 0 0 0-4.2-1.6c-1.8 0-3.5.7-4.8 2a6.6 6.6 0 0 0-.1 9.3c1.2 1.3 2.9 2 4.7 2h.1a6 6 0 0 0 4-1.1c1-.9 1.8-2 2.1-3.4v-.2h-6v-3.4h9.6l.1 1.9c-.1 5.7-4 9.6-9.7 9.6H12Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Sign up with Google
                </div>
                <div className="flex w-[80%] justify-center  gap-6 rounded-lg bg-gray-700 p-2 text-sm md:w-[45%] md:gap-0">
                  <span className="flex ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-spotify m-auto me-2 h-6 w-6"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
                    </svg>
                  </span>
                  Sign up with Spotify
                </div>
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm-light block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 shadow-sm focus:border-primary  focus:ring-primary"
                  placeholder="name@euterpe.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="shadow-sm-light block w-full rounded-lg border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 shadow-sm focus:border-primary  focus:ring-primary"
                  required
                />
              </div>
              <Link href="/onboarding">
                <button
                  type="submit"
                  className="mt-5 w-full rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Sign Up
                </button>
              </Link>
              <div className="my-2 flex items-center justify-center">
                <div className="w-full border-t border-gray-400"></div>
                <div className="mx-4 text-gray-400">or</div>
                <div className="w-full border-t border-gray-400"></div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-lime-400 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Connect Wallet
              </button>
              <div className="mb-5 flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="focus:ring-3 h-4 w-4  border border-gray-600 ring-offset-gray-800 focus:ring-blue-300 focus:ring-offset-gray-800 dark:bg-gray-700"
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  I agree with the{" "}
                  <a href="#" className="text-gray-400 hover:underline">
                    terms and conditions
                  </a>
                </label>
              </div>
            </form>
          </main>
        </div>
      </div>
    </>
  );
}
