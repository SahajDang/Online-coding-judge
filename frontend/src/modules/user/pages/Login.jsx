import { Heading, Card, TextField, Text, Button, Flex } from "@radix-ui/themes";
import { useLoginForm } from "../hooks/useLoginForm";

export const Login = () => {
    const {form, onSubmit} = useLoginForm();
    const {register, formState : {errors}, } = form;
    return (
        <div>
            <Card size="4" style={{ maxWidth: 500, marginInline: "auto", marginTop: "5rem" }}>
                <Heading align="center">Login</Heading>
                <form 
                onSubmit={(event) =>{
                    event.preventDefault();
                    onSubmit();
                }}>
                    <Flex direction="column" gap="3" mt="3">
                        <div>
                            <Text as="label" size="2" color="orange">Email</Text>
                            <TextField.Root type = "email" {...register("email")} placeholder="Type Email Here" />
                            {errors.email && (<Text size = "2" color="red">
                                {errors.email.message}
                            </Text>
                            )}
                        </div>

                        <div>
                            <Text as="label" size="2" color="cyan">Password</Text>
                            <TextField.Root type="password" {...register("password")} placeholder="Type Password Here" />
                            {errors.password && (<Text size = "2" color="red">
                                {errors.password.message}
                            </Text>
                            )}
                        </div>

                        <div>
                            <Button variant="soft" color="cyan">
                                Login
                            </Button>
                        </div>
                    </Flex>
                </form>
            </Card>
        </div>
    );
};