import os
import sys
import re

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

src_dir = r'f:\软考资料\202605\exam-app'
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

typos = {
    '千系人': '干系人',
    '王作包': '工作包',
    '质最': '质量',
    '质是': '质量',
    '项曰': '项目',
    '日标': '目标',
    '信患': '信息',
    '信忌': '信息',
    '内客': '内容',
    '配詈': '配置',
    '基钱': '基线',
    '1is': 'It is ', # Typical in chapter 4
    '成木': '成本',
    '规化': '规划',
    '缺馅': '缺陷',
    '的能"': '的能力"',
    '不可和否认': '不可否认', # '无可和否认证据' -> '无可否认' that kind
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

print(f"Total scan typos fixed: {total_fixes}")
