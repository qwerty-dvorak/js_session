#!/bin/bash

# Usage: ./test_requests_verbose.sh [sync|async] [number_of_requests]
# Example: ./test_requests_verbose.sh async 5

if [ ! -f bigfile.txt ]; then
  echo "bigfile.txt not found, creating 200MB random file..."
  head -c 200MB </dev/urandom > bigfile.txt
fi


ENDPOINT="${1:-async}"
COUNT="${2:-5}"
URL="http://localhost:3000/$ENDPOINT"

echo "Testing $COUNT parallel requests to $URL"
START=$(date +%s.%N)

# Store process PIDs and per-request log files
declare -a PIDS
declare -a LOGS

for i in $(seq 1 $COUNT); do
  LOG="req_$i.log"
  LOGS[$i]=$LOG
  echo "[$(date +%H:%M:%S)] Starting request $i"
  { 
    REQ_START=$(date +%s.%N)
    curl -s "$URL" > /dev/null
    REQ_END=$(date +%s.%N)
    REQ_TIME=$(echo "$REQ_END - $REQ_START" | bc)
    echo "[$(date +%H:%M:%S)] Request $i finished in $REQ_TIME seconds"
  } > "$LOG" &
  PIDS[$i]=$!
done

# Wait and print finish times as requests complete
for i in $(seq 1 $COUNT); do
  wait "${PIDS[$i]}"
  cat "${LOGS[$i]}"
  rm -f "${LOGS[$i]}"
done

END=$(date +%s.%N)
TOTAL_TIME=$(echo "$END - $START" | bc)
echo "All $COUNT requests finished in $TOTAL_TIME seconds"
