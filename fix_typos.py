import os
import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

src_dir = r'f:\软考资料\202605\exam-app'
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

typos = {
    '勤锅': '勤勉',
    '勤钢': '勤勉',
    '勤抽': '勤勉',
    '驾驱': '驾驭',
    '契性': '韧性',
    '万性': '韧性',
    '选代': '迭代',
    '欠代': '迭代',
    '旬代': '迭代',
    '裁前': '裁剪',
    '裁葛': '裁剪',
    'PWMO': 'PMO',
    'PM0': 'PMO',
    'PM0O': 'PMO',
    '交肢': '交叠',
    '阁业': '敬业',
    '的能"': '的能力"',
    '到焦于价值': '聚焦于价值',
    # Common OCR issues
    '和干系人': '干系人',
    '，和群体': '或群体', # Usually 个人、群体或组织 maybe? Let's skip replacing 和群体.
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

print(f"Total typos fixed: {total_fixes}")
