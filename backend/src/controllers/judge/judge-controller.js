import { judgeJava } from "../../utils/services/judge.js";

function driverCode(solutionCode){
    return `import java.util.*;

public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    Solution s = new Solution();
    System.out.println(s.add(a, b));
  }
}

// Student code goes below. They must implement:
//   class Solution { int add(int a, int b) { ... } }
${solutionCode}`;
}

export const runCode = async (request, response)=>{
    try{
        const {problemId, code, language, testcases} = request.body;
        
        if(language !='java'){
            return response.status(500).json({message:'Currently We Have Support of Java Language in Our Judge'});
        }
        if(!code){
            return response.status(404).json({message:'Code is Required'});
        }

        const fullCode = driverCode(code);
        const judgeResponse = await judgeJava({
            source : fullCode, testcases, timeLimitMs:2000
        })
        console.log('Judge Response ', judgeResponse);
        return response.status(200).json({
  message: "Run Completed",
  problemId,
  judgeResponse: {
    summary: {
      passed: judgeResponse?.summary?.passed ?? 1,
      total: judgeResponse?.summary?.total ?? 1,
      allPassed: judgeResponse?.summary?.allPassed ?? true
    },
    output: judgeResponse?.output ?? judgeResponse
  }
});

        

        
        // BackEnd DB Problem Store - And Fetch Here from the Problem Model (Schema)
        // const problem = {
        //     problemId : 1001,
        //     language :'java',
        //     code :'',
        //     testcases : [] // Sample Testcase will be here
        // }
        // Now Run the Code

    }
    catch(err){
        console.log('Error is ', err);
        response.status(500).json({message:"Fail to run this code"});
    }
}

export const submitCode = (request, response)=>{
    try{
        const {problemId, code, language} = request.body;
        if(language !='java'){
            return response.status(500).json({message:'Currently We Have Support of Java Language in Our Judge'});
        }
        // BackEnd DB Problem Store - And Fetch Here from the Problem Model (Schema)
        const problem = {
            problemId : 1001,
            language :'java',
            code :'',
            testcases : [] // Hidden TestCases will be here
        }
        // Now Run the Code

    }
    catch(err){
        console.log('Error is ', err);
        response.status(500).json({message:"Fail to run this code"});
    }
}
