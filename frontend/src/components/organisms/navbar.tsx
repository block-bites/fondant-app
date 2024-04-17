import { useEffect, useState } from "react"
import { useLocation, Location } from "react-router-dom"
import { Link } from "react-router-dom"
import Hamburger from "hamburger-react"
import { HStack, Tab, Tabs, TabList, Flex, Icon, Text, Image } from "@chakra-ui/react"
import { FaBell, FaRegFileCode } from "react-icons/fa"
import { BiGridAlt } from "react-icons/bi"
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md"
import NavbarMobile from "../molecules/navbar-mobile"

import Logo from "../../assets/logo.svg"
import NavbarSubbar from "../molecules/navbar-subbar"
import { useIsNetworkLaunchedContext } from "../../context/IsNetworkLaunchedContext"

interface NavbarProps {
    isLaptop: boolean
    isMobile: boolean
}

const Navbar: React.FC<NavbarProps> = ({ isLaptop, isMobile }) => {
    const location: Location = useLocation()
    const [activePath, setActivePath] = useState<string>(location.pathname)
    const [open, setOpen] = useState<boolean>(false)
    const { isNetworkLaunched } = useIsNetworkLaunchedContext()

    useEffect(() => {
        setActivePath(location.pathname)
    }, [location])

    useEffect(() => {
        if (open) {
            setOpen(false)
        }
        // eslint-disable-next-line
    }, [isMobile])

    return (
        <Flex w="100%" direction="column">
            <HStack
                w="100%"
                bg="pri.dark"
                justify="center"
                position={["fixed", "fixed", "absolute"]}
                zIndex={1}
            >
                <HStack
                    maxW="1440px"
                    w="100%"
                    p={["12px 16px", "12px 16px", "12px 32px"]}
                    justify="space-between"
                >
                    <Link to="/">
                        <Flex alignItems="center" gap="8px">
                            <Image src={Logo} width="56px" />
                            <Text fontFamily="logo" fontSize={"3xl"} color={"pri.orange"}>
                                Fondant
                            </Text>
                        </Flex>
                    </Link>
                    <Tabs variant="line" color="pri.orange" size={isLaptop ? "sm" : "lg"}>
                        {isMobile ? (
                            <Flex w="100%" height="50%">
                                <Hamburger
                                    toggled={open}
                                    toggle={() =>
                                        isNetworkLaunched ? setOpen((prev) => !prev) : null
                                    }
                                    size={35}
                                    color={isNetworkLaunched ? "white" : "grey"}
                                    rounded
                                />
                                {open ? (
                                    <NavbarMobile setOpen={setOpen} activePath={activePath} />
                                ) : null}
                            </Flex>
                        ) : (
                            <TabList
                                border="none"
                                justifyContent={isLaptop ? "space-between" : "unset"}
                            >
                                <Link to="/">
                                    <Tab
                                        isDisabled={!isNetworkLaunched}
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/" ? "pri.orange" : "grey.100"}
                                        borderBottom={activePath === "/" ? "2px solid" : "none"}
                                    >
                                        <Icon as={MdSupervisorAccount} size="24px" />
                                        Accounts
                                    </Tab>
                                </Link>
                                <Link to="/blocks">
                                    <Tab
                                        isDisabled={!isNetworkLaunched}
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/blocks" ? "pri.orange" : "grey.100"}
                                        borderBottom={
                                            activePath === "/blocks" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={BiGridAlt} size="24px" />
                                        Blocks
                                    </Tab>
                                </Link>
                                <Link to="/deploys">
                                    <Tab
                                        isDisabled={!isNetworkLaunched}
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={
                                            activePath === "/deploys" ? "pri.orange" : "grey.100"
                                        }
                                        borderBottom={
                                            activePath === "/deploys" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={MdCloudUpload} size="24px" />
                                        Deploys
                                    </Tab>
                                </Link>
                                <Link to="/events">
                                    <Tab
                                        isDisabled={!isNetworkLaunched}
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/events" ? "pri.orange" : "grey.100"}
                                        borderBottom={
                                            activePath === "/events" ? "2px solid" : "none"
                                        }
                                    >
                                        <Icon as={FaBell} size="24px" />
                                        Events
                                    </Tab>
                                </Link>
                                <Link to="/logs">
                                    <Tab
                                        isDisabled={!isNetworkLaunched}
                                        _hover={{
                                            color: "grey.400",
                                            borderColor: "grey.400",
                                        }}
                                        color={activePath === "/logs" ? "pri.orange" : "grey.100"}
                                        borderBottom={activePath === "/logs" ? "2px solid" : "none"}
                                    >
                                        <Icon as={FaRegFileCode} size="24px" />
                                        Logs
                                    </Tab>
                                </Link>
                            </TabList>
                        )}
                    </Tabs>
                </HStack>
            </HStack>
            <NavbarSubbar isMobile />
        </Flex>
    )
}

export default Navbar
