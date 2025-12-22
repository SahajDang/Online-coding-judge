import { useState } from "react"
import { judgeAPI } from "../api/problem-api";

export const useProblemExecutor = () => {
    const [code, setCode] = useState('class Solution{int add(int x, int y){}}');
    const [result, setResult] = useState(null);
    const [error, setError] = useState();
    const runCode = async (problem) => {
        try{
            const payload = {
                problemId : "1001",
                language : "java",
                code,
                testcases : problem.sampleTests || []
            };
            const data = await judgeAPI.run(payload);
            console.log('Data is ' , data);
            setResult(data);
        }catch(err){
            console.log('Code Run Failed ', err);
            setError(err.response?.data?.message || "Code Run Fails");
        }
    }

    const submitCode = async (problem) => {
        try{
            const payload = {
                language : "java",
                code,
                testcases : problem.hiddenTests || []
            };
            const data = await judgeAPI.run(payload);
            setResult(data);
        }catch(err){
            console.log('Code Run Failed ', err);
            setError(err.response?.data?.message || "Code Run Fails");
        }
    }

    return {code, setCode, result, error, runCode, submitCode};
}