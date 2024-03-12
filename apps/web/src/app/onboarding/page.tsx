"use client";
// import { useState } from "react";

// import Intro from "@/components/Welcome/intro";
// export default function Page() {
//   return (
//     <>
//       {/* <Intro /> */}
//       <h1>Hello World</h1>
//     </>
//   );
// }

//
// export default function page() {
//   const [selectedOption, setSelectedOption] = useState("investor");

//   const handleOptionSelect = (option: any) => {
//     setSelectedOption(option);
//   };

//   return (
//     <div className="flex h-screen w-screen items-center justify-center">
//       <div className="relative flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg shadow-lg  py-32">
//         <span className="absolute top-0 h-1 w-1/6 bg-blue-600"></span>

//         <div className="flex flex-col items-center">
//           <p className="text-lg font-medium text-primary">Hello, Stella!</p>
//           <h1 className="text-4xl font-medium text-white">Who are you?</h1>

//           <p className="mt-10 text-sm uppercase text-white">Select an option</p>
//           <div className="mt-3 flex space-x-3">
//             <div
//               className={`relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-slate-800 shadow-lg shadow-gray-400/60 hover:scale-110 ${selectedOption === "investor" && "border-2 border-blue-600"}`}
//               onClick={() => handleOptionSelect("investor")}
//             >
//               <span
//                 className={`absolute h-full w-1/2 ${selectedOption === "investor" ? "bg-indigo-600" : "bg-transparent"}`}
//               ></span>
//             </div>
//             <div
//               className={`relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-white shadow-lg shadow-gray-400/60 hover:scale-110 ${selectedOption === "creator" && "border-2 border-blue-600"}`}
//               onClick={() => handleOptionSelect("creator")}
//             >
//               <span
//                 className={`absolute h-full w-1/2 ${selectedOption === "creator" ? "bg-rose-600" : "bg-transparent"}`}
//               ></span>
//             </div>
//           </div>

//           <div className="mt-10 space-y-2">
//             <div
//               className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700"
//               onClick={() => handleOptionSelect("investor")}
//             >
//               <input
//                 className="peer hidden"
//                 type="radio"
//                 name="framework"
//                 id="framework1"
//                 checked={selectedOption === "investor"}
//               />
//               <label
//                 className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-blue-700"
//                 htmlFor="framework1"
//               >
//                 {" "}
//               </label>
//               <div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-700 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-700 peer-checked:ring-2"></div>
//               <span>Investor</span>
//             </div>
//             <div
//               className="relative flex w-56 items-center justify-center rounded-full bg-gray-50 py-3 px-4 font-medium text-gray-700"
//               onClick={() => handleOptionSelect("creator")}
//             >
//               <input
//                 className="peer hidden"
//                 type="radio"
//                 name="framework"
//                 id="framework2"
//                 checked={selectedOption === "creator"}
//               />
//               <label
//                 className="absolute top-0 h-full w-full cursor-pointer rounded-full border peer-checked:border-blue-700"
//                 htmlFor="framework2"
//               >
//                 {" "}
//               </label>
//               <div className="absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-700 ring-offset-2 peer-checked:border-transparent peer-checked:bg-blue-700 peer-checked:ring-2"></div>
//               <span>Creator</span>
//             </div>
//           </div>

//           <button className="group mt-10 flex w-40 items-center justify-center rounded-lg bg-blue-700 py-2 text-center font-bold text-white transition">
//             Continue
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="ml-4 h-4 w-4 transition-transform group-hover:translate-x-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth="2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M14 5l7 7m0 0l-7 7m7-7H3"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// New onboarding

import Section1 from "@/components/onboarding/Section1";
import Section2 from "@/components/onboarding/Section2";
import Section3 from "@/components/onboarding/Section3";
import Section4 from "@/components/onboarding/Section4";
import React, { useState } from "react";
// import Section1 from "./Section1";
// import Section2 from "./Section2";
// import Section3 and Section4 similarly

const OnboardingPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(1);

  const handleNext = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handleBack = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  let sectionComponent: JSX.Element;
  switch (currentSection) {
    case 1:
      sectionComponent = <Section1 onNext={handleNext} />;
      break;
    case 2:
      sectionComponent = <Section2 onBack={handleBack} onNext={handleNext} />;
      break;
    case 3:
      sectionComponent = <Section3 onBack={handleBack} onNext={handleNext} />;
      break;
    // Render Section3 and Section4 similarly
    default:
      sectionComponent = <Section4 onBack={handleBack} onNext={handleNext} />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {/* <div className="relative flex w-[40rem] flex-col justify-center overflow-hidden rounded-lg border-2 border-blue-700 py-32 shadow-lg"> */}
      {/* <div className="flex flex-col items-center">{sectionComponent}</div> */}
      {sectionComponent}
    </div>
    // </div>
  );
};

export default OnboardingPage;
