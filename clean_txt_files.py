# -*- coding: utf-8 -*-
"""清洗所有待校对题库 TXT 文件中的异常符号 - 增强版"""
import os
import re
import glob

def clean_content(content):
    """清理文本内容"""
    original = content
    
    # 1. 清洗括号内数字的空格：（ 1 ） → （1）
    content = re.sub(r'（\s*(\d+)\s*）', r'（\1）', content)
    content = re.sub(r'\(\s*(\d+)\s*\)', r'（\1）', content)
    
    # 2. 清洗空括号：（） 或 ( ) → 留空或删除
    content = re.sub(r'（\s*）', '（  ）', content)  # 统一为两个空格
    content = re.sub(r'\(\s*\)', '（  ）', content)
    
    # 3. 移除 OCR 乱码标记
    content = re.sub(r'【答和案】', '', content)
    content = re.sub(r'【答.*?案】', '', content)
    
    # 4. 移除多余的 @ 符号
    content = re.sub(r'@@+', '', content)
    content = re.sub(r'@(?=[①②③④⑤⑥⑦⑧⑨⑩])', '', content)
    
    # 5. 修复常见 OCR 错误标点
    content = re.sub(r'；，', '，', content)
    content = re.sub(r',，', '，', content)
    content = re.sub(r'，，+', '，', content)
    content = re.sub(r';;+', '；', content)
    content = re.sub(r'::+', '：', content)
    
    # 6. 移除选项末尾的不完整标记
    content = re.sub(r'\n【$', '', content)
    content = re.sub(r'【$', '', content)
    
    # 7. 修复引号问题
    content = content.replace('"', '"')
    content = content.replace('"', '"')
    
    # 8. 统一全角半角括号（数字用全角）
    # 先处理带数字的括号
    content = re.sub(r'\((\d+)\)', r'（\1）', content)
    
    return content

def clean_file(filepath):
    """清理单个文件"""
    filename = os.path.basename(filepath)
    print(f"\n处理文件: {filename}")
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_length = len(content)
        cleaned_content = clean_content(content)
        new_length = len(cleaned_content)
        
        # 统计具体变化
        space_fixes = len(re.findall(r'（\s+\d+\s+）', content))
        
        # 只有内容有变化时才写入
        if cleaned_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned_content)
            diff = original_length - new_length
            print(f"  ✓ 已清洗，减少 {abs(diff)} 字符")
            return True
        else:
            print(f"  - 无需清洗")
            return False
    except Exception as e:
        print(f"  ✗ 处理失败: {e}")
        return False

def main():
    base_dir = r'f:/软考资料/202605/exam-app'
    pattern = os.path.join(base_dir, 'ch*_待校对题库.txt')
    files = glob.glob(pattern)
    
    print(f"=== 批量清洗待校对题库 TXT 文件（增强版） ===")
    print(f"清洗规则：")
    print(f"  1. （ 1 ） → （1）")
    print(f"  2. （） → （  ）")
    print(f"  3. 移除 OCR 乱码")
    print(f"  4. 修复标点符号")
    print(f"\n找到 {len(files)} 个文件")
    
    cleaned_count = 0
    for filepath in sorted(files):
        if clean_file(filepath):
            cleaned_count += 1
    
    print(f"\n=== 清洗完成 ===")
    print(f"共处理 {len(files)} 个文件，{cleaned_count} 个文件有变更")

if __name__ == '__main__':
    main()
