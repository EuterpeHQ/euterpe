"use client";
import Section1 from "@/components/onboarding/Section1";
import Section2 from "@/components/onboarding/Section2";
import Section3 from "@/components/onboarding/Section3";
import Section4 from "@/components/onboarding/Section4";
import React, { useState } from "react";
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
