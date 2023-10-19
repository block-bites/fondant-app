import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Flex,
} from "@chakra-ui/react";

interface ISettingsAlert {
  alertDesc: string;
}

export default function SettingsAlert({ alertDesc }: ISettingsAlert) {
  return (
    <Alert maxW="400px" variant="subtle" status="error">
      <AlertIcon />
      <Flex direction="column">
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>{alertDesc}</AlertDescription>
      </Flex>
    </Alert>
  );
}
