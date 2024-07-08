"use client"

import { useState } from "react";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
        {/* navbar */}
        <nav className="text-lg p-2 px-8 flex flex-row justify-between items-center w-full border-b border-b-[#313131] h-16">
        <h1 className="font-mono font-semibold">Euterpe.</h1>
        <div className="hidden md:flex flex-row gap-x-20 font-mono">
          <p>Explore</p>
          <p>Resources</p>
          <p>About Us</p>
        </div>
        <div className="hidden md:block">
          <button className="font-mono font-bold bg-primary text-black px-4 p-2 rounded-full border-none">
            Get Started
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="font-mono text-white">
            ☰
          </button>
        </div>
      </nav>
       {/* side menu */}
       <div
       className={`border-r fixed top-0 right-0 h-full w-64 bg-black z-50 transform ${
         isMenuOpen ? "translate-x-0" : "translate-x-full"
       } transition-transform duration-300 ease-in-out`}
     >
       <div className="flex justify-end p-4">
         <button onClick={toggleMenu} className="font-mono text-white">
           ✕
         </button>
       </div>
       <div className="flex flex-col items-center font-mono gap-y-6 mt-10">
         <p onClick={toggleMenu}>Explore</p>
         <p onClick={toggleMenu}>Resources</p>
         <p onClick={toggleMenu}>About Us</p>
         <button
           className="bg-primary text-black px-4 p-2 rounded-full border-none mt-4"
           onClick={toggleMenu}
         >
           Get Started
         </button>
       </div>
     </div>
     </>

    )
}