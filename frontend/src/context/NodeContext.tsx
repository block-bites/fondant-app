import React, { useState, createContext, useContext, ReactNode } from "react"

// Define the shape of the context
interface NodeContextType {
    nodeNumber: number
    setNodeNumber: React.Dispatch<React.SetStateAction<number>>
}

// Create the context
export const NodeContext = createContext<NodeContextType | undefined>(undefined)

// Define the props for NodeProvider component
interface NodeProviderProps {
    children: ReactNode
}

// NodeProvider component
export const NodeProvider: React.FC<NodeProviderProps> = ({ children }) => {
    const [nodeNumber, setNodeNumber] = useState<number>(1) // Default node number

    return (
        <NodeContext.Provider value={{ nodeNumber, setNodeNumber }}>
            {children}
        </NodeContext.Provider>
    )
}

// Hook to use the NodeContext
export const useNodeContext = () => {
    const context = useContext(NodeContext)
    if (!context) {
        throw new Error("useNodeContext must be used within a NodeProvider")
    }
    return context
}
