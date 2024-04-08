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
import { NODE_URL_PORT } from "./constant"

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
    const location = useLocation()
    const isSettingsPage = location.pathname === "/settings"

    const [screenWidth, setScreenWidth] = useState<number>(0)
    const [isLaptop, setIsLaptop] = useState<boolean>(false)
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isNetworkLaunched, setIsNetworkLaunched] = useState<boolean>(false)
    const [isNetworkRunning, setIsNetworkRunning] = useState<boolean>(false)

    useEffect(() => {
        setIsLaptop(window.innerWidth >= 768 && window.innerWidth < 1024)
        setIsMobile(window.innerWidth < 768)
    }, [screenWidth])

    useEffect(() => {
        checkStatus()
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const checkStatus = async () => {
        try {
            const response = await fetch(`${NODE_URL_PORT}/status`)
            const resJson = await response.json()
            if (response.ok) {
                if (resJson.message === "") {
                    console.log("Network status: NOT LAUNCHED")
                    setIsNetworkLaunched(false)
                    setIsNetworkRunning(false)
                }
                if (resJson.message === "running") {
                    console.log("Network status: RUNNING")
                    setIsNetworkLaunched(true)
                    setIsNetworkRunning(true)
                }
                if (resJson.message === "stopped") {
                    console.log("Network status: STOPPED")
                    setIsNetworkLaunched(true)
                    setIsNetworkRunning(false)
                }
            }
        } catch (error) {
            setIsNetworkRunning(false)
            setIsNetworkLaunched(false)
            console.error("Error fetching system status:", error)
        }
    }

    return (
        <>
            {!isSettingsPage && (
                <Navbar
                    isNetworkLaunched={isNetworkLaunched}
                    setIsNetworkLaunched={setIsNetworkLaunched}
                    isNetworkRunning={isNetworkRunning}
                    setIsNetworkRunning={setIsNetworkRunning}
                    isLaptop={isLaptop}
                    isMobile={isMobile}
                />
            )}
            <Routes>
                <Route path="/" element={<Accounts isNetworkLaunched={isNetworkLaunched} />} />
                <Route path="/blocks" element={<Blocks />} />
                <Route path="/deploys" element={<Deploys />} />
                <Route path="/events" element={<Events isNetworkRunning={isNetworkRunning} />} />
                <Route path="/logs" element={<Logs />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    )
}
