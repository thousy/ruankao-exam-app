# -*- coding: utf-8 -*-
"""重新导出第7章题目"""
import os
import re
import json

filepath = r'f:/软考资料/202605/exam-app/ocr_questions_ch7.js'
output_path = r'f:/软考资料/202605/exam-app/exports/ch7_题目导出.txt'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const\s+ch7Questions\s*=\s*(\[.*?\]);', content, re.DOTALL)
questions = json.loads(match.group(1))

header = f'''=== 第7章 题目导出 ===
导出时间: 2026-02-08
题目数量: {len(questions)}

'''

output = header
for i, q in enumerate(questions, 1):
    output += f"[ID: {q.get('id', f'ch7_{i}')}]\n"
    output += q.get('content', '').replace('\\n', '\n') + '\n'
    
    options = q.get('options', [])
    for j, opt in enumerate(options):
        opt_text = str(opt).replace('\\n', ' ').replace('\n', ' ').strip()
        output += f"{chr(65 + j)}: {opt_text}\n"
    
    correct = q.get('correctAnswer', 0)
    answer = chr(65 + correct) if isinstance(correct, int) else str(correct)
    output += f"[答案: {answer}]\n"
    
    explanation = q.get('explanation', '').replace('\\n', '\n')
    if explanation:
        output += f"[解析]: {explanation}\n"
    
    output += '-' * 50 + '\n\n'

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(output)

print(f'✓ 第7章导出完成: {len(questions)} 道题目')
print(f'保存位置: {output_path}')
