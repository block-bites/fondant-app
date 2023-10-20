import { useNavigate } from "react-router-dom";

import {
  Flex,
  TabList,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  Divider,
  Button,
} from "@chakra-ui/react";

import WorkspaceTab from "../organisms/tab-workspace";
import ServerTab from "../organisms/tab-server";
import AccountTab from "../organisms/tab-account";
import ChainTab from "../organisms/tab-chain";
import AbvancedTab from "../organisms/tab-advanced";
import AboutTab from "../organisms/tab-about";
import LoggingTab from "../organisms/tab-logging";
import GasTab from "../organisms/tab-gas";

export default function Settings() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <Tabs variant="enclosed">
      <Flex
        justifyContent="center"
        direction="column"
        alignItems="center"
        m="32px 0"
      >
        <Flex w="100%" justifyContent="space-between" maxW="1440px" p="0 32px">
          <Flex width="100%">
            <TabList border="1px solid grey.200">
              <Tab>Workspace</Tab>
              <Tab>Server</Tab>
              <Tab>Account & keys</Tab>
              <Tab>Chain</Tab>
              <Tab>Advanced</Tab>
              <Tab>Logging</Tab>
              <Tab>Gas</Tab>
              <Tab>About</Tab>
            </TabList>
          </Flex>
          <Button onClick={handleExit} colorScheme="red">
            Exit
          </Button>
        </Flex>
        <Divider m="20px 0" />
        <Flex width="100%" maxW="1440px" justifyContent="flex-start" p="0 32px">
          <TabPanels>
            <TabPanel p="0">
              <WorkspaceTab />
            </TabPanel>
            <TabPanel p="0">
              <ServerTab />
            </TabPanel>
            <TabPanel p="0">
              <AccountTab />
            </TabPanel>
            <TabPanel p="0">
              <ChainTab />
            </TabPanel>
            <TabPanel p="0">
              <AbvancedTab />
            </TabPanel>
            <TabPanel p="0">
              <LoggingTab />
            </TabPanel>
            <TabPanel p="0">
              <GasTab />
            </TabPanel>
            <TabPanel p="0">
              <AboutTab />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Flex>
    </Tabs>
  );
}
