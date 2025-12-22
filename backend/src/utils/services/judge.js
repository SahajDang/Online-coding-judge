import axios from "axios";

export async function judgeJava({ source, testcases, timeLimitMs = 2000 }) {
  const JUDGE_URL = process.env.JUDGE_URL;

  if (!JUDGE_URL) {
    throw new Error("JUDGE_URL not configured");
  }

  const payload = {
    code: source,
    input: testcases?.[0]?.input || ""
  };

  try {
    const response = await axios.post(
      `${JUDGE_URL}/run`,
      payload,
      { timeout: 30000 }
    );

    return response.data;
  } catch (err) {
    console.error("Judge HTTP Error:", err.message);
    throw err;
  }
}
