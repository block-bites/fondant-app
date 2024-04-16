import React, { useState, createContext, useContext, ReactNode } from "react"

// Define the shape of the context
interface IsNetworkRunningContextType {
    isNetworkRunning: boolean
    setIsNetworkRunning: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context
export const IsNetworkRunningContext = createContext<IsNetworkRunningContextType | undefined>(
    undefined
)

// Define the props for IsNetworkRunningProvider component
interface IsNetworkRunningProps {
    children: ReactNode
}

// IsNetworkRunningProvider component
export const IsNetworkRunningProvider: React.FC<IsNetworkRunningProps> = ({ children }) => {
    const [isNetworkRunning, setIsNetworkRunning] = useState<boolean>(false)

    return (
        <IsNetworkRunningContext.Provider value={{ isNetworkRunning, setIsNetworkRunning }}>
            {children}
        </IsNetworkRunningContext.Provider>
    )
}

// Hook to use the IsNetworkRunningContext
export const useIsNetworkRunningContext = () => {
    const context = useContext(IsNetworkRunningContext)
    if (!context) {
        throw new Error("useNodeContext must be used within a NodeProvider")
    }
    return context
}
