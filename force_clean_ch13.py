import re
import os

def clean_placeholder(text):
    if not isinstance(text, str): return text
    brackets = '（）()《》“”[\]〈〉<>〔〕\uff08\uff09\u3008\u3009\u300a\u300b'
    # 增加对 。 的支持，虽然它不是括号，但它常出现在末尾
    b_chars = r'\(\)（）《》“”\[\]〈〉<>〔〕'
    pattern = rf'[{b_chars}\s\d]{{2,20}}'
    def repl(m):
        chunk = m.group(0)
        if not any(c in brackets for c in chunk): return chunk
        nums = re.findall(r'\d+', chunk)
        if len(nums) == 1 and len(nums[0]) < 4:
            return f' （ {nums[0]} ） '
        return chunk
    res = re.sub(pattern, repl, text)
    res = re.sub(r'[\(（]([0-9]{1,3})[\)）]', r' （ \1 ） ', res)
    res = re.sub(r' +', ' ', res)
    res = re.sub(r'（ +', '（ ', res)
    res = re.sub(r' +）', ' ）', res)
    return res

file_path = r"f:/软考资料/202605/exam-app/ocr_questions_ch13.js"
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

def string_value_replacer(match):
    key = match.group(1)
    quote = match.group(2)
    val = match.group(3)
    if key in ['content', 'explanation', 'title', 'label']:
        return f'"{key}": {quote}{clean_placeholder(val)}{quote}'
    return match.group(0)

new_content = re.sub(r'"(\w+)":\s*(["\'])((?:\\.|[^\2])*)\2', string_value_replacer, content)

if new_content != content:
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully forced update for ch13.js")
else:
    print("No changes detected even in forced mode!")
