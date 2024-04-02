// import { useSearchContext } from "../../context/SearchContext"
import { Helmet } from "react-helmet-async"

import { Flex, Spinner, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Start = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("http://localhost:3001/launch", {
                method: "POST",
            })
            console.log(response)
            if (response.ok) {
                navigate("/accounts")
            } else {
                console.error("Server error:", response.status)
                // Handle server errors here
            }
        } catch (error) {
            console.error("Network error:", error)
            // Handle network errors here
        }
        setIsLoading(false)
    }
    useEffect(() => {
        const checkStatus = async () => {
            setIsLoading(true)
            try {
                const response = await fetch("http://localhost:3001/run/cctl-infra-net-status", {
                    method: "POST",
                })
                console.log(response)
                if (response.ok) {
                    navigate("/accounts")
                } else {
                    console.error("Server error:", response.status)
                    // Handle non-200 responses here
                }
            } catch (error) {
                console.error("Network error:", error)
                // Handle network errors here
            }
            setIsLoading(false)
        }

        checkStatus()
    }, [navigate])
    if (isLoading) {
        return (
            <Flex w="100%" h="100vh" align="center" justify="center" bg="white">
                <Spinner size="xl" />
            </Flex>
        )
    }
    return (
        <>
            <Helmet>
                <title>Fondant</title>
            </Helmet>
            <Flex w="100%" h="100vh" align="center" justify="center">
                <Button colorScheme="blue" size="lg" onClick={handleClick}>
                    Start
                </Button>
            </Flex>
        </>
    )
}

export default Start
