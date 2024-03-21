import { useState, useEffect } from "react"
import { SearchProvider } from "./context/SearchContext"
import { NodeProvider } from "./context/NodeContext"
import { HelmetProvider } from "react-helmet-async"

import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { fondantTheme } from "./styles/theme"

import Navbar from "./components/organisms/navbar"
import Accounts from "./components/pages/accounts"
import Blocks from "./components/pages/blocks"
import Logs from "./components/pages/logs"
import Settings from "./components/pages/settings"
import Events from "./components/pages/events"
import Deploys from "./components/pages/deploys"
import Start from "./components/pages/start"

export const App = () => {
    return (
        <NodeProvider>
            <HelmetProvider>
                <ChakraProvider theme={fondantTheme}>
                    <SearchProvider>
                        <Router>
                            <AppContent />
                        </Router>
                    </SearchProvider>
                </ChakraProvider>
            </HelmetProvider>
        </NodeProvider>
    )
}

function AppContent() {
    // we can move it to separate components
    const location = useLocation()
    const isSettingsPage = location.pathname === "/settings"
    const isStartPage = location.pathname === "/"

    const [screenWidth, setScreenWidth] = useState<number>(0)
    const [isLaptop, setIsLaptop] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        setIsLaptop(window.innerWidth >= 768 && window.innerWidth < 1024)
        setIsMobile(window.innerWidth < 768)
    }, [screenWidth])

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <>
            {!isSettingsPage && !isStartPage && <Navbar isLaptop={isLaptop} isMobile={isMobile} />}
            <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/blocks" element={<Blocks />} />
                <Route path="/deploys" element={<Deploys />} />
                <Route path="/events" element={<Events />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}
