import { Select } from "@chakra-ui/react";

import { nodesList } from "../../global";

interface INetworkSwitcherProps {
  selectedNode: { key: string; title: string } | any;
  setSelectedNode: React.Dispatch<
    React.SetStateAction<{ key: string; title: string } | any>
  >;
}

export default function NetworkSwitcher({
  selectedNode,
  setSelectedNode,
}: INetworkSwitcherProps) {
  const handleChangeNode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedNode(nodesList.find((item) => item.key === e.target.value));
  };

  return (
    <Select
      size="sm"
      borderRadius="md"
      borderColor="pri.orange"
      color="pri.orange"
      bg="white"
      fontWeight="bold"
      value={selectedNode.key}
      onChange={(e) => handleChangeNode(e)}
    >
      {nodesList.map((e, idx) => {
        return (
          <option key={idx} value={e.key}>
            {e.title}
          </option>
        );
      })}
    </Select>
  );
}
