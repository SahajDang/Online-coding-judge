import {Button, Flex} from '@radix-ui/themes';
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <Flex gap = "3" mt = "3" align = "center" justify = "center">
            <Button color = "red" variant = "soft" asChild>
                <Link to = "/"> Home </Link>
            </Button>

            <Button color = "orange" variant = "soft" asChild>
                <Link to = "/login"> Login </Link>
            </Button>

            <Button color = "cyan" variant = "soft" asChild>
                <Link to = "/register"> Register </Link>
            </Button>
            </Flex>
    );
}