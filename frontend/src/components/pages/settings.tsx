import {
  Flex,
  VStack,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Divider,
  Stack,
} from "@chakra-ui/react";

import ServerTab from "../organisms/server-tab";

export default function Settings() {
  return (
    <Tabs w="100%" variant="enclosed">
      <Flex
        w="100%"
        justifyContent="center"
        direction="column"
        alignItems="center"
        m="32px 0"
      >
        <Flex width="100%" maxW="1440px" p="0 32px">
          <TabList border="1px solid grey.200">
            <Tab>Workspace</Tab>
            <Tab>Server</Tab>
            <Tab>Account & keys</Tab>
            <Tab>Chain</Tab>
            <Tab>Advanced</Tab>
            <Tab>About</Tab>
          </TabList>
        </Flex>
        <Divider m="20px 0" borderTop="1px grey.100 solid" />
        <Flex width="100%" maxW="1440px" justifyContent="flex-start" p="0 32px">
          <TabPanels>
            <TabPanel p="0">
              <p>Workspace!</p>
            </TabPanel>
            <TabPanel p="0">
              <ServerTab />
            </TabPanel>
            <TabPanel p="0">
              <p>Account & keys!</p>
            </TabPanel>
            <TabPanel p="0">
              <p>Chains!</p>
            </TabPanel>
            <TabPanel p="0">
              <p>Advanced!</p>
            </TabPanel>
            <TabPanel p="0">
              <p>About!</p>
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  );
}
