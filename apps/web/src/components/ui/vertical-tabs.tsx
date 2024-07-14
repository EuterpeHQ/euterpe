import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface VerticalTabsProps {
  defaultValue?: string;
  children: React.ReactElement[];
}

interface VerticalTabProps {
  value: string;
  title: string;
  badge?: string;
  activeTab?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const VerticalTabs: React.FC<VerticalTabsProps> = ({
  defaultValue,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(
    defaultValue || children[0].props.value,
  );
  const childrenCount = React.Children.count(children);
  const heightPerTabItem = 45;
  const tabsHeight = childrenCount * heightPerTabItem;

  return (
    <div className="flex">
      <div
        className="flex w-1/4 gap-2 p-4 pl-0"
        style={{ height: `${tabsHeight}px` }}
      >
        <Separator orientation="vertical" />
        <ul className="space-y-2 text-sm text-muted-foreground">
          {React.Children.map(children, (child) => (
            <li
              className={cn("cursor-pointer p-1", {
                "text-white": activeTab === child.props.value,
              })}
              onClick={() => setActiveTab(child.props.value)}
            >
              <div className="flex items-center gap-2">
                <p>{child.props.title}</p>{" "}
                {child.props.badge && (
                  <Badge variant="outline">{child.props.badge}</Badge>
                )}
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
