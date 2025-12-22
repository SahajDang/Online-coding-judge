import {z} from 'zod';

export const judgeRunSchema = z.object({
    problemId : z.string({required_error : 'Problem Id is Required'})
    .trim(),
    language : z.string({required_error : 'Language is Required'})
    .trim().toLowerCase().refine(lang => ['javascript', 'cpp', 'java', 'python']
        .includes(lang), {message : "Unsupported Language"}),

    code : z.string({required_error : 'Code is Required'}).min(1, 'Code can not be empty')
});

export const judgeSubmitSchema = judgeRunSchema;