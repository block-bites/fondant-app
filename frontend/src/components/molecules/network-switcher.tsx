import { Select } from "@chakra-ui/react";

import { nodesList } from "../../global";

interface INetworkSwitcherProps {
  selectedNode: { key: string; title: string };
  setSelectedNode: React.Dispatch<
    React.SetStateAction<{ key: string; title: string }>
  >;
}

export default function NetworkSwitcher({
  selectedNode,
  setSelectedNode,
}: INetworkSwitcherProps) {
  const handleChangeNode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setSelectedNode(nodesList.filter((item) => item.key === e.target.value)[0]);
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
