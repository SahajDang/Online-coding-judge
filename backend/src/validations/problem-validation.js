import { z } from "zod";

const testCaseSchema = z.object({
    input: z.string().min(1, "Input is required"),
    expected: z.string().min(1, "Expected output is required"),
});

export const createProblemSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),

    statement: z.string().trim().min(1, "Statement is required"),

    langauge: z.enum(["java"]).default("java"),

    starterCode: z.string().min(1, "Starter code is required"),

    difficulty: z.enum(["easy", "medium", "hard"]).default("easy"),

    sampleTests: z.array(testCaseSchema).default([]),

    hiddenTests: z.array(testCaseSchema).default([]),

    createdBy: z.string().optional(),
});
