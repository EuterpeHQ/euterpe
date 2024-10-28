import React from "react";
import Spacer from "@/components/ui/spacer";
import { VerticalTabs, Tab } from "@/components/ui/vertical-tabs";
import ManageTokenGeneral from "@/partials/token/ManageTokenGeneral";
import ManageTokenAllocations from "@/partials/token/ManageTokenAllocations";
import ManageTokenICO from "@/partials/token/ManageTokenICO";
import ManageTokenIntegrations from "@/partials/token/ManageTokenIntegrations";
import ManageTokenPermissions from "@/partials/token/ManageTokenPermissions";
import ManageTokenSettings from "@/partials/token/ManageTokenSettings";

export default function ManageToken() {
  return (
    <div className="w-full max-w-5xl">
      <Spacer size={28} />
      <VerticalTabs defaultValue="ico">
        <Tab value="overview" title="General">
          <ManageTokenGeneral />
        </Tab>
        <Tab value="transfers" title="Allocations">
          <ManageTokenAllocations />
        </Tab>
        <Tab value="ico" title="Presale" badge="New">
          <ManageTokenICO />
        </Tab>
        <Tab value="integrations" title="Integrations">
          <ManageTokenIntegrations />
        </Tab>
        <Tab value="permissions" title="Permissions">
          <ManageTokenPermissions />
        </Tab>
        <Tab value="settings" title="Settings">
          <ManageTokenSettings />
        </Tab>
      </VerticalTabs>
    </div>
  );
}
