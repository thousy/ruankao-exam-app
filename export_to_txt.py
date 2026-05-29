# -*- coding: utf-8 -*-
"""将所有章节的题目从 JS 文件导出到 TXT 文件"""
import os
import re
import json
import glob

def extract_questions_from_js(filepath):
    """从 JS 文件中提取题目数据"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 匹配 const ch*Questions = [...];
    match = re.search(r'const\s+ch\d+\w*Questions\s*=\s*(\[.*?\]);', content, re.DOTALL)
    if not match:
        return []
    
    try:
        questions = json.loads(match.group(1))
        return questions
    except json.JSONDecodeError as e:
        print(f"  JSON 解析失败: {e}")
        return []

def format_question_to_txt(q, index):
    """将单个题目格式化为 TXT 格式"""
    lines = []
    
    # 题目 ID 和序号
    lines.append(f"[ID: {q.get('id', f'unknown_{index}')}]")
    
    # 题目内容
    content = q.get('content', '').replace('\\n', '\n')
    lines.append(content)
    
    # 选项
    options = q.get('options', [])
    for i, opt in enumerate(options):
        # 处理选项可能是字符串或字典的情况
        if isinstance(opt, dict):
            opt_text = opt.get('text', str(opt))
        else:
            opt_text = str(opt)
        opt_text = opt_text.replace('\\n', ' ').replace('\n', ' ').strip()
        lines.append(f"{chr(65 + i)}: {opt_text}")
    
    # 答案
    correct = q.get('correctAnswer', 0)
    if isinstance(correct, int):
        answer = chr(65 + correct)
    else:
        answer = str(correct)
    lines.append(f"[答案: {answer}]")
    
    # 解析
    explanation = q.get('explanation', '').replace('\\n', '\n')
    if explanation:
        lines.append(f"[解析]: {explanation}")
    
    lines.append("-" * 50)
    lines.append("")
    
    return '\n'.join(lines)

def export_chapter(js_filepath, output_dir):
    """导出单个章节"""
    filename = os.path.basename(js_filepath)
    
    # 提取章节号
    match = re.search(r'ch(\d+)', filename)
    if not match:
        return False
    
    chapter_num = match.group(1)
    output_filename = f"ch{chapter_num}_题目导出.txt"
    output_path = os.path.join(output_dir, output_filename)
    
    print(f"\n处理: {filename}")
    
    questions = extract_questions_from_js(js_filepath)
    if not questions:
        print(f"  ✗ 未找到题目数据")
        return False
    
    # 生成 TXT 内容
    header = f"""=== 第{chapter_num}章 题目导出 ===
导出时间: 2026-02-08
题目数量: {len(questions)}

"""
    
    content = header
    for i, q in enumerate(questions, 1):
        content += format_question_to_txt(q, i)
    
    # 写入文件
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ 导出 {len(questions)} 道题目 → {output_filename}")
    return True

def main():
    base_dir = r'f:/软考资料/202605/exam-app'
    output_dir = os.path.join(base_dir, 'exports')
    
    # 创建导出目录
    os.makedirs(output_dir, exist_ok=True)
    
    # 查找所有 JS 题库文件
    pattern = os.path.join(base_dir, 'ocr_questions_ch*.js')
    js_files = glob.glob(pattern)
    
    print(f"=== 批量导出题目到 TXT 文件 ===")
    print(f"找到 {len(js_files)} 个题库文件")
    print(f"导出目录: {output_dir}")
    
    success_count = 0
    total_questions = 0
    
    for js_file in sorted(js_files):
        if export_chapter(js_file, output_dir):
            success_count += 1
            # 统计题目数
            questions = extract_questions_from_js(js_file)
            total_questions += len(questions)
    
    print(f"\n=== 导出完成 ===")
    print(f"成功导出 {success_count} 个章节")
    print(f"共计 {total_questions} 道题目")
    print(f"文件保存在: {output_dir}")

if __name__ == '__main__':
    main()
