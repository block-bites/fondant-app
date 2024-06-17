import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { defaultClient } from "../../casper-client"
import { Box, Flex, Text } from "@chakra-ui/react"

interface DeployDetailsProps {
    deploys: any[]
    setDeploys: React.Dispatch<React.SetStateAction<any[]>>
}

const DeployDetails: React.FC<DeployDetailsProps> = ({ setDeploys, deploys }) => {
    const { deployHash } = useParams()
    const [deployInfo, setDeployInfo] = useState<any>()

    // const defaultClient.casperService.getDeployInfo()
    // console.log(deploys.filter((e) => e.DeployProcessed.deploy_hash === deployHash))

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                let info
                if (deployHash) {
                    info = await defaultClient.casperService.getDeployInfo(deployHash)
                    setDeployInfo(info)
                    console.log("1")
                }
            } catch (error) {
                console.error("Error fetching latest block info:", error)
            }
        }
        fetchInfo()
        // eslint-disable-next-line
    }, [])

    console.log(deployInfo)

    if (!deployInfo) {
        return (
            <Flex justifyContent="center" height="calc(100vh - 148px)" alignItems="center">
                <Box overflowY="auto" p={3}>
                    <Flex w="100%" justify="center" mt={["144px", "144px", "0"]}>
                        <Text color="grey.400">No details info available to display</Text>
                    </Flex>
                </Box>
            </Flex>
        )
    }

    return (
        <Flex
            direction="column"
            width="100%"
            alignItems="center"
            m={["138px 0 0 0", "148px 0 0 0", "80px 0 0 0"]}
        >
            {deployInfo !== undefined ? deployInfo.api_version : null}
        </Flex>
    )
}

export default DeployDetails
