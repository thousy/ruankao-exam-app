import re
with open(r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js', 'r', encoding='utf-8') as f:
    content = f.read()
ids = re.findall(r'"id": "(ch6_\d+)"', content)
print(f"Total IDs: {len(ids)}")
print(f"IDs: {ids}")
