import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Flex, Image, Text, Box, Button } from "@chakra-ui/react"
import Hamburger from "hamburger-react"
import { FaBell, FaRegFileCode } from "react-icons/fa"
import { BiGridAlt } from "react-icons/bi"
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md"
import Logo from "../../assets/logo.svg"

interface INavbarMobProps {
    uptime: string
    isResetting: boolean
    isSystemRunning: boolean
    handleReset: () => void
    handleStart: () => void
    handleStop: () => void
}

const NavbarMobile: React.FC<INavbarMobProps> = ({
    uptime,
    isResetting,
    isSystemRunning,
    handleReset,
    handleStart,
    handleStop,
}) => {
    const [open, setOpen] = useState<boolean>(false)
    const [confirmOpen, setConformOpen] = useState<boolean>(false)

    const handleResetConfirm = () => {
        handleReset()
        setConformOpen(false)
        setOpen(false)
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
                        ? "Uptime resetting..."
                        : uptime.length === 0
                          ? "Uptime loading..."
                          : `Uptime: ${uptime}`}
                </Text>
            </Flex>
            <Flex>
                <Hamburger toggled={open} toggle={setOpen} size={35} color="white" rounded />
            </Flex>
            {open ? (
                <>
                    <Box
                        position="fixed"
                        top="0"
                        left="0"
                        width="100vw"
                        height="100vh"
                        bg="transparent"
                        zIndex="2"
                        onClick={() => setOpen(false)}
                    />
                    <Flex position="absolute" right="0" top="60px">
                        <Flex
                            w={["75vw", "55vw", "0"]}
                            h={["90vh", "90vh", "0"]}
                            flexDir="column"
                            background="white"
                            zIndex={90}
                            padding="20px 24px 0 0"
                            alignItems="flex-end"
                            gap="15px"
                            boxShadow="0px 4px 45px 0px rgba(52, 55, 80, 0.15)"
                        >
                            <Link to="/accounts" onClick={() => setOpen(false)}>
                                <Flex alignItems="center" gap="15px" justifyContent="center">
                                    <MdSupervisorAccount size="24px" />
                                    <Text fontSize={["36px", "42px"]}> Accounts</Text>
                                </Flex>
                            </Link>
                            <Link to="/blocks" onClick={() => setOpen(false)}>
                                <Flex alignItems="center" gap="15px" justifyContent="center">
                                    <BiGridAlt size="24px" />
                                    <Text fontSize={["36px", "42px"]}>Blocks</Text>
                                </Flex>
                            </Link>
                            <Link to="/deploys" onClick={() => setOpen(false)}>
                                <Flex alignItems="center" gap="15px" justifyContent="center">
                                    <MdCloudUpload size="24px" />
                                    <Text fontSize={["36px", "42px"]}>Deploys</Text>
                                </Flex>
                            </Link>
                            <Link to="/events" onClick={() => setOpen(false)}>
                                <Flex alignItems="center" gap="15px" justifyContent="center">
                                    <FaBell size="24px" />
                                    <Text fontSize={["36px", "42px"]}>Events</Text>
                                </Flex>
                            </Link>
                            <Link to="/logs" onClick={() => setOpen(false)}>
                                <Flex alignItems="center" gap="15px" justifyContent="center">
                                    <FaRegFileCode size="24px" />
                                    <Text fontSize={["36px", "42px"]}>Logs</Text>
                                </Flex>
                            </Link>
                            <Flex gap="20px" margin="50px 0 0 0">
                                {!isSystemRunning ? (
                                    <Box
                                        bg="green.500"
                                        color="white"
                                        borderRadius="4px"
                                        p="4px 12px"
                                        fontWeight="semibold"
                                        fontSize="14px"
                                        cursor="pointer"
                                        onClick={handleStart}
                                    >
                                        Start
                                    </Box>
                                ) : (
                                    <Box
                                        bg="red.500"
                                        color="white"
                                        borderRadius="4px"
                                        p="4px 12px"
                                        fontWeight="semibold"
                                        fontSize="14px"
                                        cursor="pointer"
                                        onClick={handleStop}
                                    >
                                        Stop
                                    </Box>
                                )}
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
                                    <Button
                                        color="red"
                                        w="90px"
                                        onClick={() => handleResetConfirm()}
                                    >
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
                </>
            ) : null}
        </Flex>
    )
}

export default NavbarMobile
