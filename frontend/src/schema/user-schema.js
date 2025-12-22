// Schema Define = Fields + Constraints

import {z} from 'zod';


const nameRegExpression = /^[A-Za-z]{2,25}$/

export const loginSchema = z.object({
    email : z.string({required_error : 'Email is Required'}).
    trim().toLowerCase().email('Enter a valid Email Address'),

    password : z.string({required_error : 'Password is Required'}).
    min(8, "Password can't be less than 8 characters").
    max(25, "Password can't be more than 25 characters")
});

export const loginDefaultValues = {
    email : "",
    password : ""
}

export const registerSchema = z.object({
    name: z.string({ required_error: "Name is Required" })
        .trim()
        .refine(value => nameRegExpression.test(value), {
            message: "Name must be between 2–25 alphabets only",
        }),

    email: z.string({ required_error: "Email is Required" })
        .trim()
        .toLowerCase()
        .email("Enter a valid Email Address"),

    password: z.string({ required_error: "Password is Required" })
        .min(8, "Password can't be less than 8 characters")
        .max(25, "Password can't be more than 25 characters"),

    role: z.enum(["student", "teacher"], {
        required_error: "Role is required",
    })
}).strict();

export const registerDefaultValues = {
    name: "",
    email: "",
    password: "",
    role: "",
};