import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

src_dir = r'f:\软考资料\202605\exam-app'
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

typos = {
    '关建': '关键',
    '关健': '关键',
    '项日': '项目',
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

print(f"Total step 4 typos fixed: {total_fixes}")
