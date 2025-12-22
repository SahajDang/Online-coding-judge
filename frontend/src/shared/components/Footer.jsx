import { Box, Flex, Text} from '@radix-ui/themes';

export const Footer = () => {
    return (<Box asChild style = {{position : 'fixed', bottom : 0, left: 0, right: 0, zIndex : 900,
        backgroundColor : 'black', color : 'grey', height : '70px' }}
    >
        <footer>
            <Flex align = "center" justify = "center">
                <Text size = "3" weight = "bold">
                    Made with 🤍 by SAHAJ DANG
                </Text>
            </Flex>
        </footer>
    </Box>)
}