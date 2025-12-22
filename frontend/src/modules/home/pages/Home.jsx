import {Card, Heading, Text, Separator, Flex} from '@radix-ui/themes';
import bgImage from "../../../assets/Online-Coding-Judge.jpg";

export const Home = () => {
    const URL = bgImage;

    return (
        <div style={{position: "relative", height: "100vh", width : "100%", overflow : "hidden"}}>
            <img src = {URL}  alt="CODING CONTEST" style={{width : "100%", height : "100%", objectFit : "cover", filter : "brightness(0.50)"}}/>
        <Flex direction = "column" align = "center" justify = "center" style={{position : "absolute", inset : 0, color : "white", textAlign: "center", gap : "1rem"}}>
        <Card 
        size = "4">
            
            <Heading>
                Welcome to my Coding Judge
            </Heading>
            <Text color = "red" size = "3">
                Practice DSA Here
            </Text>
            <Separator/>            
        </Card>
        </Flex>
        </div>
    );
};

