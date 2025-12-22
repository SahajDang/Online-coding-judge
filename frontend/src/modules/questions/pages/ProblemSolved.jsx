import {Box, Button, Card, Flex, Heading, Text} from '@radix-ui/themes';
import Editor from '@monaco-editor/react';
import { useProblemExecutor } from '../hooks/useProblemExecutor';
export const ProblemSolved = () => {
    const {code, setCode, runCode, submitCode, result, error} = 
        useProblemExecutor();
    const problem = {
        title : "Add Two Nums",
        statement : 'There is 2 nums and you need to add and then print them.',
        sampleTests : [
            {input : '5 6 \n', expected : "11 \n"},
            {input : '10 20 \n', expected : "30 \n"},
        ],
        hiddenTests : [
            {input : '100 200 \n', expected : "300 \n"},
            {input : '1000 2000 \n', expected : "3000 \n"},
        ],
    };
    return (
    <Box style = {{paddingTop : "100px"}}>
        <Flex gap = "3" wrap = "wrap" style = {{maxWidth: 1200, margin: "0 auto", minHeight : 700}}>

            <Card style={{flex : " 1 1 400px" , minWidth : 360, display: 'flex', flexDirection : 'column', overflow : "hidden"}}> 
                <Heading>{problem.title}</Heading>
                <Text>
                    {problem.statement}
                </Text>
            </Card>

            {/* Right Card - Code Editor */}

            <Card style={{flex : "1 1 400px" , minWidth : 360, display: 'flex', flexDirection : 'column', overflow : "hidden"}}> 
                <Box style ={{flex : 1, marginTop: 10}}>
                    <Editor theme='vs-dark' value={code} onChange={val => setCode(val ?? '')} defaultLanguage='java' height='100%' options={{fontSize : 18, wordWrap : 'on', smoothScrolling: true}}>
                    </Editor>
                </Box>

                <Flex justify= "end" gap = "3" mt = "3">
                    <Button onClick = {() => runCode(problem)} color='orange' variant='soft'>
                    Run
                </Button>

                <Button onClick={() => submitCode(problem)} color='cyan' variant='soft'>
                    Submit
                </Button>
                </Flex>
                {error && (<Text color='red' mt= '2'>
                    {error}
                </Text>)}

                {result && (<Box mt = '4'>
                    <Heading size= "3">
                        Result
                    </Heading>
                    <Text>
                        Passed {result.judgeResponse.summary.passed} / {result.judgeResponse.summary.total}
                    </Text>
                </Box>)}
            </Card>

        </Flex>
    </Box>)
}