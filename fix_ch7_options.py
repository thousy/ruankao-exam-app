# -*- coding: utf-8 -*-
"""修复 ch7 选项中的异常换行"""
import json
import re

filepath = r'f:/软考资料/202605/exam-app/ocr_questions_ch7.js'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 提取 JSON 数组
match = re.search(r'const ch7Questions = (\[.*?\]);', content, re.DOTALL)
if not match:
    print('未找到 ch7Questions')
    exit()

questions = json.loads(match.group(1))
fixed_count = 0

for q in questions:
    # 修复选项中的换行
    for i, opt in enumerate(q.get('options', [])):
        original = opt
        # 移除选项中的换行符（用空格替代）
        fixed = opt.replace('\n', ' ')
        # 移除多余的空格
        fixed = re.sub(r' +', ' ', fixed).strip()
        # 特殊处理：移除乱码如 【答和案】
        fixed = re.sub(r'\s*【答.*?】\s*$', '', fixed)
        
        if fixed != original:
            q['options'][i] = fixed
            fixed_count += 1
            print(f"{q['id']} 选项{chr(65+i)}: 已修正")

# 重新写入文件
output = f'const ch7Questions = {json.dumps(questions, ensure_ascii=False, indent=2)};\n\n'
output += 'if (typeof examData !== "undefined") {\n'
output += '  examData.questions = examData.questions.filter(q => q.chapterId !== "ch7");\n'
output += '  examData.questions.push(...ch7Questions);\n'
output += '}\n'

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(output)

print(f'\n共修正 {fixed_count} 处选项换行问题')
