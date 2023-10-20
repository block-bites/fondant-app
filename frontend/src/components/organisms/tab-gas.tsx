import { Flex, Input, Text, Select } from "@chakra-ui/react";
import SettingsAlert from "../atoms/settings-alert";

export default function GasTab() {
  return (
    <Flex w="100%" justifyContent="space-between" alignItems="flex-start">
      <Flex direction="column" gap="56px" w="680px">
        <Text
          fontFamily="secondary"
          fontSize="5xl"
          lineHeight="shorter"
          fontWeight="normal"
        >
          Gas
        </Text>
        <Flex direction="column" gap="16px">
          <Input variant="filled" size="sm" placeholder="Enter price" />
          <Text fontSize="sm" color="grey.400">
            The price of each unit of gas, in WEI. Leave blank for default.
          </Text>
        </Flex>
        <Flex direction="column" gap="24px">
          <Text fontSize="xl" fontWeight="normal" lineHeight="base">
            Hardfork
          </Text>
          <Flex direction="column" gap="16px">
            <Select>
              <option value="option1">Merge</option>
              <option value="option2">Don't merge</option>
              <option value="option3">Funny 3rd option</option>
            </Select>
            <Text fontSize="sm" color="grey.400">
              The price of each unit of gas, in WEI. Leave blank for default.
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <SettingsAlert alertDesc="Gas limits can only be updated when creating a new workspace." />
    </Flex>
  );
}
