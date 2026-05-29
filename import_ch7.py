# -*- coding: utf-8 -*-
"""从待校对题库 TXT 文件重新导入题目到 JS 文件 - 修复版"""
import re
import json

def parse_txt_to_questions(txt_path, chapter_id='ch7'):
    """解析 TXT 文件中的题目"""
    with open(txt_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 按 [ID: 分割，每个分块对应一道题
    # 先找到所有 [ID: 的位置
    id_positions = [m.start() for m in re.finditer(r'\[ID:', content)]
    
    questions = []
    question_index = 1
    
    for i, pos in enumerate(id_positions):
        # 获取当前题目的结束位置
        end_pos = id_positions[i + 1] if i + 1 < len(id_positions) else len(content)
        block = content[pos:end_pos].strip()
        
        # 移除末尾的分隔线
        block = re.sub(r'-{20,}\s*$', '', block).strip()
        
        # 检查是否包含题目 ID
        id_match = re.search(r'\[ID:\s*(\S+)\]', block)
        if not id_match:
            continue
        
        # 跳过说明部分
        if '使用说明' in block and '保持 A: B: C: D: 格式' in block:
            continue
        
        original_id = id_match.group(1)
        
        # 生成新的简化 ID
        new_id = f"{chapter_id}" if question_index == 1 else f"{chapter_id}_{question_index}"
        
        # 提取答案
        answer_match = re.search(r'\[答案:\s*([A-D])\]', block)
        correct_answer = 0
        if answer_match:
            correct_answer = ord(answer_match.group(1)) - ord('A')
        
        # 提取解析
        explanation = ''
        explanation_match = re.search(r'\[解析\]:\s*(.*?)$', block, re.DOTALL)
        if explanation_match:
            explanation = explanation_match.group(1).strip()
            explanation = '【解析】' + explanation
        
        # 提取选项
        options = []
        option_pattern = r'^\s*([A-D]):\s*(.+?)(?=\n\s*[A-D]:|\n\s*\[答案|\Z)'
        option_matches = re.findall(option_pattern, block, re.MULTILINE | re.DOTALL)
        for opt_letter, opt_text in option_matches:
            opt_text = opt_text.strip()
            opt_text = re.sub(r'\s*\n\s*', ' ', opt_text)
            options.append(opt_text)
        
        if len(options) < 2:
            print(f"  跳过 {original_id}: 选项数不足 ({len(options)})")
            continue
        
        # 提取题目内容
        id_line_end = block.find('\n', block.find('[ID:'))
        if id_line_end == -1:
            continue
        
        a_match = re.search(r'^\s*A:', block[id_line_end:], re.MULTILINE)
        if not a_match:
            continue
        
        a_pos = id_line_end + a_match.start()
        question_content = block[id_line_end + 1:a_pos].strip()
        
        if not question_content:
            continue
        
        question = {
            "id": new_id,
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
        }
        questions.append(question)
        question_index += 1
    
    return questions

def generate_js_file(questions, chapter_id, output_path):
    """生成 JS 文件"""
    js_content = f'const {chapter_id}Questions = {json.dumps(questions, ensure_ascii=False, indent=2)};\n\n'
    js_content += 'if (typeof examData !== "undefined") {\n'
    js_content += f'  examData.questions = examData.questions.filter(q => q.chapterId !== "{chapter_id}");\n'
    js_content += f'  examData.questions.push(...{chapter_id}Questions);\n'
    js_content += '}\n'
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(js_content)

def main():
    chapter_id = 'ch7'
    txt_path = f'f:/软考资料/202605/exam-app/{chapter_id}_待校对题库.txt'
    js_path = f'f:/软考资料/202605/exam-app/ocr_questions_{chapter_id}.js'
    
    print(f'=== 重新导入第7章题目 ===')
    print(f'源文件: {txt_path}')
    print(f'目标文件: {js_path}')
    
    # 解析题目
    questions = parse_txt_to_questions(txt_path, chapter_id)
    print(f'\n解析到 {len(questions)} 道题目')
    
    # 生成 JS 文件
    generate_js_file(questions, chapter_id, js_path)
    print(f'✓ 已生成 {js_path}')
    
    # 显示前3道题目预览
    print('\n=== 题目预览 ===')
    for i, q in enumerate(questions[:3], 1):
        print(f"\n题目 {i}: {q['id']}")
        content_preview = q['content'][:60].replace('\n', ' ')
        print(f"  内容: {content_preview}...")
        print(f"  选项数: {len(q['options'])}")
        print(f"  答案: {chr(65 + q['correctAnswer'])}")

if __name__ == '__main__':
    main()
