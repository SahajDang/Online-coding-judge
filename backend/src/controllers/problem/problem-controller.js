import { Problem } from "../models/problem-model.js";

/* ---------------------------------------------------------
   CREATE A NEW PROBLEM  (Teacher Only)
---------------------------------------------------------- */
export const createProblem = async (req, res, next) => {
  try {
    const teacherId = req.user._id; // from auth middleware

    const problem = await Problem.create({
      ...req.body,
      createdBy: teacherId,
    });

    res.status(201).json({
      success: true,
      message: "Problem created successfully",
      problem,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------------
   GET ALL PROBLEMS
---------------------------------------------------------- */
export const getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find()
      .select("-hiddenTests") // Do NOT expose hidden tests
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      problems,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------------
   GET ONE PROBLEM (Student View → Hide hiddenTests)
---------------------------------------------------------- */
export const getProblemById = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id).select(
      "-hiddenTests"
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------------
   GET FULL PROBLEM (Teacher/Admin View → Shows hidden tests)
---------------------------------------------------------- */
export const getProblemAdminView = async (req, res, next) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      problem,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------------
   UPDATE PROBLEM
---------------------------------------------------------- */
export const updateProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem updated successfully",
      problem,
    });
  } catch (error) {
    next(error);
  }
};

/* ---------------------------------------------------------
   DELETE PROBLEM
---------------------------------------------------------- */
export const deleteProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
