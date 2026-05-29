import os
import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

src_dir = r'f:\软考资料\202605\exam-app'
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

typos = {
    '出三前': '出厂前', # "电池出三" context
    '出三次': '出厂次', # wait, 算出三项 is fine, only 出三前 was the issue
    '国为它': '因为它',
    '，国为': '，因为',
    'CC、信息安全': 'C、信息安全', # Seen in ch4.js
    '1TIS': 'It is',
    '不可和否认证据': '不可否认的证据',
    '无可不可否认': '无可否认',
    '自下而_上': '自下而上', # A very common OCR artifact
    '自_上而下': '自上而下',
    '项_目': '项目',
    '管_理': '管理',
}

total_fixes = 0

for f in js_files:
    path = os.path.join(src_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content
    found_any = False
    
    for wrong, right in typos.items():
        if wrong in new_content:
            count = new_content.count(wrong)
            new_content = new_content.replace(wrong, right)
            print(f'Fixed {count} instances of "{wrong}" -> "{right}" in {f}')
            total_fixes += count
            found_any = True
            
    if found_any:
        with open(path, 'w', encoding='utf-8') as file:
            file.write(new_content)

print(f"Total deep typos fixed: {total_fixes}")
