#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
软考题目提取工具
从PDF文件中提取选择题并转换为JavaScript数据格式
"""

import re
import json
import os
from pathlib import Path

try:
    import pdfplumber
except ImportError:
    print("正在安装 pdfplumber...")
    import subprocess
    subprocess.check_call(['pip', 'install', 'pdfplumber'])
    import pdfplumber


class QuestionExtractor:
    """题目提取器"""
    
    def __init__(self):
        self.questions = []
        self.chapter_mapping = {
            '第十三章': 'ch13',
            '第十四章': 'ch14',
            '第十五章': 'ch15',
            '第十六章': 'ch16',
            '第十七章': 'ch17',
            '第十八章': 'ch18',
            '第十九章': 'ch19',
            '第二十章': 'ch20',
            '第二十一章': 'ch21',
            '第二十二章': 'ch22',
            '第二十三章': 'ch23',
            '第二十四章': 'ch24',
            '第二十五章': 'ch25',
        }
    
    def extract_from_pdf(self, pdf_path, chapter_id):
        """从PDF文件中提取题目"""
        print(f"\n正在处理: {pdf_path}")
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                full_text = ""
                for page in pdf.pages:
                    text = page.extract_text()
                    if text:
                        full_text += text + "\n"
                
                # 解析题目
                questions = self.parse_questions(full_text, chapter_id)
                self.questions.extend(questions)
                print(f"  提取到 {len(questions)} 道题目")
                
        except Exception as e:
            print(f"  错误: {str(e)}")
    
    def parse_questions(self, text, chapter_id):
        """解析题目文本"""
        questions = []
        
        # 匹配题目模式 (可能需要根据实际PDF格式调整)
        # 常见格式: 1. 题目内容\nA. 选项A\nB. 选项B\nC. 选项C\nD. 选项D\n答案:X
        
        # 尝试多种题目模式
        patterns = [
            # 模式1: 数字编号 + 题目
            r'(\d+)[\.、]\s*(.+?)(?=\n[A-D][\.、])',
            # 模式2: 【题目】格式
            r'【\s*(\d+)\s*】\s*(.+?)(?=\n[A-D][\.、])',
        ]
        
        # 选项模式
        option_pattern = r'([A-D])[\.、]\s*(.+?)(?=\n[A-D][\.、]|\n答案|\n解析|\n\d+[\.、]|$)'
        
        # 答案模式
        answer_pattern = r'答案[：:]\s*([A-D])'
        
        # 解析模式
        explanation_pattern = r'(?:解析|答案解析)[：:]\s*(.+?)(?=\n\d+[\.、]|\n【|$)'
        
        # 简单分割处理 - 按题号分割
        question_blocks = re.split(r'\n(?=\d+[\.、])', text)
        
        for block in question_blocks:
            if len(block.strip()) < 10:  # 过滤太短的内容
                continue
            
            try:
                # 提取题号和题目内容
                title_match = re.search(r'^(\d+)[\.、]\s*(.+?)(?=\n[A-D])', block, re.DOTALL)
                if not title_match:
                    continue
                
                question_num = title_match.group(1)
                question_content = title_match.group(2).strip()
                
                # 提取选项
                options = []
                option_matches = re.finditer(option_pattern, block, re.DOTALL)
                for match in option_matches:
                    option_text = match.group(2).strip()
                    options.append(option_text)
                
                if len(options) < 4:  # 至少要有4个选项
                    continue
                
                # 提取答案
                answer_match = re.search(answer_pattern, block)
                if not answer_match:
                    continue
                
                answer_letter = answer_match.group(1)
                correct_answer = ord(answer_letter) - ord('A')  # 转换为索引
                
                # 提取解析
                explanation = ""
                explanation_match = re.search(explanation_pattern, block, re.DOTALL)
                if explanation_match:
                    explanation = explanation_match.group(1).strip()
                
                # 生成题目ID
                question_id = f"q{chapter_id}_{question_num.zfill(3)}"
                
                # 创建题目对象
                question = {
                    'id': question_id,
                    'chapterId': chapter_id,
                    'type': 'single',
                    'difficulty': 'medium',  # 默认中等难度
                    'content': question_content,
                    'options': options[:4],  # 只取前4个选项
                    'correctAnswer': correct_answer,
                    'explanation': explanation or '暂无解析',
                    'tags': [],  # 可以后续添加标签
                    'userAnswer': None,
                    'isCorrect': None,
                    'isFavorite': False,
                    'attemptCount': 0,
                    'lastAttemptDate': None
                }
                
                questions.append(question)
                
            except Exception as e:
                print(f"  解析题目时出错: {str(e)}")
                continue
        
        return questions
    
    def export_to_js(self, output_file):
        """导出为JavaScript格式"""
        print(f"\n正在导出到: {output_file}")
        
        # 生成JavaScript代码
        js_code = "// 自动提取的题目数据\n"
        js_code += "// 生成时间: " + str(Path(__file__).stat().st_mtime) + "\n\n"
        js_code += "const extractedQuestions = " + json.dumps(self.questions, ensure_ascii=False, indent=4) + ";\n\n"
        js_code += "// 将题目添加到examData.questions数组中\n"
        js_code += "if (typeof examData !== 'undefined') {\n"
        js_code += "    examData.questions.push(...extractedQuestions);\n"
        js_code += "}\n"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(js_code)
        
        print(f"成功导出 {len(self.questions)} 道题目!")
    
    def export_to_json(self, output_file):
        """导出为JSON格式(便于检查)"""
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.questions, f, ensure_ascii=False, indent=2)
        print(f"JSON格式已保存到: {output_file}")


def main():
    """主函数"""
    print("=" * 60)
    print("软考题目提取工具")
    print("=" * 60)
    
    # 设置路径
    base_dir = Path(r"f:\软考资料\202605\26年真题、模拟题、计算题、案例分析题、分章\13-25")
    output_dir = Path(r"f:\软考资料\202605\exam-app")
    
    # PDF文件映射
    pdf_files = {
        'ch13': '第十三章、项目立项管理.pdf',
        'ch14': '第十四章、项目整合管理.pdf',
        'ch15': '第十五章、项目范围管理.pdf',
        'ch16': '第十六章、项目进度管理.pdf',
        'ch17': '第十七章、项目成本管理.pdf',
        'ch18': '第十八章、项目质量管理.pdf',
        'ch19': '第十九章、项目资源管理.pdf',
        'ch20': '第二十章、项目沟通管理.pdf',
        'ch21': '第二十一章、项目风险管理.pdf',
        'ch22': '第二十二章、项目采购管理.pdf',
        'ch23': '第二十三章、项目干系人管理.pdf',
        'ch24': '第二十四章、项目绩效域.pdf',
        'ch25': '第二十五章、配置与变更管理.pdf',
    }
    
    # 创建提取器
    extractor = QuestionExtractor()
    
    # 选择要处理的章节
    print("\n可用章节:")
    for idx, (chapter_id, filename) in enumerate(pdf_files.items(), 1):
        print(f"  {idx}. {chapter_id}: {filename}")
    
    print("\n选项:")
    print("  0. 提取所有章节")
    print("  1-13. 提取指定章节")
    print("  q. 退出")
    
    choice = input("\n请选择 (默认为0): ").strip() or "0"
    
    if choice.lower() == 'q':
        print("已取消")
        return
    
    # 处理选择
    if choice == "0":
        # 提取所有章节
        for chapter_id, filename in pdf_files.items():
            pdf_path = base_dir / filename
            if pdf_path.exists():
                extractor.extract_from_pdf(str(pdf_path), chapter_id)
    else:
        # 提取指定章节
        try:
            idx = int(choice) - 1
            chapter_id = list(pdf_files.keys())[idx]
            filename = pdf_files[chapter_id]
            pdf_path = base_dir / filename
            if pdf_path.exists():
                extractor.extract_from_pdf(str(pdf_path), chapter_id)
        except (ValueError, IndexError):
            print("无效的选择!")
            return
    
    # 导出结果
    if extractor.questions:
        output_js = output_dir / "extracted_questions.js"
        output_json = output_dir / "extracted_questions.json"
        
        extractor.export_to_js(str(output_js))
        extractor.export_to_json(str(output_json))
        
        print("\n" + "=" * 60)
        print("提取完成!")
        print(f"总计提取: {len(extractor.questions)} 道题目")
        print(f"JavaScript文件: {output_js}")
        print(f"JSON文件: {output_json}")
        print("=" * 60)
        
        print("\n下一步:")
        print("1. 检查 extracted_questions.json 确认题目格式正确")
        print("2. 在 index.html 中引入 extracted_questions.js")
        print("   <script src=\"extracted_questions.js\"></script>")
        print("3. 刷新页面测试")
    else:
        print("\n未提取到任何题目,请检查PDF格式")


if __name__ == "__main__":
    main()
