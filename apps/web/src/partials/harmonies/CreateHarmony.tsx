import React from "react";
import { useCreateHarmonyStore } from "@/providers/store/createHarmony.store";
import { useToast } from "@/components/ui/use-toast";
import CreateYieldHarmony from "@/partials/harmonies/CreateYieldHarmony";
import CreateYouTubeHarmony from "@/partials/harmonies/CreateYouTubeHarmony";

function CreateHarmony() {
  const harmonyType = useCreateHarmonyStore((state) => state.harmonyType);

  if (harmonyType === "Yield") {
    return <CreateYieldHarmony />;
  }
  if (harmonyType === "YouTube") {
    return <CreateYouTubeHarmony />;
  }
}

export default CreateHarmony;
