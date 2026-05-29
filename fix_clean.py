import os
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

src_dir = r'f:\软考资料\202605\exam-app'
js_files = [f for f in os.listdir(src_dir) if f.startswith('ocr_questions_ch') and f.endswith('.js')]

total_fixes = 0

for f in js_files:
    path = os.path.join(src_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    new_content = content
    found_any = False
    
    def safe_replace(word, replacement, text):
        global total_fixes
        count = text.count(word)
        if count > 0:
            text = text.replace(word, replacement)
            print(f'Fixed {count} instances of {word} -> {replacement} in {f}')
            total_fixes += count
            return True, text
        return False, text

    replacements = [
        ('信患', '信息'),
        ('白然', '自然'),
        ('进庋', '进度'),
        ('质是', '质量'),
        ('成木', '成本'),
        ('内客', '内容'),
        ('买施', '实施'),
        ('卖施', '实施'),
        ('左石', '左右'),
    ]

    for w, r in replacements:
        found, new_content = safe_replace(w, r, new_content)
        if found: found_any = True
    
    # Context-aware
    if '王作' in new_content:
        new_content = new_content.replace('王作为', '##WANG_ZUO_WEI##')
        found, new_content = safe_replace('王作', '工作', new_content)
        if found: found_any = True
        new_content = new_content.replace('##WANG_ZUO_WEI##', '王作为')

    if found_any:
        with open(path, 'w', encoding='utf-8') as file:
            file.write(new_content)

print(f'Done! Total safe typos fixed: {total_fixes}')
