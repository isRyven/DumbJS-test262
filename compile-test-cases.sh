> testcases.json
echo "[" >> testcases.json
find TestCases -type f -print0 | xargs -0 bash -c 'for filename; do echo "\"$filename\","; done' bash >> testcases.json
echo "\"\"]" >> testcases.json
