import { Box, Flex, Heading, Card, Text } from "@radix-ui/themes";
export const TeacherDashboard = () => {
    return (<Box style = {{paddingTop : "100px", paddingBottom : "10px"}}>
        <Flex direction = "column" gap = "4" style = {{maxWidth: "100%", margin: "0 auto"}}>

            <Flex align = "center" justify = "center" gap = "3" wrap = "wrap">
            <Card>
                <Heading size = "2"> Welcome {localStorage.role} </Heading>
                <Text size = "5"> UserName </Text>
            </Card>

            <Card>
                <Heading size = "2"> Problem Built </Heading>
                <Text size = "5"> 10 </Text>
            </Card>

            <Card>
                <Heading size = "2"> Student Pass Percentage </Heading>
                <Text size = "5"> 10 </Text>
            </Card>

            <Card>
                <Heading size = "2"> Total Students </Heading>
                <Text size = "5"> 10 </Text>
            </Card>

            <Card>
                <Heading size = "2"> Total Problem Solved </Heading>
                <Text size = "5"> 10 </Text>
            </Card>

            <Card>
                <Heading size = "2"> Problem Built </Heading>
                <Text size = "5"> 10 </Text>
            </Card>

            <Card>
                <Heading size = "2"> Problem Built </Heading>
                <Text size = "5"> 10 </Text>
            </Card>
            </Flex>
        </Flex>

    </Box>
    )
}