# -*- coding: utf-8 -*-
"""导出第6章题目到TXT文件"""
import os
import re
import json
from datetime import datetime

filepath = r'f:/软考资料/202605/exam-app/ocr_questions_ch6.js'
output_path = r'f:/软考资料/202605/exam-app/exports/ch6_题目导出.txt'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'const\s+\w+\s*=\s*(\[[\s\S]*?\]);', content)
if match:
    json_str = match.group(1)
    json_str = re.sub(r',(\s*[\]}])', r'\1', json_str)
    questions = json.loads(json_str)
    
    output = f'=== 第六章 题目导出 ===\n导出时间: {datetime.now().strftime("%Y-%m-%d %H:%M")}\n题目数量: {len(questions)}\n\n'
    
    for i, q in enumerate(questions, 1):
        output += f'[ID: {q.get("id", f"ch6_{i}")}]\n'
        output += f'{q.get("content", "")}\n'
        for j, opt in enumerate(q.get('options', [])):
            if isinstance(opt, dict):
                opt_text = opt.get('text', str(opt))
            else:
                opt_text = str(opt)
            opt_text = opt_text.replace('\\n', ' ').replace('\n', ' ').strip()
            output += f'{chr(65 + j)}: {opt_text}\n'
        ans_idx = q.get('correctAnswer', 0)
        ans_letter = chr(65 + ans_idx) if isinstance(ans_idx, int) else str(ans_idx)
        output += f'[答案: {ans_letter}]\n'
        exp = q.get('explanation', '')
        if exp:
            output += f'[解析]: {exp}\n'
        output += '-' * 50 + '\n\n'
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)
    print(f'✓ 第6章导出完成: {len(questions)} 道题目')
    print(f'保存位置: {output_path}')
else:
    print('未找到题目数据')
