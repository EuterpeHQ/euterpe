"use client";
import React, { useState, useEffect } from "react";
import Section1 from "@/components/onboarding/Section1";
import Section2 from "@/components/onboarding/Section2";
import Section3 from "@/components/onboarding/Section3";
import Section4 from "@/components/onboarding/Section4";

const OnboardingPage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<number>(1);

  useEffect(() => {
    const storedSection = localStorage.getItem("currentSection");
    if (storedSection) {
      setCurrentSection(parseInt(storedSection));
    }
  }, []);

  const handleNext = () => {
    setCurrentSection((prevSection) => {
      const nextSection = prevSection + 1;
      localStorage.setItem("currentSection", nextSection.toString());
      return nextSection;
    });
  };

  const handleBack = () => {
    setCurrentSection((prevSection) => {
      const nextSection = prevSection - 1;
      localStorage.setItem("currentSection", nextSection.toString());
      return nextSection;
    });
  };

  // Reset local storage when onboarding is complete
  useEffect(() => {
    if (currentSection > 4) {
      localStorage.removeItem("currentSection");
    }
  }, [currentSection]);

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
    default:
      sectionComponent = <Section4 onBack={handleBack} onNext={handleNext} />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      {sectionComponent}
    </div>
  );
};

export default OnboardingPage;
