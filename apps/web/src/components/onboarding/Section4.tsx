// Section2.tsx
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
interface Section4Props {
  onBack: () => void;
  onNext: () => void;
}
export const STAGGER_CHILD_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, type: "spring" } },
};

const Section4: React.FC<Section4Props> = ({ onBack, onNext }) => {
  return (
    <div className="m-auto flex w-[90%] flex-col items-center justify-center gap-10  lg:flex-row lg:gap-0">
      <div className="flex w-full flex-col items-center justify-center gap-5 p-10">
        <h1 className="text-center text-xl font-bold text-primary md:text-4xl">
          Select your Path
        </h1>
        <p className="text-center text-sm md:text-base">
          Are you ready to join the future of music? Choose your role below
        </p>
        <div className="flex flex-wrap justify-center gap-10">
          <SelcetOption
            type="Artist"
            text="I'm ready to elevate my career and engage with my fans like never before."
            img="./images/music-boy.png"
          />
          <SelcetOption
            type="Investor"
            text=" I'm excited to support innovative artists and grow my portfolio in
            the music industry."
            img="./images/investor.png"
          />
        </div>
      </div>
    </div>
  );
};
interface SelectOptionProps {
  type: string;
  text: String;
  img: any;
}
function SelcetOption({ type, text, img }: SelectOptionProps) {
  return (
    <Card className="group flex h-[230px] w-[230px] cursor-pointer flex-col justify-between overflow-hidden border border-primary/20 bg-black/15 outline-none transition-all duration-200  md:hover:bg-primary/10 md:hover:outline md:hover:outline-offset-2 md:hover:outline-primary/20">
      <CardContent className="relative flex items-center justify-center p-0 md:p-4">
        <Avatar className=" h-24 w-24 rounded-none md:rounded-full">
          <AvatarImage
            className="mt-2 h-full w-full rounded-full"
            src={img}
            alt={type}
          />
          <AvatarFallback className="relative bg-black/5">
            <svg
              className="absolute left-1/2 h-full w-full -translate-x-1/2 text-black/20"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardHeader className="p-4 text-sm md:p-0 md:pb-4 md:text-center">
        <CardTitle className="text-primary">{type}</CardTitle>
        <CardDescription className="hover:text-white">
          <span>{text}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start justify-end md:hidden">
        <div className="mb-4 h-px w-full bg-primary/20" />
      </CardFooter>
    </Card>
  );
}
export default Section4;
