import re

file_path = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

ids = re.findall(r'"id":\s*"(ch6_\d+)"', content)
print(f"Total IDs found: {len(ids)}")
print(f"First 10 IDs: {ids[:10]}")
print(f"Last 10 IDs: {ids[-10:]}")
if "ch6_48" in ids:
    print("ch6_48 is present")
else:
    print("ch6_48 is NOT present")
