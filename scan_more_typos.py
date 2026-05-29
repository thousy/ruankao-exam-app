import os
import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

src_dir = r'f:\软考资料\202605\exam-app'
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

suspicions = [
    '项日', '关建', '关健', '自下而_上', '信患', '信忌', '网格箭线',
    '管埋', '范圈', '风脸', '凤险', '进庋', '变史', '戍本', '需要求', '实旅', '卖施', '实拖',
    '项口', '页目'
]

total_found = 0

for f in js_files:
    path = os.path.join(src_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    for s in suspicions:
        matches = list(re.finditer(s, content))
        if matches:
            for m in matches[:5]:
                start = max(0, m.start() - 15)
                end = min(len(content), m.end() + 15)
                context = content[start:end].replace('\n', ' ')
                print(f"Found '{s}' in {f}: ...{context}...")
            total_found += len(matches)

print(f"Found total {total_found} occurrences.")
