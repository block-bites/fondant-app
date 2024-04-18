import { Flex, Text } from "@chakra-ui/react"
import { FaBell, FaRegFileCode } from "react-icons/fa"
import { BiGridAlt } from "react-icons/bi"
import { MdCloudUpload, MdSupervisorAccount } from "react-icons/md"
import { Link } from "react-router-dom"

interface INavbarMobProps {
    activePath: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NavbarMobile: React.FC<INavbarMobProps> = ({ setOpen, activePath }) => {
    return (
        <Flex position="fixed" right="0" top="146px" zIndex={65}>
            <Flex
                w={["250px", "250px", "0"]}
                h="100vh"
                flexDir="column"
                background="pri.dark"
                color="grey.100"
                padding="30px 24px 50px 0"
                alignItems="flex-end"
                gap="15px"
            >
                <Link to="/" onClick={() => setOpen(false)}>
                    <Flex
                        alignItems="center"
                        gap="15px"
                        justifyContent="center"
                        color={activePath === "/" ? "pri.orange" : "grey.100"}
                        borderBottom={activePath === "/" ? "2px solid" : "none"}
                    >
                        <MdSupervisorAccount size="24px" />
                        <Text fontSize="28px">Accounts</Text>
                    </Flex>
                </Link>
                <Link to="/blocks" onClick={() => setOpen(false)}>
                    <Flex
                        alignItems="center"
                        gap="15px"
                        justifyContent="center"
                        color={activePath === "/blocks" ? "pri.orange" : "grey.100"}
                        borderBottom={activePath === "/blocks" ? "2px solid" : "none"}
                    >
                        <BiGridAlt size="24px" />
                        <Text fontSize="28px">Blocks</Text>
                    </Flex>
                </Link>
                <Link to="/deploys" onClick={() => setOpen(false)}>
                    <Flex
                        alignItems="center"
                        gap="15px"
                        justifyContent="center"
                        color={activePath === "/deploys" ? "pri.orange" : "grey.100"}
                        borderBottom={activePath === "/deploys" ? "2px solid" : "none"}
                    >
                        <MdCloudUpload size="24px" />
                        <Text fontSize="28px">Deploys</Text>
                    </Flex>
                </Link>
                <Link to="/events" onClick={() => setOpen(false)}>
                    <Flex
                        alignItems="center"
                        gap="15px"
                        justifyContent="center"
                        color={activePath === "/events" ? "pri.orange" : "grey.100"}
                        borderBottom={activePath === "/events" ? "2px solid" : "none"}
                    >
                        <FaBell size="24px" />
                        <Text fontSize="28px">Events</Text>
                    </Flex>
                </Link>
                <Link to="/logs" onClick={() => setOpen(false)}>
                    <Flex
                        alignItems="center"
                        gap="15px"
                        justifyContent="center"
                        color={activePath === "/logs" ? "pri.orange" : "grey.100"}
                        borderBottom={activePath === "/logs" ? "2px solid" : "none"}
                    >
                        <FaRegFileCode size="24px" />
                        <Text fontSize="28px">Logs</Text>
                    </Flex>
                </Link>
            </Flex>
        </Flex>
    )
}

export default NavbarMobile
