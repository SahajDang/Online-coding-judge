// src/utils/services/judge.js
// --------------------------------------------------------------------
// Java + Docker judge helper
// --------------------------------------------------------------------
// 1. Create a temp folder
// 2. Write Main.java + cases.txt
// 3. Run Docker image: online-judge-app-compiler:latest
// 4. Read outputs, build summary + per-case verdict
// --------------------------------------------------------------------

import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { exec } from "child_process";

const sh = (cmd, opts = {}) =>
  new Promise((res, rej) =>
    exec(cmd, opts, (err, stdout, stderr) =>
      err ? rej({ err, stdout, stderr }) : res({ stdout, stderr })
    )
  );

// normalize outputs so stray spaces/newlines don't break answers
const normalize = (s) =>
  (s || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim()
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n");

// core function: compile once, run many
export async function judgeJava({ source, testcases, timeLimitMs = 2000 }) {
  // Use absolute path
  const dir = await fs.mkdtemp(path.join("/tmp", "judge-"));
  const absoluteDir = path.resolve(dir);
  
  console.log(`[JUDGE] Created temp directory: ${absoluteDir}`);

  try {
    // Write files
    await fs.writeFile(path.join(absoluteDir, "Main.java"), source, "utf8");
    console.log(`[JUDGE] Wrote Main.java`);

    const tsec = Math.ceil(timeLimitMs / 1000);
    const toB64 = (s) => Buffer.from(s ?? "").toString("base64");
    const lines =
      testcases
        .map(
          (tc, i) =>
            `${i}\t${tsec}\t${toB64(tc.input)}\t${toB64(tc.expected)}`
        )
        .join("\n") + "\n";
    await fs.writeFile(path.join(absoluteDir, "cases.txt"), lines, "utf8");
    console.log(`[JUDGE] Wrote cases.txt`);

    // Verify files exist
    const files = await fs.readdir(absoluteDir);
    console.log(`[JUDGE] Files created:`, files);

    // Run Docker with explicit absolute path
    const cmd = [
      "docker run --rm",
      "--cpus=0.5",
      "--memory=256m",
      "--pids-limit=64",
      "--network=none",
      "--security-opt=no-new-privileges",
      "-v",
      `${absoluteDir}:/workspace:rw`,
      "online-judge-app-compiler:latest",
    ].join(" ");

    console.log(`[JUDGE] Executing: ${cmd}`);
    await sh(cmd);
    console.log(`[JUDGE] Docker execution completed`);

    // Check what was created
    const filesAfter = await fs.readdir(absoluteDir);
    console.log(`[JUDGE] Files after execution:`, filesAfter);

    // Read results
    const reportText = await safeRead(path.join(absoluteDir, "report.jsonl"));
    console.log(`[JUDGE] report.jsonl:\n${reportText}`);

    const compileErr = await safeRead(path.join(absoluteDir, "compile_err.txt"));
    const events = reportText
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((l) => {
        try {
          return JSON.parse(l);
        } catch {
          return {};
        }
      });

    // compile error?
    if (events[0]?.status === "COMPILE_ERROR") {
      return {
        summary: { total: testcases.length, passed: 0, allPassed: false },
        cases: testcases.map((_, idx) => ({
          idx,
          verdict: "CE",
          timeMs: 0,
          stdout: "",
          compileErr,
          runtimeErr: "",
        })),
      };
    }

    // build per-case verdicts
    const results = [];
    for (let i = 0; i < testcases.length; i++) {
      const out = await safeRead(path.join(absoluteDir, `out/case-${i}.txt`));
      const err = await safeRead(path.join(absoluteDir, `out/case-${i}-err.txt`));
      const ev = events.find((e) => e.idx === i);

      if (ev?.status === "RUNTIME_ERROR_OR_TLE") {
        results.push({
          idx: i,
          verdict: "RE",
          timeMs: 0,
          stdout: out,
          compileErr: "",
          runtimeErr: err,
        });
      } else {
        const pass = normalize(out) === normalize(testcases[i].expected);
        results.push({
          idx: i,
          verdict: pass ? "PASSED" : "WA",
          timeMs: 0,
          stdout: out,
          compileErr: "",
          runtimeErr: err,
        });
      }
    }

    const passed = results.filter((r) => r.verdict === "PASSED").length;
    return {
      summary: { total: results.length, passed, allPassed: passed === results.length },
      cases: results,
    };
  } finally {
    // Cleanup
    await fs.rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

async function safeRead(p) {
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return "";
  }
}