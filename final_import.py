import re
import json
import os

def parse_txt_to_json(fpath, chapter_id):
    if not os.path.exists(fpath):
        print(f"Error: {fpath} not found")
        return []
        
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 移除文件头 (=== XXX === 之前的或直到第一个 [ID: )
    header_end = content.find("[ID:")
    if header_end != -1:
        content = content[header_end:]
    
    # 分割题目块
    blocks = re.split(r'-{40,}', content)
    questions = []
    
    for block in blocks:
        block = block.strip()
        if not block: continue
        
        # 提取 ID
        id_match = re.search(r'\[ID:\s*(\w+_\d+)\]', block)
        if not id_match: continue
        qid = id_match.group(1)
        
        # 提取答案
        ans_match = re.search(r'\[答案:\s*([A-D])\]', block)
        correct_answer = -1
        if ans_match:
            correct_answer = ord(ans_match.group(1).upper()) - ord('A')
        
        # 提取解析
        exp_match = re.search(r'\[解析\]:\s*(.*)', block, re.DOTALL)
        explanation = ""
        if exp_match:
            explanation = exp_match.group(1).strip()
            
        # 提取选项
        option_lines = re.findall(r'^[A-D][:：.．、]\s*(.*)', block, re.MULTILINE)
        if not option_lines:
            option_lines = re.findall(r'\n[A-D][:：.．、]\s*(.*)', block)
            
        options = [opt.strip() for opt in option_lines][:4]
        while len(options) < 4:
            options.append("未识别")
            
        # 提取题干
        # 移除 ID 标签行
        content_body = re.sub(r'\[ID:.*?\]', '', block).strip()
        # 移除解析部分
        content_parts = re.split(r'\[解析\]:', content_body)
        content_body = content_parts[0].strip()
        # 移除答案行
        content_parts = re.split(r'\[答案:', content_body)
        content_body = content_parts[0].strip()
        
        # 移除选项行 (从后往前或根据开头)
        lines = content_body.split('\n')
        final_body_lines = []
        for line in lines:
            trimmed = line.strip()
            if re.match(r'^[A-D][:：.．、]', trimmed):
                continue
            final_body_lines.append(line)
        
        question_content = "\n".join(final_body_lines).strip()
        
        questions.append({
            "id": qid,
            "chapterId": chapter_id,
            "type": "single",
            "difficulty": "medium",
            "content": question_content,
            "options": options,
            "correctAnswer": correct_answer,
            "explanation": explanation,
            "tags": [chapter_id],
            "userAnswer": None,
            "isCorrect": None,
            "isFavorite": False,
            "attemptCount": 0,
            "lastAttemptDate": None
        })
        
    return questions

def update_data_js(ch4_count, ch6_count):
    fpath = r'f:\软考资料\202605\exam-app\data.js'
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 更新 ch4 count
    content = re.sub(r"(id:\s*'ch4'.*?totalQuestions:\s*)\d+", fr"\1{ch4_count}", content, flags=re.DOTALL)
    # 更新 ch6 count
    content = re.sub(r"(id:\s*'ch6'.*?totalQuestions:\s*)\d+", fr"\1{ch6_count}", content, flags=re.DOTALL)
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"✅ data.js 已更新 (Ch4: {ch4_count}, Ch6: {ch6_count})")

def main():
    # 处理 Ch4
    ch4_txt = r'f:\软考资料\202605\exam-app\exports\ch4_题目导出_校对版.txt'
    ch4_qs = parse_txt_to_json(ch4_txt, 'ch4')
    js_content_ch4 = f"const ch4Questions = {json.dumps(ch4_qs, indent=2, ensure_ascii=False)};\n\n"
    js_content_ch4 += 'if (typeof examData !== "undefined") {\n'
    js_content_ch4 += '  examData.questions = examData.questions.filter(q => q.chapterId !== "ch4");\n'
    js_content_ch4 += '  examData.questions.push(...ch4Questions);\n'
    js_content_ch4 += '}\n'
    
    with open(r'f:\软考资料\202605\exam-app\ocr_questions_ch4.js', 'w', encoding='utf-8') as f:
        f.write(js_content_ch4)
    print(f"✅ ocr_questions_ch4.js 已保存，共 {len(ch4_qs)} 题。")
    
    # 处理 Ch6
    ch6_txt = r'f:\软考资料\202605\exam-app\exports\ch6_题目导出_校对版.txt'
    ch6_qs = parse_txt_to_json(ch6_txt, 'ch6')
    js_content_ch6 = f"const ch6Questions = {json.dumps(ch6_qs, indent=2, ensure_ascii=False)};\n\n"
    js_content_ch6 += 'if (typeof examData !== "undefined") {\n'
    js_content_ch6 += '  examData.questions = examData.questions.filter(q => q.chapterId !== "ch6");\n'
    js_content_ch6 += '  examData.questions.push(...ch6Questions);\n'
    js_content_ch6 += '}\n'
    
    with open(r'f:\软考资料\202605\exam-app\ocr_questions_ch6.js', 'w', encoding='utf-8') as f:
        f.write(js_content_ch6)
    print(f"✅ ocr_questions_ch6.js 已保存，共 {len(ch6_qs)} 题。")
    
    update_data_js(len(ch4_qs), len(ch6_qs))

if __name__ == "__main__":
    main()
