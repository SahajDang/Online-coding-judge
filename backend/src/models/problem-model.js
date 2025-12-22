import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
    {
        input : { type : String, required : true},
        expected : { type : String, required : true},
    },

    {_id : false}
);

const problemSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : [true, "Title is Required"],
            trim : true,
        },

        statement : {
            type : String,
            required : [true, "Statement is Required"],
        },

        langauge : {
            type : String,
            enum : ["java"], // extend later if needed
            default : "java",
        },

        starterCode : {
            type : String,
            required : [true, "Starter code is required"],
        },

        difficulty : {
            type : String,
            enum : ["easy", "medium", "hard"],
            default : "easy",
        },

        // Visible in UI and used for "Run"

        sampleTests : {
            type : [testCaseSchema],
            default : [],
        },

        // Hidden, used only for "Submit" / scoring
        hiddenTests : {
            type : [testCaseSchema],
            default : [],
        },

        // Who Created the Problem

        createdBy : {type : mongoose.Schema.Types.ObjectId, ref : "User"},
        isActive : {type : Boolean, default : true},
    },
    {timestamps : true}
);

export const Problem = mongoose.model("Problem", problemSchema);