import React, { useState, createContext, useContext, ReactNode } from "react"

// Define the shape of the context
interface IsNetworkLaunchedContextType {
    isNetworkLaunched: boolean
    setIsNetworkLaunched: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the context
export const IsNetworkLaunchedContext = createContext<IsNetworkLaunchedContextType | undefined>(
    undefined
)

// Define the props for IsNetworkLaunchedProvider component
interface IsNetworkLaunchedProps {
    children: ReactNode
}

// IsNetworkLaunchedProvider component
export const IsNetworkLaunchedProvider: React.FC<IsNetworkLaunchedProps> = ({ children }) => {
    const [isNetworkLaunched, setIsNetworkLaunched] = useState<boolean>(false)

    return (
        <IsNetworkLaunchedContext.Provider value={{ isNetworkLaunched, setIsNetworkLaunched }}>
            {children}
        </IsNetworkLaunchedContext.Provider>
    )
}

// Hook to use the IsNetworkLaunchedContext
export const useIsNetworkLaunchedContext = () => {
    const context = useContext(IsNetworkLaunchedContext)
    if (!context) {
        throw new Error("useNodeContext must be used within a NodeProvider")
    }
    return context
}
