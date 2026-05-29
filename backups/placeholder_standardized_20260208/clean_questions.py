import re
import os
import glob

def clean_placeholder(text):
    if not isinstance(text, str): return text
    
    # 彻底覆盖所有可能的括号字符
    brackets = '（）()《》“”[\]〈〉<>〔〕\uff08\uff09\u3008\u3009\u300a\u300b'
    b_chars = r'\(\)（）《》“”\[\]〈〉<>〔〕'
    
    # --- 逻辑 A: 处理带数字的占位符 (22) -> （ 22 ） ---
    cluster_pattern = rf'[{b_chars}\s\d]{{2,20}}'
    def numbered_repl(m):
        chunk = m.group(0)
        if not any(c in brackets for c in chunk): return chunk
        nums = re.findall(r'\d+', chunk)
        if len(nums) == 1 and len(nums[0]) < 4:
            return f' （ {nums[0]} ） '
        return chunk
    text = re.sub(cluster_pattern, numbered_repl, text)
    
    # --- 逻辑 B: 处理空括号（填空处） -> （     ） ---
    # 匹配模式：左括号 + 0或多个空格 + 右括号
    empty_pattern = rf'[{b_chars}]\s*[{b_chars}]'
    def empty_repl(m):
        chunk = m.group(0)
        # 确保是一个左括号紧跟一个右括号（内部可能有空格）
        # 排除掉数字占位符已经被逻辑A处理后的结果
        if re.search(r'\d', chunk): return chunk #理论上逻辑A已经移除了内部数字，但这里做安全保护
        return '（     ）'
    
    # 对可能存在的各种空括号进行统一
    # 匹配诸如 (), ( ), （）, （  ）等
    text = re.sub(rf'[\(（]\s*[\)）]', '（     ）', text)
    
    # --- 逻辑 C: 收尾清理 ---
    # 补漏：针对非标准但常见的括号
    text = re.sub(r'[\(（]([0-9]{1,3})[\)）]', r' （ \1 ） ', text)
    
    # 确保没有重复嵌套的括号
    text = re.sub(r'（\s*（\s*(\d+)\s*）\s*）', r'（ \1 ）', text)
    
    # 针对 ( ) 这种特殊窄括号可能被误伤的情况进行清理
    text = re.sub(r' +', ' ', text)
    text = re.sub(r'（ +', '（ ', text)
    text = re.sub(r' +）', ' ）', text)
    # 恢复固定宽度空格（上面多余空格清理会把 5 个空格变 1 个，这里需还原）
    text = re.sub(r'（ ）', '（     ）', text)
    
    return text

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return False
    
    print(f"Processing: {os.path.basename(filepath)}")
    
    def repl(m):
        key = m.group(1)
        quote = m.group(2)
        val = m.group(3)
        if key in ['content', 'explanation', 'title', 'label']:
            return f'"{key}": {quote}{clean_placeholder(val)}{quote}'
        return m.group(0)

    # 修复后的安全匹配逻辑
    new_content = re.sub(r'"(\w+)":\s*(["\'])((?:\\.|(?!\2).)*)\2', repl, content, flags=re.DOTALL)
    
    # 处理 options 数组
    def options_repl(match):
        prefix = match.group(1)
        body = match.group(2)
        def item_repl(m):
            q = m.group(1)
            inner = m.group(2)
            return f'{q}{clean_placeholder(inner)}{q}'
        cleaned_body = re.sub(r'(["\'])((?:\\.|(?!\1).)*)\1', item_repl, body, flags=re.DOTALL)
        return f'{prefix}{cleaned_body}]'

    new_content = re.sub(r'("options":\s*\[)(.*?)(\])', options_repl, new_content, flags=re.DOTALL)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"  --> Standardized all placeholders.")
        return True
    return False

if __name__ == "__main__":
    base_dir = r"f:/软考资料/202605/exam-app"
    files = glob.glob(os.path.join(base_dir, "ocr_questions_ch*.js"))
    files.append(os.path.join(base_dir, "review_ch27_q4.js"))
    
    for f in files:
        if "backups" in f: continue
        process_file(f)
    print("\nDONE.")
