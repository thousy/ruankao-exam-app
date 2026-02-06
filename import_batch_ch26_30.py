import re
import json
import os

def parse_txt_to_json(file_path, chapter_id):
    if not os.path.exists(file_path):
        print(f"文件不存在: {file_path}")
        return []
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 按 ID 分割题目
    blocks = re.split(fr'\[ID: {chapter_id}_\d+\]', content)[1:]
    ids = re.findall(fr'\[ID: {chapter_id}_(\d+)\]', content)
    
    questions = []
    for i, block in enumerate(blocks):
        block = block.strip()
        q_id = f"{chapter_id}_{ids[i]}"
        
        # 1. 提取答案
        ans_match = re.search(r'\[答案:\s*([A-D]+)\]', block) # 支持 A D 这种
        correct_answer = -1
        if ans_match:
            ans_str = ans_match.group(1).strip()
            if len(ans_str) == 1:
                correct_answer = ord(ans_str.upper()) - ord('A')
            else:
                # 处理多选或特殊情况，这里暂按第一个字母处理，或者保留字符串
                # 软考选择题通常单选，但有些模拟题标注可能不规范
                correct_answer = ord(ans_str[0].upper()) - ord('A')
        
        # 2. 提取解析
        exp_match = re.search(r'\[解析\]:(.*)', block, re.DOTALL)
        explanation = exp_match.group(1).strip() if exp_match else ""
        # 移除解析中的分割线
        explanation = re.sub(r'-{10,}', '', explanation).strip()
        
        # 3. 提取题目主体和选项
        main_part = re.split(r'\[答案:', block)[0].strip()
        
        # 提取选项
        temp_options = re.findall(r'[A-D][:：]\s*(.*?)(?=[A-D][:：]|$|(?:\n\s*\[)|(?:\r\n\s*\[))', main_part, re.DOTALL)
        options = [opt.strip() for opt in temp_options]

        # 提取题干
        question_content = main_part
        # 寻找第一个选项 A: 或 A. 或 A
        first_opt_idx = re.search(r'[A-D][:：]', main_part)
        if first_opt_idx:
            question_content = main_part[:first_opt_idx.start()].strip()
            
        questions.append({
            "id": q_id,
            "chapterId": chapter_id,
            "type": "single",
            "difficulty": "medium",
            "content": question_content,
            "options": options,
            "correctAnswer": correct_answer,
            "explanation": "【解析】" + explanation.replace("[解析]:", "").strip(),
            "tags": [chapter_id],
            "userAnswer": None,
            "isCorrect": None,
            "isFavorite": False,
            "attemptCount": 0,
            "lastAttemptDate": None
        })
    return questions

def save_to_js(questions, output_path, var_name, chapter_id):
    js_content = f"const {var_name} = {json.dumps(questions, ensure_ascii=False, indent=2)};\n\n"
    js_content += f"if (typeof examData !== 'undefined') {{\n"
    js_content += f"  examData.questions = examData.questions.filter(q => q.chapterId !== '{chapter_id}');\n"
    js_content += f"  examData.questions.push(...{var_name});\n"
    js_content += f"}}\n"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"已生成: {output_path} ({len(questions)} 题)")

if __name__ == "__main__":
    base_path = r"f:\软考资料\202605\exam-app"
    chapters = ["ch26", "ch27", "ch28", "ch29", "ch30"]
    
    total_new_qs = {}
    
    for ch in chapters:
        txt_file = os.path.join(base_path, f"{ch}_待校对题库.txt")
        js_file = os.path.join(base_path, f"ocr_questions_{ch}.js")
        var_name = f"{ch}Questions"
        
        qs = parse_txt_to_json(txt_file, ch)
        if qs:
            save_to_js(qs, js_file, var_name, ch)
            total_new_qs[ch] = len(qs)
            
    print("\n导入概览:")
    for ch, count in total_new_qs.items():
        print(f"{ch}: {count} 题")
