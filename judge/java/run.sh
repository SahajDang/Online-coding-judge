#!/bin/sh
set -e

cd /workspace
mkdir -p out

##############################################
# 1) COMPILE Main.java
##############################################
if ! javac Main.java 2> compile_err.txt; then
  echo '{"status":"COMPILE_ERROR"}' > report.jsonl
  exit 0
fi

# fresh report file
> report.jsonl


##############################################
# 2) Iterate testcases from cases.txt
##############################################
while IFS="$(printf '\t')" read -r idx tsec bin_in bin_exp; do
  
  # ignore empty lines
  [ -z "$idx" ] && continue

  ##############################################
  # 2A) Decode base64 input + expected
  # Alpine needs `-d -` OR `echo -n`
  ##############################################
  echo -n "$bin_in"  | base64 -d - > in.txt
  echo -n "$bin_exp" | base64 -d - > exp.txt

  ##############################################
  # 2B) Run program with timeout
  ##############################################
  if timeout "${tsec}s" sh -c "java Main < in.txt" \
        > "out/case-${idx}.txt" \
        2> "out/case-${idx}-err.txt"
  then
      # completed normally
      echo "{\"idx\":${idx},\"status\":\"OK\"}" >> report.jsonl
  else
      # RE or TLE
      echo "{\"idx\":${idx},\"status\":\"RUNTIME_ERROR_OR_TLE\"}" >> report.jsonl
  fi

done < cases.txt
