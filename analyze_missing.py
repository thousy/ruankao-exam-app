import re

js_file = r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js'
with open(js_file, 'r', encoding='utf-8') as f:
    content = f.read()

questions = re.findall(r'(\{\s*"id":\s*"ch6_\d+".*?\n\s*\})', content, re.DOTALL)

missing_img_but_has_keyword = []
keywords = ["图", "表", "EMV", "计算"]

for q in questions:
    if '<img' not in q:
        content_match = re.search(r'"content":\s*"(.*?)"', q, re.DOTALL)
        if content_match:
            q_content = content_match.group(1)
            if any(k in q_content for k in keywords):
                missing_img_but_has_keyword.append(re.search(r'"id":\s*"(ch6_\d+)"', q).group(1))

print(f"Total questions: {len(questions)}")
print(f"Questions missing <img> tag but have keywords: {len(missing_img_but_has_keyword)}")
print(f"IDs: {missing_img_but_has_keyword}")
