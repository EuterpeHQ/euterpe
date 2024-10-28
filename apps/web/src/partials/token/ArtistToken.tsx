import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TokenOverview from "@/partials/token/TokenOverview";
import ManageToken from "@/partials/token/ManageToken";
import { ArtistToken as ArtistTokenProps } from "@/entities";

function ArtistToken(props: ArtistTokenProps) {
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
        <TokenOverview {...props} />
      </TabsContent>
      <TabsContent value="manage" hidden={"manage" !== activeTab} forceMount>
        <ManageToken />
      </TabsContent>
    </Tabs>
  );
}

export default ArtistToken;
