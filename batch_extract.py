#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
章节题目提取脚本 - 最终维护版
1. 修复了 re.sub 中的 group 引用错误 (\g<1>)
2. 自动纠正 OCR 乱码
3. 增强了对第一-三章等章节的匹配
4. 确保 UTF-8 编码保存
"""

import re
import json
import os
import time
from pathlib import Path
import pytesseract
from pdf2image import convert_from_path

# ==================== 配置 ====================
TESSERACT_PATH = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
POPPLER_PATH = r'C:\poppler\Library\bin'
pytesseract.pytesseract.tesseract_cmd = TESSERACT_PATH

ROOT_DIR = r'f:\软考资料\202605\26年真题、模拟题、计算题、案例分析题、分章'
APP_DIR = r'f:\软考资料\202605\exam-app'

def get_cid(filename):
    # 增强匹配逻辑
    ch_match = re.search(r'第([一二三四五六七八九十百\d\-]+)章', filename)
    if ch_match:
        ch_str = ch_match.group(1)
        mapping = {
            '一-三': 'ch1-3', '四': 'ch4', '五': 'ch5', '六': 'ch6', '七': 'ch7', '八': 'ch8', '九': 'ch9', '十': 'ch10',
            '十一': 'ch11', '十二': 'ch12', '十三': 'ch13', '十四': 'ch14', '十五': 'ch15', '十六': 'ch16', '十七': 'ch17',
            '十八': 'ch18', '十九': 'ch19', '二十': 'ch20', '二十一': 'ch21', '二十二': 'ch22', '二十三': 'ch23',
            '二十四': 'ch24', '二十五': 'ch25', '二十六': 'ch26', '二十七': 'ch27', '二十八': 'ch28', '二十九': 'ch29',
            '三十': 'ch30', '三十一': 'ch31'
        }
        return mapping.get(ch_str, f"ch{ch_str}")
    return None

def smart_fix(text):
    fixes = {
        r'\(MK[A-Z,\s\-]+\)': '(此题为常规重点考题，建议举一反三)',
        r'\(MKHOFRELAEKR,\s*PUHA-BZ\)': '(此题为常规重点考题，建议举一反三)',
        r'\(MKREFRELEH,\s*BHA-B2Z\)': '(此题为常规重点考题，建议举一反三)',
        r'\(RK[\w\s\-]+\)': '(此题为常规重点考题，建议举一反三)',
        r'\(MHE[\w\s\-]+\)': '(此题为常规重点考题，建议举一反三)'
    }
    for pattern, replacement in fixes.items():
        text = re.sub(pattern, replacement, text)
    return text

def clean_noise(text):
    noise_patterns = [
        r'信息系统项目管理师考试历年真题.*必须认真学习',
        r'版权所有.*侵权必究',
        r'购课淘宝店铺.*taobao\.com',
        r'91grk\.taobao\.com',
        r'taobao\.com',
        r'过软考教育学院内部资料',
        r'QQ:\s*56704360',
        r'2026 年最新版',
        r'侵权必究'
    ]
    lines = text.split('\n')
    cleaned_lines = []
    for line in lines:
        if not any(re.search(p, line, flags=re.IGNORECASE) for p in noise_patterns):
            cleaned_lines.append(line.strip())
    return smart_fix("\n".join(cleaned_lines))

def process_one(pdf_path, cid):
    print(f"\n>>> 正在处理 {cid} ...")
    try:
        images = convert_from_path(pdf_path, dpi=200, poppler_path=POPPLER_PATH)
        full_text = ""
        for i, img in enumerate(images):
            text = pytesseract.image_to_string(img, lang='chi_sim+eng', config='--psm 6')
            full_text += text + "\n\n"
        
        full_text = clean_noise(full_text)
        full_text = re.sub(r'\[##\]|\[S81\]|\[S41\]|\[#81\]|\[4\]', '【答案】', full_text)
        # 针对第一-三章这种可能没有标准序号的情况，改用更宽松的切分
        blocks = re.split(r'\n(?=\d+[、\.])', full_text)
        questions = []
        
        for block in blocks:
            block = block.strip()
            if len(block) < 30: continue
            
            source_match = re.search(r'(\d{4}\s*年.+?第\s*\d+\s*题|根据.+?模拟题|我.+?模拟题|原创.+?模拟题)', block)
            source = source_match.group(1).replace(' ', '') if source_match else "真题/模拟"
            
            opt_matches = list(re.finditer(r'([A-D])[、\.](.+?)(?=\s+[A-D][、\.]|【|\[|答案|解析|$)', block, re.DOTALL))
            temp_opts = {}
            if len(opt_matches) >= 4:
                chars = set()
                for m in opt_matches:
                    char = m.group(1)
                    if char not in chars:
                        temp_opts[char] = m.group(2).strip().replace('\n', ' ')
                        chars.add(char)
                    if len(chars) == 4: break
            if len(temp_opts) < 4: continue
            
            ans_match = re.search(r'(?:【答案】|答案|S81|案列|案|##)[\]】\s]*([A-D])', block)
            if not ans_match: continue
            
            # 定位题目内容
            first_opt_pos = block.find('A、')
            if first_opt_pos == -1: first_opt_pos = block.find('A.')
            if first_opt_pos == -1:
                m = re.search(r'[A-D][、\.]', block)
                first_opt_pos = m.start() if m else len(block)
            
            content_section = block[:first_opt_pos].strip()
            content_section = re.sub(r'^\d+[、\.]', '', content_section).strip()
            # 过滤掉内容里的来源文字
            if source_match:
                content_section = content_section.replace(source_match.group(0), "").strip()
            content_section = re.sub(r'^[、\.,，\s\)]+', '', content_section)

            display_idx = len(questions) + 1
            questions.append({
                'id': f"{cid}_{display_idx}",
                'chapterId': cid,
                'type': 'single',
                'difficulty': 'medium',
                'content': f"{display_idx}、{source}\n{content_section}",
                'options': [temp_opts.get('A', ''), temp_opts.get('B', ''), temp_opts.get('C', ''), temp_opts.get('D', '')],
                'correctAnswer': ord(ans_match.group(1).upper()) - ord('A'),
                'explanation': block[block.find('【答案】') if block.find('【答案】') != -1 else 0:].strip(),
                'tags': [cid],
                'userAnswer': None, 'isCorrect': None, 'isFavorite': False, 'attemptCount': 0, 'lastAttemptDate': None
            })

        if not questions:
            print(f"!!! 未从 {cid} 中提取到任何题目")

        out_file = os.path.join(APP_DIR, f'ocr_questions_{cid}.js')
        with open(out_file, 'w', encoding='utf-8') as f:
            f.write(f"const {cid.replace('-', '_')}Questions = {json.dumps(questions, ensure_ascii=False, indent=2)};\n")
            f.write(f"if (typeof examData !== 'undefined') {{\n")
            f.write(f"    examData.questions = examData.questions.filter(q => q.chapterId !== '{cid}');\n")
            f.write(f"    examData.questions.push(...{cid.replace('-', '_')}Questions);\n")
            f.write("}\n")
        return len(questions)
    except Exception as e:
        print(f"FAILED {cid}: {e}")
        return 0

def finalize(stats):
    print("\n--- 正在进行系统集成 ---")
    data_path = os.path.join(APP_DIR, 'data.js')
    if not os.path.exists(data_path): return
    
    with open(data_path, 'r', encoding='utf-8') as f:
        data_content = f.read()
    
    for cid, count in stats.items():
        # 修复 re.sub 错误：使用 \g<1> 引用第一个分组
        pattern = rf"(id:\s*'{cid}',.*?totalQuestions:\s*)\d+"
        data_content = re.sub(pattern, rf"\g<1>{count}", data_content, flags=re.DOTALL)
    
    with open(data_path, 'w', encoding='utf-8') as f:
        f.write(data_content)
    
    html_path = os.path.join(APP_DIR, 'index.html')
    if not os.path.exists(html_path): return
    
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    existing_scripts = re.findall(r'<script src="(ocr_questions_ch.+?\.js)"></script>', html)
    scripts_to_add = []
    # 按照 ID 排序插入
    for cid in sorted(stats.keys()):
        js_name = f"ocr_questions_{cid}.js"
        if js_name not in existing_scripts:
            scripts_to_add.append(f'    <script src="{js_name}"></script>')
    
    if scripts_to_add:
        html = html.replace('</body>', '\n'.join(scripts_to_add) + '\n</body>')
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(html)
    
    print("\n✅ 处理全部完成。")

if __name__ == "__main__":
    pdf_tasks = []
    # 获取目录下所有需要处理的 PDF
    for root, _, files in os.walk(ROOT_DIR):
        for f in files:
            if f.endswith('.pdf'):
                cid = get_cid(f)
                if cid:
                    # ch4 是英语单独处理的，排除。其他的如果已经有正常的 JS 也可以跳过，但为了修复乱码/损坏，这里全量处理一次
                    if cid != 'ch4':
                        pdf_tasks.append((os.path.join(root, f), cid))
    
    results = {}
    for path, cid in pdf_tasks:
        results[cid] = process_one(path, cid)
    
    finalize(results)
