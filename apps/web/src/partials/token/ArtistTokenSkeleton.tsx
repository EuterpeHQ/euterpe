import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenOverviewSkeleton from "@/partials/token/TokenOverviewSkeleton";
import { ArtistToken as ArtistTokenProps } from "@/entities";

function ArtistTokenSkeleton() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Tabs defaultValue="overview" onValueChange={setActiveTab}>
      <TabsList variant="underline" width="full">
        <TabsTrigger
          className="font-medium"
          variant="underline"
          width="fit"
          value="overview"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          className="font-medium"
          variant="underline"
          width="fit"
          value="manage"
        >
          Manage
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="overview"
        hidden={"overview" !== activeTab}
        forceMount
      >
        <TokenOverviewSkeleton />
      </TabsContent>
      <TabsContent value="manage" hidden={"manage" !== activeTab} forceMount>
        <></>
      </TabsContent>
    </Tabs>
  );
}

export default ArtistTokenSkeleton;
