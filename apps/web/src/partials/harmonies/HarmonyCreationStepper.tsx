import { Step, type StepItem, Stepper, useStepper } from "@/components/stepper";
import { Button } from "@/components/ui/button";
import { MdCategory, MdViewList } from "react-icons/md";
import { FaWandMagicSparkles, FaRocket } from "react-icons/fa6";
import HarmonyCategories from "@/partials/harmonies/HarmonyCategories";
import Spacer from "@/components/ui/spacer";
import HarmonyTypes from "@/partials/harmonies/HarmonyTypes";
import CreateHarmony from "@/partials/harmonies/CreateHarmony";
import { cn } from "@/lib/utils";

const steps = [
  {
    label: "Select Category",
    icon: MdCategory,
    component: <HarmonyCategories />,
  },
  {
    label: "Select Type",
    icon: MdViewList,
    component: <HarmonyTypes />,
  },
  {
    label: "Customize",
    icon: FaWandMagicSparkles,
    component: <CreateHarmony />,
  },
  { label: "Launch", icon: FaRocket, component: "Launch" },
] satisfies StepItem[];

export default function HarmonyCreationStepper() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper initialStep={0} steps={steps}>
        {steps.map((props, index) => {
          return (
            <Step key={props.label} {...props}>
              <Spacer size={40} />
              {props.component}
            </Step>
          );
        })}
        <BackButton />
      </Stepper>
    </div>
  );
}

function BackButton() {
  const { prevStep, isFirstStep, isLastStep } = useStepper();
  return (
    <Button
      size="sm"
      variant="outline"
      className={cn(
        "w-fit px-4",
        isFirstStep && "hidden",
        isLastStep && "hidden",
      )}
      onClick={prevStep}
    >
      Back
    </Button>
  );
}
