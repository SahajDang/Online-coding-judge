import {z} from 'zod';

const nameRegExpression = /^[A-Za-z ]{2,25}$/;
export const registerSchema = z.object({
    name: z.string({required_error:"Name is Required"})
    .trim().refine(value=>nameRegExpression.test(value),
    {message:'Name must be in b/w 2 to 25 chars and only in alphabet'}),
    
    email:z.string({required_error:'Email is Required'})
    .trim().toLowerCase().email('Enter a Email Here'),

    password:z.string({required_error:'Password is Required'})
    .min(8, "Password must be at least 8 chars long")
    .max(25, 'Password Not More than 25 chars'), 

    role: z.enum(["student", "teacher"], {
        required_error: "Role is required"
    })
}).strict();


export const loginSchema = z.object({
   
    email:z.string({required_error:'Email is Required'})
    .trim().toLowerCase().email('Enter a Email Here'),
    password:z.string({required_error:'Password is Required'})
    .min(8, "Password must be at least 8 chars long")
    .max(25, 'Password Not More than 25 chars')

}).strict();
