import React, { useState, useEffect } from "react"
import { Flex, Image, Text, Box, Button } from "@chakra-ui/react"
import Hamburger from "hamburger-react"
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.svg"

interface INavbarMobProps {
    uptime: string
    isResetting: boolean
    handleReset: () => void
}

const NavbarMobile: React.FC<INavbarMobProps> = ({ uptime, handleReset, isResetting }) => {
    const [open, setOpen] = useState<boolean>(false)
    const [confirmOpen, setConformOpen] = useState<boolean>(false)

    const handleResetConfirm = () => {
        handleReset()
        setConformOpen(false)
    }

    return (
        <Flex
            w="100%"
            position="sticky"
            top="0px"
            left="0px"
            height="60px"
            p="0 16px"
            justify="space-between"
            align="center"
            bg="pri.dark"
            zIndex="5"
        >
            <Flex gap={["16px", "30px"]} alignItems="center">
                <Link to="/accounts">
                    <Flex gap={["8px", "16px"]}>
                        <Image src={Logo} width={["30px", "40px"]} />
                        <Text fontFamily="logo" fontSize={["2xl", "3xl"]} color={"pri.orange"}>
                            Fondant
                        </Text>
                    </Flex>
                </Link>
                <Text color="white" fontSize={["12px", "16px"]}>
                    {isResetting
                        ? "Resetting..."
                        : `Uptime: ${uptime.length === 0 ? "Loading..." : uptime}`}
                </Text>
            </Flex>
            <Flex>
                <Hamburger toggled={open} toggle={setOpen} size={35} color="white" rounded />
            </Flex>
            {open ? (
                <Flex position="absolute" right="0" top="65px">
                    <Flex
                        w={["75vw", "55vw", "0"]}
                        h={["90vh", "90vh", "0"]}
                        flexDir="column"
                        background="white"
                        zIndex={90}
                        padding="20px 24px 0 0"
                        alignItems="flex-end"
                        gap="20px"
                        boxShadow="0px 4px 45px 0px rgba(52, 55, 80, 0.15)"
                    >
                        <Link to="/accounts" onClick={() => setOpen(false)}>
                            <Text fontSize={["36px", "42px"]}>Accounts</Text>
                        </Link>
                        <Link to="/blocks" onClick={() => setOpen(false)}>
                            <Text fontSize={["36px", "42px"]}>Blocks</Text>
                        </Link>
                        <Link to="/deploys" onClick={() => setOpen(false)}>
                            <Text fontSize={["36px", "42px"]}>Deploys</Text>
                        </Link>
                        <Link to="/events" onClick={() => setOpen(false)}>
                            <Text fontSize={["36px", "42px"]}>Events</Text>
                        </Link>
                        <Link to="/logs" onClick={() => setOpen(false)}>
                            <Text fontSize={["36px", "42px"]}>Logs</Text>
                        </Link>
                        <Flex gap="20px" margin="50px 0 0 0">
                            <Box
                                bg="green.500"
                                color="white"
                                borderRadius="4px"
                                p="4px 12px"
                                fontWeight="semibold"
                                fontSize="14px"
                                cursor="pointer"
                                //onClick={handleStart}
                            >
                                Start
                            </Box>
                            <Box
                                bg="red.500"
                                color="white"
                                borderRadius="4px"
                                p="4px 12px"
                                fontWeight="semibold"
                                fontSize="14px"
                                cursor="pointer"
                                // onClick={handleStop}
                            >
                                Stop
                            </Box>
                            <Box
                                bg="pri.orange"
                                color="white"
                                borderRadius="4px"
                                p="4px 12px"
                                fontWeight="semibold"
                                fontSize="14px"
                                cursor="pointer"
                                onClick={() => setConformOpen((prev) => !prev)}
                            >
                                Reset
                            </Box>
                        </Flex>
                        {confirmOpen ? (
                            <Flex gap="20px">
                                <Button color="red" w="90px" onClick={() => handleResetConfirm()}>
                                    Reset
                                </Button>
                                <Button
                                    color="green"
                                    w="90px"
                                    onClick={() => setConformOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </Flex>
                        ) : null}
                    </Flex>
                </Flex>
            ) : null}
        </Flex>
    )
}

export default NavbarMobile
