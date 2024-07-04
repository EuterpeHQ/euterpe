import * as React from "react";
import { StepperContext } from "./context";

function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function useStepper() {
  const context = React.useContext(StepperContext);

  if (context === undefined) {
    throw new Error("useStepper must be used within a StepperProvider");
  }

  const { children, className, ...rest } = context;

  const isFirstStep = context.activeStep === 0;
  console.log(context.activeStep);
  console.log(context.activeStep === 0);
  const isLastStep = context.activeStep === context.steps.length - 1;
  const hasCompletedAllSteps = context.activeStep === context.steps.length;

  const previousActiveStep = usePrevious(context.activeStep);

  const currentStep = context.steps[context.activeStep];
  const isOptionalStep = !!currentStep?.optional;

  const isDisabledStep = context.activeStep === 0;

  return {
    ...rest,
    isFirstStep,
    isLastStep,
    hasCompletedAllSteps,
    isOptionalStep,
    isDisabledStep,
    currentStep,
    previousActiveStep,
  };
}
