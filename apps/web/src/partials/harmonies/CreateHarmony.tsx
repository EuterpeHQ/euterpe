import React from "react";
import { useCreateHarmonyStore } from "@/providers/store/createHarmony.store";
import CreateYieldHarmony from "@/partials/harmonies/CreateYieldHarmony";
import CreateYouTubeHarmony from "@/partials/harmonies/CreateYouTubeHarmony";
import CreateEarlyICOHarmony from "@/partials/harmonies/CreateEarlyICOHarmony";
import CreateFeesHarmony from "@/partials/harmonies/CreateFeesHarmony";

function CreateHarmony() {
  const harmonyType = useCreateHarmonyStore((state) => state.harmonyType);

  if (harmonyType === "Fees") {
    return <CreateFeesHarmony />;
  }
  if (harmonyType === "Early ICO") {
    return <CreateEarlyICOHarmony />;
  }
  if (harmonyType === "Yield") {
    return <CreateYieldHarmony />;
  }
  if (harmonyType === "YouTube") {
    return <CreateYouTubeHarmony />;
  }
}

export default CreateHarmony;
