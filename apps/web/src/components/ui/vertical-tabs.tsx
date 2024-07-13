import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface VerticalTabsProps {
  children: React.ReactElement[];
}

interface VerticalTabProps {
  value: string;
  title: string;
  activeTab?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const VerticalTabs: React.FC<VerticalTabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.value);

  return (
    <div className="flex">
      <div className="flex w-1/4 gap-2 p-4 pl-0">
        <Separator orientation="vertical" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          {React.Children.map(children, (child) => (
            <li
              className={cn("cursor-pointer p-1", {
                "text-white": activeTab === child.props.value,
              })}
              onClick={() => setActiveTab(child.props.value)}
            >
              <div>
                <p>{child.props.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-4">
        {
          React.Children.toArray(children).find(
            (child: React.ReactNode): child is React.ReactElement =>
              React.isValidElement(child) && child.props.value === activeTab,
          )?.props.children
        }
      </div>
    </div>
  );
};

export const Tab: React.FC<VerticalTabProps> = ({ value, children }) => (
  <React.Fragment key={value}>{children}</React.Fragment>
);
