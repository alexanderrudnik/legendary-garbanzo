import React from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  TabsProps,
} from "@chakra-ui/react";

interface Props extends Omit<TabsProps, "children"> {
  tabs: {
    label: string;
    panel: React.ReactNode;
  }[];
}

const BaseTabs = React.forwardRef<any, Props>(({ tabs, ...props }, ref) => {
  return (
    <Tabs ref={ref} {...props}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.label}>{tab.label}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.label}>{tab.panel}</TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
});

export default BaseTabs;
