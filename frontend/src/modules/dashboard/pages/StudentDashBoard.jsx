import { Box, Flex, Heading, Card, Text} from "@radix-ui/themes";
import { Link } from "react-router-dom";
export const StudentDashboard = () => {
    return (<Box style = {{paddingTop : "100px", paddingBottom : "10px"}}>
        <Flex direction = "column" gap = "4" style = {{maxWidth: "100%", margin: "0 auto"}}>

            <Card>
                <Heading size = "2"> Welcome </Heading>
                <Text size = "5"> UserName </Text>
            </Card>

            <Card>
                <Heading size = "2"> Problem Solved </Heading>
                <Link to= "/problem" asChild> 
                <Text>Add Two Numbers</Text> 
                </Link>
                <Text size = "5"> 5 </Text>
            </Card>
        </Flex>
    </Box>
    )
}